import { ReactNode } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@Components/radix/Dialog';
import { cn } from '@Utils/index';

interface IModalProps {
  title: string;
  subtitle?: string;
  show: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  headerContent?: string;
  zIndex?: number;
  hideCloseButton?: boolean;
}

export default function Modal({
  title,
  subtitle,
  show,
  onClose,
  children,
  className,
}: IModalProps) {
  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          'max-w-[calc(100vw-2rem)] overflow-hidden bg-white sm:max-w-[42rem] !rounded-xl',
          className,
        )}
      >
        <DialogHeader>
          <DialogTitle className="heading-6 text-left">{title}</DialogTitle>
          <DialogDescription>{subtitle}</DialogDescription>
        </DialogHeader>
        <div className="scrollbar !overflow-x-hidden max-h-[calc(100dvh-10rem)] overflow-y-auto">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
