// components/CollaborateForm.tsx

import React from 'react';
import { useForm } from 'react-hook-form';

import BindContentContainer from '@Components/common/BindContentContainer';
import { Input } from '@Components/common/FormUI';
import ErrorMessage from '@Components/common/FormUI/ErrorMessage';
import InputLabel from '@Components/common/FormUI/InputLabel';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import { Button } from '@Components/radix/Button';

type FormData = {
  email: string;
  field_of_interest: string;
};

const CollaborateForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log('Form Data:', data);
    // You could integrate with an API or email service here
    reset();
  };

  return (
    <BindContentContainer>
      <FlexRow 
      className="relative w-full items-center justify-center rounded-md border border-primary-200 bg-white p-6 shadow-[-2px_-2px_40px_rgba(136,109,176.1,0.5)]">
        <FlexColumn className="w-full items-center justify-center gap-4">
          <h2 className="mb-4 text-center text-2xl font-semibold text-gray-800">
            Wanna Collaborate?
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-4 md:w-3/5 lg:w-1/2"
          >
            <FlexColumn className="gap-1">
              <InputLabel label="Email" astric />
              <Input
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
              {errors.email && (
                <ErrorMessage message={errors.email.message || ''} />
              )}
            </FlexColumn>

            <FlexColumn className="gap-1">
              <InputLabel astric label="Field of Interest" />
              <Input
                {...register('field_of_interest', {
                  required: 'Message is required',
                  maxLength: {
                    value: 50,
                    message: 'Field of Interest cannot exceed 50 characters',
                  },
                })}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
              {errors.field_of_interest && (
                <ErrorMessage
                  message={errors.field_of_interest.message || ''}
                />
              )}
            </FlexColumn>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="mx-auto w-fit"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </FlexColumn>
      </FlexRow>
    </BindContentContainer>
  );
};

export default CollaborateForm;
