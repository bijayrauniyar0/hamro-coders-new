/* eslint-disable @typescript-eslint/no-empty-object-type */
import * as React from 'react';

import Icon from '@Components/common/Icon';
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
        <Icon
          name={showPassword ? 'visibility' : 'visibility_off'}
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-2/4 -translate-y-2/4 text-xl"
        />
      </div>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
