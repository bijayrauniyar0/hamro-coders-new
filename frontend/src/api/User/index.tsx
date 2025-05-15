import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

import { User } from '@Store/auth';
import { updateUser } from '@Services/common';

interface UseUserProfileUpdateProps {
  // eslint-disable-next-line no-unused-vars
  onSuccess?: (data: any) => void; // Define the type of the success data according to your needs
}

export type UserProfileUpdate = Partial<Omit<User, 'avatar'>> & {
  avatar?: File; // Adding the avatar field with File type
};
export const useUserProfileUpdate = ({
  onSuccess,
}: UseUserProfileUpdateProps) => {
  const mutation = useMutation({
    mutationFn: (data: UserProfileUpdate) => updateUser(data),
    onSuccess: data => {
      // Call the passed in onSuccess callback
      if (onSuccess) {
        onSuccess(data);
      }
      // Optionally show a success toast
      toast.success('Profile updated successfully');
    },
    onError: error => {
      toast.error(error.message || 'Failed to update profile');
    },
  });

  return mutation;
};
