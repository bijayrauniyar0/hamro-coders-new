import { HTMLAttributes } from 'react';

import { cn } from '@Utils/index';

interface IErrorMessageProps extends HTMLAttributes<HTMLDivElement> {
  message?: string | undefined;
  disabled?: boolean;
}
export default function ErrorMessage({
  message = '',
  disabled,
  className,
}: IErrorMessageProps) {
  return (
    <p
      className={cn(
        `ml-1 mt-1 text-left text-sm leading-5 text-red-600 ${disabled ? 'text-grey-600' : ''}`,
        className,
      )}
    >
      {message}
    </p>
  );
}
