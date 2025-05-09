import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import ErrorMessage from '@Components/common/ErrorMessage';
import { Input } from '@Components/common/FormUI';
import InputLabel from '@Components/common/FormUI/InputLabel';
import { Button } from '@Components/radix/Button';
import { forgotPassword } from '@Services/common';
import { passwordValidation } from '@Validations/Authentication';

import FormControl from '../../common/FormUI/FormControl';
import Icon from '../../common/Icon';

const defaultValues = {
  password: '',
  confirm_password: '',
  // keepSignedIn: false,
};

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm_password: false,
  });
  const { token } = useParams();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(passwordValidation),
  });

  const { mutate } = useMutation({
    mutationFn: (payload: Record<string, any>) => forgotPassword(payload),
    onSuccess: () => {
      toast.success('Password Changed Successfully');
      navigate('/login');
    },
    onError: ({ response }: any) => {
      const caughtError = response?.data?.message || 'Something went wrong.';
      toast.error(caughtError || 'Login Failed Something Went Wrong');
    },
  });

  const onSubmit = (data: typeof defaultValues) => {
    const { password } = data;
    const payload = {
      token,
      password,
    };
    mutate(payload);
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
            <FormControl className="relative mb-2 md:mb-3">
              <InputLabel label="Password" astric className="mb-1 text-xs" />
              <Input
                id="password"
                type={showPassword.password ? 'text' : 'password'}
                className="w-[4/5] pr-10"
                placeholder="Enter Password"
                {...register('password', { required: 'Password is Required' })}
              />
              <Icon
                name={showPassword ? 'visibility' : 'visibility_off'}
                className="text-black-600 absolute right-2 top-[2.3rem] cursor-pointer"
                onClick={() =>
                  setShowPassword(prev => ({
                    ...prev,
                    password: !prev.password,
                  }))
                }
              />

              {errors?.password?.message && (
                <ErrorMessage message={errors.password.message} />
              )}
            </FormControl>
            <FormControl className="relative mb-2 md:mb-3">
              <InputLabel
                label="Confirm Password"
                astric
                className="mb-1 text-xs"
              />
              <Input
                id="password"
                type={showPassword.confirm_password ? 'text' : 'password'}
                className="w-[4/5] pr-10"
                placeholder="Enter Password"
                {...register('password', { required: 'Password is Required' })}
              />
              <Icon
                name={showPassword ? 'visibility' : 'visibility_off'}
                className="text-black-600 absolute right-2 top-[2.3rem] cursor-pointer"
                onClick={() =>
                  setShowPassword(prev => ({
                    ...prev,
                    confirm_password: !prev.confirm_password,
                  }))
                }
              />

              {errors?.confirm_password?.message && (
                <ErrorMessage message={errors.confirm_password.message} />
              )}
            </FormControl>

            <Button
              className="mt-6 w-full p-3 md:mt-10"
              disabled={isSubmitting}
              isLoading={isSubmitting}
              type="submit"
            >
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
