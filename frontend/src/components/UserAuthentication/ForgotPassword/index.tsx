import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import ErrorMessage from '@Components/common/ErrorMessage';
import { FormControl, Input } from '@Components/common/FormUI';
import InputLabel from '@Components/common/FormUI/InputLabel';
import { Button } from '@Components/radix/Button';
import useAuthStore from '@Store/auth';
import { useSendPasswordResetEmail } from '@Api/UserAuthentication';

const initialState = {
  email: '',
};

export default function ForgotPassword() {
  const navigate = useNavigate();
  const setUserProfile = useAuthStore(state => state.setUserProfile);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: initialState,
  });

  const { mutate, isPending, isSuccess } = useSendPasswordResetEmail();
  useEffect(() => {
    if (isSuccess) {
      const email = getValues('email');
      setUserProfile({ email });
      navigate('/verify-forgot-password');
    }
  }, [isSuccess, getValues, navigate, setUserProfile]);

  const onSubmit = (data: Record<string, any>) => {
    mutate(data);
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
            <Button
              className="mt-6 w-full p-3 md:mt-10"
              disabled={isPending}
              isLoading={isPending}
              type="submit"
            >
              Send Reset Link
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
