import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import ErrorMessage from '@Components/common/ErrorMessage';
import { FormControl, Input } from '@Components/common/FormUI';
import Checkbox from '@Components/common/FormUI/CheckBox';
import InputLabel from '@Components/common/FormUI/InputLabel';
import Icon from '@Components/common/Icon';
import IconButton from '@Components/common/IconButton';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import { Button } from '@Components/radix/Button';
import useAuthStore from '@Store/auth';
import useDebouncedInput from '@Hooks/useDebouncedInput';
import { checkIfEmailExists, createNewUser } from '@Services/common';
import {
  passwordValidation,
  signupSchemaStepOne,
} from '@Validations/Authentication';

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
  const setUserProfile = useAuthStore(state => state.setUserProfile);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    setError,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: initialState,
    resolver: zodResolver(
      formStep === 1 ? signupSchemaStepOne : passwordValidation,
    ),
  });
  const email = watch('email');

  const { mutate, isPending } = useMutation<any, any, any, unknown>({
    mutationFn: (payload: Record<string, any>) => createNewUser(payload),
    onSuccess: () => {
      setUserProfile({
        email: watch('email'),
        name: watch('name'),
      });
      navigate('/verify-email');
    },
    onError: (error: any) => {
      const caughtError = error?.response?.data?.message;
      toast.error(caughtError || 'Signup Failed Something Went Wrong');
    },
  });

  const { mutate: checkEmail } = useMutation({
    mutationFn: (payload: Record<string, any>) => checkIfEmailExists(payload),
    onSuccess: (data: any) => {
      if (data?.data?.exists) {
        setError('email', {
          type: 'custom',
          message: 'Email already exists',
        });
      } else {
        setError('email', {
          type: 'custom',
          message: '',
        });
      }
    },
  });

  const [inputValue, handleDebouncedChange, setInputValue] = useDebouncedInput({
    init: email,
    onChange: e => setValue('email', e.target.value),
    ms: 700,
  });

  const onSubmit = () => {
    if (formStep === 1) {
      setFormStep(2);
      return;
    }
    // eslint-disable-next-line no-unused-vars
    const { confirmPassword, ...values } = watch();
    mutate(values);
  };

  useEffect(() => {
    const listener = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', listener);

    return () => {
      window.removeEventListener('beforeunload', listener);
    };
  }, []);

  useEffect(() => {
    setInputValue(email);
  }, [setInputValue, email]);
  useEffect(() => {
    if (email.includes('@') && email.includes('.')) {
      checkEmail({ email });
    }
  }, [email, checkEmail]);

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
                onChange={handleDebouncedChange}
                value={inputValue}
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
    <div className="login-inner grid h-full place-items-center">
      <div className="login-form w-full space-y-14 overflow-hidden p-7 text-center sm:min-w-[25.25rem] sm:px-12 lg:px-16">
        {/* ------ icon ------ */}

        <p className="select-none text-5xl font-semibold text-primary-700">
          MockSewa
        </p>
        {/*  ------ form ------ */}

        <form onSubmit={handleSubmit(onSubmit)}>
          {getContentAccordingToStep()}

          <FlexColumn className="w-full items-center justify-center gap-8">
            <FlexRow className="w-full gap-2">
              {formStep !== 1 && (
                <IconButton
                  className="w-[4rem] rounded-lg border p-3 text-primary-700 shadow-sm"
                  disabled={isSubmitting || isPending}
                  name="chevron_left"
                  onClick={() => {
                    const values = watch();
                    reset({
                      ...values,
                      password: '',
                      confirmPassword: '',
                    });
                    setFormStep(1);
                  }}
                />
              )}
              <Button
                className="w-full p-3 ease-in-out"
                disabled={
                  (formStep === 2 && !isTermsChecked) ||
                  isSubmitting ||
                  isPending
                }
                isLoading={isSubmitting || isPending}
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
              </NavLink>
            </p>
          </FlexColumn>
        </form>
      </div>
    </div>
  );
}
