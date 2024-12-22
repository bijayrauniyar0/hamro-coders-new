import { cn } from '@Utils/index';
import { useState } from 'react';

interface IHeaderSwitchTabProps {
  headerOptions: Record<string, any>;
  activeTab?: string;
  onChange?: any;
  className?: string;
}

const HeaderSwitchTab = ({
  headerOptions,
  activeTab,
  onChange,
  className,
}: IHeaderSwitchTabProps) => {
  const [activeLabel, setActiveLabel] = useState(activeTab);

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {headerOptions.map((header: Record<string, any>) => (
        <div
          onClick={() => {
            setActiveLabel(header.value);
            if (onChange) {
              onChange(header.value);
            }
          }}
          key={header.id}
          className="cursor-pointer"
        >
          <p
            className={`border-b-2 text-sm font-semibold duration-200 hover:text-[#0B2E62] md:text-base ${
              header.value === activeLabel
                ? 'border-primary-700 py-0 text-primary-700'
                : 'border-transparent text-gray-500'
            }`}
          >
            {header.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default HeaderSwitchTab;
