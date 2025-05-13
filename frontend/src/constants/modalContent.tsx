import { ReactElement } from 'react';

export type ModalContentsType =
  | 'sign-up-success'
  | 'add-user'
  | 'edit-user'
  | 'add-role'
  | 'edit-role'
  | 'add-category'
  | 'edit-category'
  | 'upload-data'
  | 'account-setting'
  | 'upload-temporary-layer'
  | 'forgot-password'
  | 'attribute-table'
  | 'add-attribute'
  | 'select-icon'
  | 'upload-icon'
  | null;

type ModalReturnType = {
  title: string;
  content: ReactElement;
  className?: string;
  hideCloseButton?: boolean;
};

export function getModalContent(content: ModalContentsType): ModalReturnType {
  switch (content) {
    default:
      return {
        title: '',
        content: <></>,
      };
  }
}
