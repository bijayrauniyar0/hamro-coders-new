import { AvatarKeyType, getAvatar } from '@Constants/UserProfile';

export const getAvatarImg = (avatar: string) => {
  if (avatar.includes('https://') || avatar.includes('http://')) {
    return avatar;
  }
  return getAvatar(avatar as AvatarKeyType);
};
