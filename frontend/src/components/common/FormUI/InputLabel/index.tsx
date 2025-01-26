import ToolTip from '@Components/radix/ToolTip';

export interface IInputLabelProps {
  label: string | undefined;
  tooltipMessage?: string;
  astric?: boolean;
  id?: string;
  disabled?: boolean;
  className?: string;
}

export default function InputLabel({
  label,
  tooltipMessage,
  astric,
  id,
  disabled,
  className,
}: IInputLabelProps) {
  return (
    <div
      className={`input-label flex items-center gap-x-[0.375rem] ${className} ${
        disabled ? 'text-grey-600' : ''
      }`}
    >
      <div className="flex items-center">
        <p id={id} className="body-md-regular text-black-700 mb-1">
          {label}
        </p>
        {astric ? <span className="text-red-700">&nbsp;*</span> : null}
      </div>
      <div className="mt-[2px] h-5 w-5">
        {tooltipMessage ? (
          <ToolTip
            name="info"
            message={tooltipMessage || 'tooltip'}
            className="text-lg text-matt-200"
          />
        ) : null}
      </div>
    </div>
  );
}
