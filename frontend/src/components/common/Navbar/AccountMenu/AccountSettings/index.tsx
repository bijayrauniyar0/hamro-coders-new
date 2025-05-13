import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Eye, EyeClosed, User as UserIcon } from 'lucide-react';

import ErrorMessage from '@Components/common/ErrorMessage';
import { FormControl, Input } from '@Components/common/FormUI';
import InputLabel from '@Components/common/FormUI/InputLabel';
import PasswordInput from '@Components/common/FormUI/PasswordInput';
import Icon from '@Components/common/Icon';
import { FlexColumn, FlexRow, Grid } from '@Components/common/Layouts';
import { Button } from '@Components/radix/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@Components/radix/DropDownMenu';
import isEmpty from '@Utils/isEmpty';
import useAuthStore from '@Store/auth';
import { User } from '@Store/common';
import { avatars, getAvatar } from '@Constants/UserProfile';
import { changePassword, updateUser } from '@Services/common';
import {
  passwordValidation,
  signupSchemaStepOne,
} from '@Validations/Authentication';

export interface IChangePasswordPayload {
  old_password: string;
  password: string;
}
interface IAccountSettingsProps {
  handleClose: () => void;
}
const AccountSettings = ({ handleClose }: IAccountSettingsProps) => {
  const queryClient = useQueryClient();
  const { userProfile } = useAuthStore();
  const [isMouseOverEye, setIsMouseOverEye] = useState(false);
  const [formKey, setFormKey] = useState('profile');
  const defaultValues = {
    name: userProfile?.name,
    email: userProfile?.email,
    number: userProfile?.number,
    avatar: userProfile.avatar,
    password: '',
    confirmPassword: '',
    old_password: '',
  };
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    watch,
    getValues,
    formState: { errors, isDirty, dirtyFields },
  } = useForm<typeof defaultValues>({
    defaultValues,
    resolver: zodResolver(
      formKey === 'profile' ? signupSchemaStepOne : passwordValidation,
    ),
  });

  const onSuccessFn = () => {
    queryClient.invalidateQueries({ queryKey: ['user-profile'] });
    handleClose();
  };
  const { mutate: updateUserProfile, isPending: isUpdating } = useMutation({
    mutationFn: (data: Partial<User>) => updateUser(data),
    onSuccess: () => {
      toast.success('Profile updated successfully');
      onSuccessFn();
    },
    onError: error => {
      toast.error(error.message || 'Failed to update profile');
    },
  });
  const { mutate: changeUserPassword, isPending: isPasswordChanging } =
    useMutation({
      mutationFn: (data: IChangePasswordPayload) => changePassword(data),
      onSuccess: () => {
        toast.success('Profile updated successfully');
        onSuccessFn();
      },
      onError: error => {
        toast.error(error.message || 'Failed to change profile');
      },
    });

  useEffect(() => {
    reset(defaultValues);
  }, [formKey, reset]);

  const handleFormSubmit = () => {
    if (isEmpty(dirtyFields)) return;
    const formValues = getValues(); // all current form values

    if (formKey === 'password') {
      changeUserPassword({
        old_password: formValues.old_password,
        password: formValues.password,
      });
      return;
    }

    const updatedValues = Object.keys(dirtyFields).reduce(
      (acc, key) => {
        acc[key] = formValues[key as keyof typeof defaultValues];
        return acc;
      },
      {} as Record<string, any>,
    );

    updateUserProfile(updatedValues);
  };

  // motionConfig.ts
  const updatedAvatarKey = watch('avatar') || userProfile.avatar || 'bear';

  return (
    <form
      className="relative flex flex-col gap-4"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <FlexRow className="w-full items-center justify-between">
        <FlexRow className="items-center">
          <img
            src={getAvatar(updatedAvatarKey)}
            alt=""
            className="aspect-square h-16 w-16"
          />
          {formKey === 'profile' ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="link" type="button">
                  <Icon name="upload" />
                  Change Profile Avatar
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border border-grey-300 shadow-lg">
                <Grid className="cursor-pointer grid-cols-4 gap-2 p-2">
                  {Object.keys(avatars).map(avatarKey => (
                    <img
                      src={avatars[avatarKey]}
                      alt=""
                      onClick={() => {
                        setValue('avatar', avatarKey, { shouldDirty: true });
                        // trigger('avatar');
                      }}
                      key={avatarKey}
                      className={`aspect-square h-16 w-16 rounded-full border-2 transition-all duration-200 ease-in-out hover:border-4 hover:border-primary-500 hover:bg-primary-500 ${avatarKey === updatedAvatarKey ? 'border-4 border-primary-500' : 'border-gray-200 bg-gray-300'}`}
                    />
                  ))}
                </Grid>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <FlexColumn className="pl-4">
              <p className="text-base font-semibold text-primary-600">
                {userProfile?.name}
              </p>
              <p className="text-md font-normal text-primary-700">
                {userProfile?.email}
              </p>
            </FlexColumn>
          )}
        </FlexRow>
        {formKey === 'profile' ? (
          <Button
            variant="link"
            type="button"
            onMouseOver={() => setIsMouseOverEye(true)}
            onMouseOut={() => setIsMouseOverEye(false)}
            onClick={() => setFormKey('password')}
          >
            {isMouseOverEye ? <Eye /> : <EyeClosed />}
            Change Password
          </Button>
        ) : (
          <Button
            variant="link"
            type="button"
            onClick={() => setFormKey('profile')}
          >
            <UserIcon />
            Back to Profile
          </Button>
        )}
      </FlexRow>
      <div className="relative min-h-[14rem] w-full">
        {formKey === 'profile' && (
          <FlexColumn className={`absolute w-full gap-1`}>
            <FormControl>
              <InputLabel label="Full Name" astric />
              <Input
                id="name"
                type="text"
                placeholder="Enter Your Name"
                {...register('name')}
              />
              <ErrorMessage message={errors.name?.message} />
            </FormControl>
            <FormControl>
              <InputLabel label="Email" astric />
              <Input
                id="email"
                type="email"
                placeholder="Enter Email (e.g. bijay@example.com)"
                {...register('email')}
              />
              <ErrorMessage message={errors.email?.message} />
            </FormControl>
            <FormControl>
              <InputLabel label="Phone Number" />
              <Input
                id="phone"
                type="text"
                placeholder="Enter Phone Number"
                {...register('number')}
              />
              <ErrorMessage message={errors.number?.message} />
            </FormControl>
          </FlexColumn>
        )}
        {formKey === 'password' && (
          <FlexColumn className={`absolute w-full gap-1`}>
            <FormControl>
              <InputLabel label="Old Password" />
              <PasswordInput
                className="w-[4/5] pr-10"
                placeholder="Enter Password"
                {...register('old_password')}
              />

              {errors?.password?.message && (
                <ErrorMessage message={errors.password?.message} />
              )}
            </FormControl>
            <FormControl>
              <InputLabel label="New Password" />
              <PasswordInput
                className="w-[4/5] pr-10"
                placeholder="Enter Password"
                {...register('password')}
              />

              <ErrorMessage message={errors?.password?.message} />
            </FormControl>
            <FormControl>
              <InputLabel label="Confirm Password" />
              <PasswordInput
                className="w-[4/5] pr-10"
                placeholder="Enter Confirm Password"
                {...register('confirmPassword')}
              />

              <ErrorMessage message={errors.confirmPassword?.message} />
            </FormControl>
          </FlexColumn>
        )}
      </div>
      <Button
        className="mx-auto w-fit"
        disabled={!isDirty || isUpdating || isPasswordChanging}
        isLoading={isUpdating || isPasswordChanging}
        type="submit"
      >
        <Icon name="save" />
        Save Changes
      </Button>
    </form>
  );
};

export default AccountSettings;
