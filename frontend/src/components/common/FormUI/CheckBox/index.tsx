 
/* eslint-disable no-unused-vars */
import * as React from 'react';

import { cn } from '@Utils/index';

export interface ICheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
  value?: string | number;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  defaultCheck?: boolean;
  mainWrapperStyles?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, ICheckboxProps>(
  (
    {
      className,
      placeholder,
      label,
      labelClassName,
      checked,
      onChange,
      defaultCheck,
      mainWrapperStyles,
      ...rest
    },
    ref,
  ) => {
    return (
      <div
        className={`flex items-center justify-start gap-2 ${mainWrapperStyles}`}
      >
        <input
          type="checkbox"
          className={cn(
            `body-sm custom-checkbox relative h-4 max-h-4 min-h-4 w-4 min-w-4 max-w-4`,
            className,
          )}
          defaultChecked={defaultCheck}
          checked={checked}
          onChange={onChange}
          ref={ref}
          {...rest}
        />

        {label ? (
          <label className={cn(`body-sm`, labelClassName)}>{label}</label>
        ) : null}
      </div>
    );
  },
);
Checkbox.displayName = 'Checkbox';

export default Checkbox;
