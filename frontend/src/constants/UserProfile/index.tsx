import anonymous from '@Assets/images/avatar/anonymous.png';
import bear from '@Assets/images/avatar/bear.png';
import girl from '@Assets/images/avatar/girl.png';
import hacker from '@Assets/images/avatar/hacker.png';
import hacker1 from '@Assets/images/avatar/hacker-1.png';
import man from '@Assets/images/avatar/man.png';
import woman from '@Assets/images/avatar/woman.png';
import woman2 from '@Assets/images/avatar/woman-2.png';

export const avatars: { [key: string]: string } = {
  woman,
  woman2,
  girl,
  hacker,
  man,
  bear,
  hacker1,
  anonymous,
};

export type AvatarKeyType = keyof typeof avatars;
export const getAvatar = (avatarKey: AvatarKeyType) => {
  return avatars[avatarKey] || anonymous;
};
