import { cn } from '@Utils/index';

import { IGridContainerProps } from '../types';

export default function Grid({
  className = '',
  children,
  ...rest
}: IGridContainerProps) {
  return (
    <div className={cn(`grid ${className}`)} {...rest}>
      {children}
    </div>
  );
}
