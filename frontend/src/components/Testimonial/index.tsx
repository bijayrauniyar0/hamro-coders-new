import React, { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';

import BindContentContainer from '@Components/common/BindContentContainer';
import DropDown from '@Components/common/DropDown';
import { Input } from '@Components/common/FormUI';
import ErrorMessage from '@Components/common/FormUI/ErrorMessage';
import InputLabel from '@Components/common/FormUI/InputLabel';
import Textarea from '@Components/common/FormUI/TextArea';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import Rating from '@Components/common/Rating';
import { Button } from '@Components/radix/Button';
import { resizeImageToFile } from '@Utils/resizeImage';
import useAuthStore from '@Store/auth';
import { TestsType } from '@Constants/Types/academics';
import { getAvatar } from '@Constants/UserProfile';
import useAuth from '@Hooks/useAuth';
import { getAllTestsList } from '@Services/academics';
import { createTestimonial } from '@Services/testimonial';
import { testimonialSchema } from '@Validations/Testimonial';

const defaultValues: FieldValues = {
  full_name: '',
  email: '',
  exam_type: '',
  rating: 5,
  profile_photo: null,
  testimonial: '',
};

const TestimonialForm: React.FC = () => {
  const userProfile = useAuthStore(state => state.userProfile);
  const isAuthenticated = useAuth();
  const [ratingHover, setRatingHover] = React.useState<number>(-1);
  const [previewImage, setPreviewImage] = useState<string>(getAvatar('hacker'));

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    getValues,
    watch,
  } = useForm<FieldValues>({
    defaultValues,
    resolver: zodResolver(testimonialSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      const updatedValues = {
        ...defaultValues,
        full_name: userProfile?.name || '',
        email: userProfile?.email || '',
      };
      reset(updatedValues);
    }
  }, [isAuthenticated, reset, userProfile]);
  const rating = watch('rating');
  const { data: allTestList, isLoading: allTestsListIsLoading } = useQuery({
    queryKey: ['allTestList'],
    queryFn: getAllTestsList,
    select: ({ data }) => {
      return data.map((test: TestsType) => {
        return {
          value: `${test.title} (${test.stream_name})`,
          label: `${test.title} (${test.stream_name})`,
          id: test.id,
        };
      });
    },
  });
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      resizeImageToFile(file, (dataUrl, file) => {
        setPreviewImage(dataUrl);
        setValue('profile_photo', file);
      });
    }
  };

  const {
    mutate: createNewTestimonial,
    isPending: testimonialIsCreating,
    isSuccess: testimonialCreatedSuccessFully,
    reset: resetTestimonial,
  } = useMutation({
    mutationFn: createTestimonial,
  });

  const onSubmit: SubmitHandler<FieldValues> = async () => {
    const payload = getValues();
    createNewTestimonial(payload);
  };

  return (
    <BindContentContainer className="flex h-[calc(100vh-4rem)] w-full items-center justify-center max-md:h-[calc(100vh-5rem)] max-sm:my-4">
      <div className="rounded-lg border border-gray-200 bg-white p-6 px-4 shadow-md">
        <div className="mb-8 text-center">
          <p className="text-lg font-bold text-primary-600 md:text-xl lg:text-2xl">
            Share Your MockSewa Experience
          </p>
          <p className="text-md text-gray-600 md:text-base">
            Help future students by sharing how MockSewa helped you achieve your
            goals.
          </p>
        </div>

        {testimonialCreatedSuccessFully ? (
          <div className="text-center">
            <div className="mb-4 text-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-16 w-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="mb-2 text-2xl font-semibold text-gray-800">
              Thank You!
            </h2>
            <p className="mb-4 text-gray-600">
              Your testimonial has been submitted successfully. We appreciate
              your feedback!
            </p>
            <Button onClick={() => resetTestimonial()}>
              Submit Another Testimonial
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <FlexColumn className="w-full gap-4 max-md:gap-2">
              {/* Exam Type */}
              <FlexRow className="w-full gap-4 max-md:flex-wrap">
                <FlexColumn className="w-full gap-2">
                  <InputLabel label="Full Name" astric />
                  <Input
                    type="text"
                    className={`${errors.full_name ? 'border-red-500' : ''} w-full text-md`}
                    {...register('full_name')}
                    disabled={Boolean(isAuthenticated)}
                  />
                  <ErrorMessage
                    message={
                      typeof errors.full_name?.message === 'string'
                        ? errors.full_name?.message
                        : undefined
                    }
                  />
                </FlexColumn>
                <FlexColumn className="w-full gap-2">
                  <InputLabel label="Email " astric />
                  <Input
                    type="text"
                    className={` ${errors.email ? 'border-red-500' : ''} w-full text-md`}
                    {...register('email')}
                    disabled={Boolean(isAuthenticated)}
                  />
                  <ErrorMessage
                    message={
                      typeof errors.email?.message === 'string'
                        ? errors.email?.message
                        : undefined
                    }
                  />
                </FlexColumn>
              </FlexRow>
              <FlexRow className="gap-4 max-md:flex-wrap">
                <FlexColumn className="w-full gap-2">
                  <InputLabel label="Exam Type" astric />
                  <DropDown
                    options={allTestList}
                    isLoading={allTestsListIsLoading}
                    className={`${errors.exam_type ? 'border-red-500' : ''}`}
                    value={watch('exam_type')}
                    onChange={val => {
                      setValue('exam_type', val);
                    }}
                    choose="value"
                  />

                  <ErrorMessage
                    message={
                      typeof errors.exam_type?.message === 'string'
                        ? errors.exam_type?.message
                        : undefined
                    }
                  />
                </FlexColumn>
                <FlexColumn className="w-full gap-2">
                  <InputLabel label=" Your Rating" astric />
                  <Rating
                    value={rating}
                    hover={ratingHover}
                    onHover={setRatingHover}
                    onChange={value => {
                      setValue('rating', value);
                    }}
                  />
                </FlexColumn>
              </FlexRow>
              <FlexColumn className="gap-2">
                <InputLabel label="Profile Photo" />
                <FlexRow className="items-center space-x-4">
                  {/* Image preview in a circle */}
                  <div className="h-16 w-16 overflow-hidden rounded-full border border-gray-300">
                    <img
                      src={previewImage}
                      alt="Avatar Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* File input */}
                  <label className="cursor-pointer px-3 py-1 font-semibold text-primary-600">
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </FlexRow>
              </FlexColumn>
              <FlexColumn className="gap-2">
                <InputLabel astric label={'Your Testimonial *'} />
                <Textarea
                  id="testimonialText"
                  rows={5}
                  className={`${errors.testimonial ? 'border-red-500' : ''} h-32 resize-none text-sm md:text-md`}
                  placeholder="Share how MockSewa helped you prepare for your exam..."
                  {...register('testimonial')}
                />
                <ErrorMessage
                  message={
                    typeof errors?.testimonial?.message === 'string'
                      ? errors?.testimonial?.message
                      : undefined
                  }
                />
              </FlexColumn>
            </FlexColumn>

            <div className="mt-8 flex justify-center">
              <Button
                type="submit"
                isLoading={testimonialIsCreating}
                disabled={testimonialIsCreating}
              >
                Submit
              </Button>
            </div>
          </form>
        )}
      </div>
    </BindContentContainer>
  );
};

export default TestimonialForm;
