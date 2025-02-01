import { HTMLAttributes } from 'react';

import { cn } from '@Utils/index';

export default function BindContentContainer({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={cn('m-auto max-w-[90rem]', className)}>
      {children}
    </div>
  );
}
