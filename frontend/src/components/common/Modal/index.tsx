import React from 'react';
import Icon from '../Icon';
import { FlexColumn, FlexRow } from '../Layouts';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <FlexColumn
        className="w-11/12 max-w-lg gap-4 rounded-lg bg-white p-6 shadow-lg"
        onClick={e => e.stopPropagation()}
      >
        <FlexRow className="items-center justify-between">
          {title && <p className="text-xl font-semibold">{title}</p>}

          <Icon
            name="close"
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          />
        </FlexRow>
        <div>{children}</div>
      </FlexColumn>
    </div>
  );
};

export default Modal;
