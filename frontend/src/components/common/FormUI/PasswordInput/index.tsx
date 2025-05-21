/* eslint-disable @typescript-eslint/no-empty-object-type */
import * as React from 'react';
import { Eye, EyeClosed } from 'lucide-react';

import { cn } from '@Utils/index';

export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, IInputProps>(
  ({ placeholder, className, ...rest }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="relative">
        <input
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          className={cn(`input body-sm`, className)}
          {...rest}
        />

        {showPassword ? (
          <Eye
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2/4 h-5 w-5 -translate-y-2/4"
          />
        ) : (
          <EyeClosed
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2/4 h-5 w-5 -translate-y-2/4"
          />
        )}
      </div>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
