import { cn } from '@Utils/index';

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
  return (
    <div className={cn('flex w-fit items-center gap-2', className)}>
      {headerOptions.map((header: Record<string, any>) => (
        <div
          onClick={() => {
            if (onChange) {
              onChange(header.value);
            }
          }}
          key={header.id}
          className="cursor-pointer"
        >
          <p
            className={`border-b-2 px-3 py-1 text-sm font-semibold duration-200 hover:text-primary-700 md:text-base ${
              header.value === activeTab
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
