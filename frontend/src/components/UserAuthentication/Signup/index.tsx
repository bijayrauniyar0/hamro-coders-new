/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import ErrorMessage from '@Components/common/ErrorMessage';
import { Input } from '@Components/common/FormUI';
import Checkbox from '@Components/common/FormUI/CheckBox';
import InputLabel from '@Components/common/FormUI/InputLabel';
import { Button } from '@Components/radix/Button';
// import NSOIcon from '@Assets/images/login/NSO.svg';

import { zodResolver } from '@hookform/resolvers/zod';
import FormControl from '../../common/FormUI/FormControl';
import Icon from '../../common/Icon';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import IconButton from '@Components/common/IconButton';
import {
  signupSchemaStepOne,
  signupSchemaStepTwo,
} from '@Validations/Authentication';
import { createNewUser } from '@Services/common';
import { toast } from 'react-toastify';

const initialState = {
  name: '',
  email: '',
  number: '',
  password: '',
  confirmPassword: '',
  // keepSignedIn: false,
};

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [formStep, setFormStep] = useState(1);
  const [isTermsChecked, setIsTermsChecked] = useState(false);

  const { mutate, isPending } = useMutation<any, any, any, unknown>({
    mutationFn: (payload: Record<string, any>) => createNewUser(payload),
    onSuccess: () => {
      toast.success('Signup Successful. Please Login to Continue');
      navigate('/login');
    },
    onError: (error: any) => {
      const caughtError = error?.response?.data?.message;
      toast.error(caughtError || 'Signup Failed Something Went Wrong');
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: initialState,
    resolver: zodResolver(
      formStep === 1 ? signupSchemaStepOne : signupSchemaStepTwo,
    ),
  });

  const onSubmit = () => {
    if (formStep === 1) {
      setFormStep(2);
      return;
    }
    const { confirmPassword, ...values } = watch();
    mutate(values);
  };

  function getContentAccordingToStep() {
    switch (formStep) {
      case 1:
        return (
          <>
            <FormControl className="mb-4">
              <InputLabel label="Full Name" className="mb-1" astric />
              <Input
                id="name"
                type="text"
                placeholder="Enter Your Name"
                {...register('name')}
              />
              <ErrorMessage message={errors.name?.message} />
            </FormControl>
            <FormControl className="mb-4">
              <InputLabel label="Email" className="mb-1" astric />
              <Input
                id="email"
                type="email"
                placeholder="Enter Email (e.g. bijay@example.com)"
                {...register('email')}
              />
              <ErrorMessage message={errors.email?.message} />
            </FormControl>
            <FormControl className="mb-4">
              <InputLabel label="Phone Number" className="mb-1" />
              <Input
                id="phone"
                type="text"
                placeholder="Enter Phone Number"
                {...register('number')}
              />
              <ErrorMessage message={errors.number?.message} />
            </FormControl>
          </>
        );
      case 2:
        return (
          <>
            <FormControl className="relative mb-3">
              <InputLabel label="Password" className="mb-1 text-xs" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="w-[4/5] pr-10"
                placeholder="Enter Password"
                {...register('password')}
              />
              <Icon
                name={showPassword ? 'visibility' : 'visibility_off'}
                className="text-black-600 absolute right-2 top-[2.3rem] cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />

              {errors?.password?.message && (
                <ErrorMessage message={errors.password?.message} />
              )}
            </FormControl>
            <FormControl className="relative mb-3">
              <InputLabel label="Password" className="mb-1 text-xs" />
              <Input
                id="password"
                type={showConfirmPassword ? 'text' : 'password'}
                className="w-[4/5] pr-10"
                placeholder="Enter Password"
                {...register('confirmPassword')}
              />
              <Icon
                name={showPassword ? 'visibility' : 'visibility_off'}
                className="text-black-600 absolute right-2 top-[2.3rem] cursor-pointer"
                onClick={() => setShowConfirmPassword(!showPassword)}
              />

              <ErrorMessage message={errors.confirmPassword?.message} />
            </FormControl>
            <div className="mb-8">
              <Checkbox
                onClick={() => setIsTermsChecked(!isTermsChecked)}
                checked={isTermsChecked}
                label="I agree to the terms and conditions"
                labelClassName="!text-gray-800  !mb-0"
                // onClick={(0)}
              />
            </div>
          </>
        );
      default:
        return <></>;
    }
  }
  return (
    <div className="login-form-wrapper h-full bg-white">
      <div className="login-inner grid h-full place-items-center">
        <div className="login-form w-full space-y-14 overflow-hidden bg-white p-7 text-center sm:min-w-[25.25rem] sm:px-12 lg:px-16">
          {/* ------ icon ------ */}

          <p className="select-none text-5xl font-semibold text-primary-700">
            Hamro Coders
          </p>
          {/*  ------ form ------ */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {getContentAccordingToStep()}

            <FlexColumn className="w-full items-center justify-center gap-8">
              <FlexRow className="w-full gap-2">
                {formStep !== 1 && (
                  <IconButton
                    className="w-[4rem] rounded-lg border p-3 text-primary-700 shadow-sm"
                    disabled={isSubmitting}
                    name="chevron_left"
                    onClick={() => {
                      const values = watch();
                      reset({ ...values, password: '', confirmPassword: '' });
                      setFormStep(1);
                    }}
                  />
                )}
                <Button
                  className="w-full p-3 ease-in-out"
                  disabled={(formStep === 2 && !isTermsChecked) || isSubmitting}
                  isLoading={isSubmitting}
                  //   type={formStep === 1 ? 'button' : 'submit'}
                >
                  {formStep === 1 ? 'Next' : 'Sign Up'}
                </Button>
              </FlexRow>
              <p className="text-center text-sm">
                Already have an account ?{' '}
                <NavLink
                  to="/login"
                  className="font-semibold text-primary-700 hover:underline"
                >
                  Login Here
                </NavLink>{' '}
              </p>
            </FlexColumn>
          </form>
        </div>
      </div>
    </div>
  );
}
