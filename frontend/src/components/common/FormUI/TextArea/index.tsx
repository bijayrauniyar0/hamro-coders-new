/* eslint-disable @typescript-eslint/no-empty-object-type */
import React from 'react';

import { cn } from '@Utils/index';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn('w-ful input min-h-[4.5rem]', className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = 'Textarea';

export default Textarea;
