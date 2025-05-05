import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@Utils/index';

const buttonVariants = cva(
  'inline-flex items-center  text-xs max-md:h-fit max-md:px-3 max-md:py-2 md:text-sm  justify-center rounded-md text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-600 text-white text-sm max-md:h-fit max-md:px-3 max-md:py-2 md:text-sm lg:text-base hover:bg-primary-600 disabled:bg-grey-100 disabled:text-grey-500 disabled:border border-grey-300',
        secondary:
          'bg-white text-primary-500 border border-primary-500 hover:bg-primary-100 disabled:bg-grey-100 disabled:text-grey-500 disabled:border border-grey-300',

        link: 'text-primary-600 hover:text-primary-600 text-xs max-md:h-fit max-md:px-3 max-md:py-2 md:text-sm  disabled:bg-grey-100 disabled:text-grey-500 disabled:border border-grey-300',
        ghost:
          'hover:bg-accent hover:text-accent-foreground text-xs max-md:h-fit max-md:px-3 max-md:py-2 md:text-sm ',

        outline:
          'bg-white text-matt-100 border border-grey-600  text-xs max-md:h-fit max-md:px-3 max-md:py-2 md:text-sm focus:border-primary-500 rounded-lg',
      },
      size: {
        normal: 'body-btn h-[2.5rem] py-3 px-5 gap-2 !rounded-lg',
        sm: 'body-btn h-[2.25rem] px-2 py-4 gap-1',
        // lg: 'h-11 px-8 rounded-md',
        // 'lg-icon': 'p-[0.625rem] h-fit',
        // 'sm-icon': 'p-[0.375rem] h-fit',
        'drop-lg':
          'h-[1.75rem] md:h-[2.25rem] rounded-lg !py-1 md:!py-[8px] md:px-3 px-2 gap-2',
        'drop-sm': 'h-[36px]  rounded-lg py-[8px] pl-[4px] pr-[8px] gap-1',
        'drop-tiny': 'h-[36px] pl-[8px] !border-none py-[4px] pr-[4px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'normal',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, isLoading = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      >
        {props.children}
        {isLoading ? (
          <div
            className={`spinner ml-2 ${props?.disabled ? '!border-t-primary-500' : ''}`}
          />
        ) : (
          ''
        )}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
