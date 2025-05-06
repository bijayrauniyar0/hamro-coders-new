import { HTMLAttributes } from 'react';

import { cn } from '@Utils/index';

export default function BindContentContainer({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={cn('m-auto max-w-[90rem] max-2xl:px-4 max-sm:px-2 max-md:px-2 pt-4 md:pt-7 pb-6', className)}>
      {children}
    </div>
  );
}
