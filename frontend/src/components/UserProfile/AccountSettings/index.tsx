import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import ErrorMessage from '@Components/common/ErrorMessage';
import { FormControl, Input } from '@Components/common/FormUI';
import InputLabel from '@Components/common/FormUI/InputLabel';
import Icon from '@Components/common/Icon';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import { Button } from '@Components/radix/Button';
import isEmpty from '@Utils/isEmpty';
import useAuthStore from '@Store/auth';
import { useCommonStore } from '@Store/common';
import { getAvatar } from '@Constants/UserProfile';
import { UserProfileUpdate } from '@Api/User';
import { updateUser } from '@Services/common';
import { signupSchemaStepOne } from '@Validations/Authentication';

const AccountSettings = () => {
  const queryClient = useQueryClient();
  const userProfile = useAuthStore(state => state.userProfile);
  const toggleModal = useCommonStore(state => state.toggleModal);
  const defaultValues = {
    name: userProfile?.name,
    email: userProfile?.email,
    number: userProfile?.number,
    avatar: userProfile.avatar,
    bio: '',
  };
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isDirty, dirtyFields },
  } = useForm<typeof defaultValues>({
    defaultValues,
    resolver: zodResolver(signupSchemaStepOne),
  });

  const onSuccessFn = () => {
    queryClient.invalidateQueries({ queryKey: ['user-profile'] });
    toggleModal();
  };
  const { mutate: updateUserProfile, isPending: isUpdating } = useMutation({
    mutationFn: (data: UserProfileUpdate) => updateUser(data),
    onSuccess: () => {
      toast.success('Profile updated successfully');
      onSuccessFn();
    },
    onError: error => {
      toast.error(error.message || 'Failed to update profile');
    },
  });
  // const { mutate: changeUserPassword, isPending: isPasswordChanging } =
  //   useMutation({
  //     mutationFn: (data: IChangePasswordPayload) => changePassword(data),
  //     onSuccess: () => {
  //       toast.success('Profile updated successfully');
  //       onSuccessFn();
  //     },
  //     onError: error => {
  //       toast.error(error.message || 'Failed to change profile');
  //     },
  //   });

  // useEffect(() => {
  //   reset(defaultValues);
  // }, [reset]);

  const handleFormSubmit = () => {
    if (isEmpty(dirtyFields)) return;
    const formValues = getValues();
    const updatedValues = Object.keys(dirtyFields).reduce(
      (acc, key) => {
        acc[key] = formValues[key as keyof typeof defaultValues];
        return acc;
      },
      {} as Record<string, any>,
    );
    updateUserProfile(updatedValues);
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <FlexRow className="items-center">
        <img
          src={getAvatar('bear')}
          alt=""
          className="aspect-square h-16 w-16"
        />
      </FlexRow>
      <FlexColumn className="gap-1">
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
            placeholder="Enter Email (e.g. mocksewa@example.com)"
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
        <FormControl>
          <InputLabel label="Bio" />
          <Input
            id="phone"
            type="text"
            placeholder="Enter Bio"
            {...register('number')}
          />
          <ErrorMessage message={errors.number?.message} />
        </FormControl>
      </FlexColumn>
      {/* {formKey === 'password' && (
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
        )} */}
      <Button
        className="mx-auto w-fit"
        disabled={!isDirty || isUpdating}
        isLoading={isUpdating}
        type="submit"
      >
        <Icon name="save" />
        Save Changes
      </Button>
    </form>
  );
};

export default AccountSettings;
