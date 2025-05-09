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
import { resetPassword } from '@Services/auth';
import { passwordValidation } from '@Validations/Authentication';

import FormControl from '../../common/FormUI/FormControl';
import Icon from '../../common/Icon';

const defaultValues = {
  password: '',
  confirmPassword: '',
  // keepSignedIn: false,
};

export default function ResetPassword() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const { token } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(passwordValidation),
  });

  const { mutate } = useMutation<any, any, any, unknown>({
    mutationFn: (payload: Record<string, any>) => resetPassword(payload),
    onSuccess: () => {
      navigate('/auth/login');
      toast.success('Password reset successful. Please login.');
    },
    onError: ({ response }: any) => {
      const caughtError =
        response?.data?.message || 'Something went wrong. Please try again.';
      toast.error(caughtError);
    },
  });

  const onSubmit = (data: Record<string, any>) => {
    const { password } = data;
    const payload = {
      password,
      token,
    };
    mutate(payload);
  };

  return (
    <div className="h-full">
      <div className="grid h-full place-items-center">
        <div className="login-form w-full overflow-hidden p-7 text-center sm:min-w-[25.25rem] sm:px-12 lg:px-16">
          <p className="select-none text-5xl font-semibold text-primary-700">
            MockSewa
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="pb-8 pt-12">
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
              <InputLabel label="Confirm Password" className="mb-1 text-xs" />
              <Input
                id="password"
                type={showPassword.confirmPassword ? 'text' : 'password'}
                className="w-[4/5] pr-10"
                placeholder="Enter Confirm Password"
                {...register('confirmPassword', {
                  required: 'Password is Required',
                })}
              />
              <Icon
                name={
                  showPassword.confirmPassword ? 'visibility' : 'visibility_off'
                }
                className="text-black-600 absolute right-2 top-[2.3rem] cursor-pointer"
                onClick={() =>
                  setShowPassword(prev => ({
                    ...prev,
                    confirmPassword: !prev.confirmPassword,
                  }))
                }
              />

              {errors?.confirmPassword?.message && (
                <ErrorMessage message={errors.confirmPassword.message} />
              )}
            </FormControl>
            <Button
              className="mt-6 w-full p-3 md:mt-10"
              // disabled={isSubmitting}
              // isLoading={isSubmitting}
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
