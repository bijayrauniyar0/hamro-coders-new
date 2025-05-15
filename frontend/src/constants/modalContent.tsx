import { ReactElement } from 'react';

import AccountSettings from '@Components/UserProfile/AccountSettings';

export type ModalContentsType = 'edit-profile' | null;

type ModalReturnType = {
  title: string;
  content: ReactElement;
  className?: string;
  hideCloseButton?: boolean;
};

export function getModalContent(content: ModalContentsType): ModalReturnType {
  switch (content) {
    case 'edit-profile':
      return {
        title: 'Edit Profile',
        content: <AccountSettings />,
      };

    default:
      return {
        title: '',
        content: <></>,
      };
  }
}
