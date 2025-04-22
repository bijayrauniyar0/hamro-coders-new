import { cn } from '@Utils/index';

export default function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-[4.5px] bg-grey-200', className)}
      {...props}
    />
  );
}
