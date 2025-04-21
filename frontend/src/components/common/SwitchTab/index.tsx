import { useEffect, useState } from 'react';

import { cn } from '@Utils/index';

import { FlexRow } from '../Layouts';

interface ISwitchTabProps {
  title?: string;
  options: Record<string, any>;
  wrapperClassName?: string;
  className?: string;
  activeValue?: string;
  activeClassName?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (label: string) => void;
}

const SwitchTab = ({
  options,
  title,
  activeValue,
  wrapperClassName,
  className,
  activeClassName,
  onChange,
}: ISwitchTabProps) => {
  const [activeTab, setActiveTab] = useState(activeValue);

  useEffect(() => {
    if (!activeValue) return;
    setActiveTab(activeValue);
  }, [activeValue]);

  return (
    <FlexRow className={cn('items-start', wrapperClassName)}>
      <p className="body-caption uppercase tracking-wide text-[#484848]">
        <span>{title}</span>
      </p>
      <FlexRow
        className={cn('items-center rounded-lg bg-blue-50 p-1', className)}
      >
        {options?.map(({ label, value }: Record<string, any>) => (
          <span
            role="button"
            tabIndex={0}
            key={label}
            title={`${label}`}
            className={`cursor-pointer select-none text-nowrap rounded-lg px-3 py-[0.38rem] text-sm leading-5 ${
              activeTab === value
                ? cn(
                    'bg-primary-700 text-white shadow-[0px_0px_5px_0px_rgba(0,0,0,0.16)]',
                    activeClassName,
                  )
                : 'hover:text-primary'
            } transition-all duration-300 ease-in-out`}
            onClick={() => {
              setActiveTab(value);
              if (onChange) {
                onChange(value);
              }
            }}
          >
            {label}
          </span>
        ))}
      </FlexRow>
    </FlexRow>
  );
};

export default SwitchTab;
