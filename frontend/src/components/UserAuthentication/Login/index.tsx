import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

import ErrorMessage from '@Components/common/ErrorMessage';
import { Input } from '@Components/common/FormUI';
import Checkbox from '@Components/common/FormUI/CheckBox';
import InputLabel from '@Components/common/FormUI/InputLabel';
import { FlexColumn } from '@Components/common/Layouts';
import { Button } from '@Components/radix/Button';
import { setUserProfile } from '@Store/actions/common';
import { useTypedDispatch } from '@Store/hooks';
import { login } from '@Services/common';

import FormControl from '../../common/FormUI/FormControl';
import Icon from '../../common/Icon';

const initialState = {
  email: '',
  password: '',
  // keepSignedIn: false,
};

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: initialState,
  });

  const { mutate } = useMutation<any, any, any, unknown>({
    mutationFn: (payload: Record<string, any>) => login(payload),
    onSuccess: (res: any) => {
      localStorage.setItem('token', res?.data?.token);
      toast.success('Login Successful');
      navigate('/courses');
    },
    onError: ({ response }: any) => {
      if (response?.status === 401 && response?.data?.verified === false) {
        toast.error(
          'User not verified. Please check your email for verification.',
        );
        dispatch(setUserProfile({ email: watch('email') }));
        navigate('/verify-email');
      }
      const caughtError = response?.data?.message || 'Something went wrong.';
      toast.error(caughtError || 'Login Failed Something Went Wrong');
    },
  });

  const onSubmit = (data: Record<string, any>) => {
    mutate(data);
  };

  return (
    <div className="login-form-wrapper h-full">
      <div className="login-inner grid h-full place-items-center">
        <div className="login-form w-full space-y-14 overflow-hidden p-7 text-center sm:min-w-[25.25rem] sm:px-12 lg:px-16">
          {/* ------ icon ------ */}

          <p className="select-none text-5xl font-semibold text-primary-700">
            Hamro Coders
          </p>
          {/*  ------ form ------ */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl className="mb-4">
              <InputLabel label="Email" className="mb-1" />
              <Input
                id="email"
                type="email"
                placeholder="Enter Email (e.g. bijay@example.com)"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Invalid email format',
                  },
                })}
              />
              {errors?.email?.message && (
                <ErrorMessage message={errors.email.message} />
              )}
            </FormControl>

            <FormControl className="relative mb-3">
              <InputLabel label="Password" className="mb-1 text-xs" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="w-[4/5] pr-10"
                placeholder="Enter Password"
                {...register('password', { required: 'Password is Required' })}
              />
              <Icon
                name={showPassword ? 'visibility' : 'visibility_off'}
                className="text-black-600 absolute right-2 top-[2.3rem] cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />

              {errors?.password?.message && (
                <ErrorMessage message={errors.password.message} />
              )}
            </FormControl>

            {/* ---- remember-me ---- */}
            <div className="flex items-center justify-between gap-2">
              <Checkbox
                label="Remember me"
                labelClassName="!text-gray-800  !mb-0"
                // onClick={(0)}
              />
              <p
                className="body-md-semibold cursor-pointer px-2 py-3 text-primary-800"
                onClick={() => navigate('/forgot-password')}
              >
                Forgot Password ?
              </p>
            </div>

            <FlexColumn className="w-full items-center justify-center gap-8">
              <Button
                className="mt-10 w-full p-3"
                disabled={isSubmitting}
                isLoading={isSubmitting}
                type="submit"
              >
                Sign In
              </Button>
              <p className="text-center text-sm">
                Don&apos;t have an account ?{' '}
                <NavLink
                  to="/signup"
                  className="font-semibold text-primary-700 hover:underline"
                >
                  Register Here
                </NavLink>
              </p>
            </FlexColumn>
          </form>
        </div>
      </div>
    </div>
  );
}
