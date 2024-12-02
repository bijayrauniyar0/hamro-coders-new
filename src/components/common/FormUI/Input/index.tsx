import * as React from 'react';

import { cn } from '@Utils/index';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  ({ className, placeholder, type, ...rest }, ref) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        className={cn(
          `input body-sm`,
          // 'ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border border-gray-400 bg-transparent bg-white p-3 text-sm transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...rest}
      />
    );
  },
);
Input.displayName = 'Input';

export default Input;
