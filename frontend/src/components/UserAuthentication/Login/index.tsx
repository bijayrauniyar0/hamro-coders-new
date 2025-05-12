import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

import ErrorMessage from '@Components/common/ErrorMessage';
import { Input } from '@Components/common/FormUI';
import InputLabel from '@Components/common/FormUI/InputLabel';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import { Button } from '@Components/radix/Button';
import { setIsAuthenticated, setUserProfile } from '@Store/actions/common';
import { useTypedDispatch } from '@Store/hooks';
import { login } from '@Services/common';
import { apiURL } from '@Services/index';

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
    setError,
    clearErrors,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: initialState,
  });

  const { mutate } = useMutation<any, any, any, unknown>({
    mutationFn: (payload: Record<string, any>) => login(payload),
    onSuccess: (res: any) => {
      dispatch(setUserProfile(res.data.user));
      toast.success('Login Successful');
      navigate('/');
      dispatch(setIsAuthenticated(true));
    },
    onError: ({ response }: any) => {
      if (response?.status === 401 && response?.data?.verified === false) {
        dispatch(setUserProfile({ email: watch('email') }));
        navigate('/verify-email');
        return;
      }
      const caughtError = response?.data?.message;
      if (caughtError) {
        setError('email', {
          type: 'manual',
          message: caughtError,
        });
      }
    },
  });
  const email = watch('email');
  useEffect(() => {
    if (errors?.email?.type === 'manual') {
      clearErrors('email');
    }
  }, [email, errors, clearErrors]);

  const onSubmit = (data: Record<string, any>) => {
    mutate(data);
  };
  const handleLogin = () => {
    window.location.href = `${apiURL}/api/auth/google`;
  };

  return (
    <div className="h-full">
      <div className="grid h-full place-items-center">
        <div className="login-form w-full overflow-hidden p-7 text-center sm:min-w-[25.25rem] sm:px-12 lg:px-16">
          {/* ------ icon ------ */}

          <p className="select-none text-5xl font-semibold text-primary-700">
            MockSewa
          </p>
          {/*  ------ form ------ */}
          <form onSubmit={handleSubmit(onSubmit)} className="pb-8 pt-12">
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

            <FormControl className="relative mb-2 md:mb-3">
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

            <div className="flex items-center justify-end gap-2">
              <p
                className="body-md-semibold cursor-pointer px-2 text-primary-800"
                onClick={() => navigate('/forgot-password')}
              >
                Forgot Password ?
              </p>
            </div>

            <FlexColumn className="w-full items-center justify-center gap-8">
              <Button
                className="mt-6 w-full p-3 md:mt-10"
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

          <FlexColumn className="items-start gap-8">
            <FlexRow className="w-full items-center justify-between gap-2">
              <div className="h-[1px] w-2/5 bg-gray-300" />
              <p className="text-center">Or</p>
              <div className="h-[1px] w-2/5 bg-gray-300" />
            </FlexRow>
            <button
              onClick={handleLogin}
              className="mx-auto flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm transition-colors hover:bg-gray-100"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="h-5 w-5"
              />
              <span>Continue with Google</span>
            </button>
          </FlexColumn>
        </div>
      </div>
    </div>
  );
}
