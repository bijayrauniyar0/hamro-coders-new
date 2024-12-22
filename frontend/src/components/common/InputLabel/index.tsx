import ToolTip from '@Components/radix/ToolTip';

interface IInputLabelProps {
  label: string | undefined;
  tooltipMessage?: string;
  astric?: boolean;
  id?: string;
  disabled?: boolean;
}

export default function InputLabel({
  label,
  tooltipMessage,
  astric,
  id,
  disabled,
}: IInputLabelProps) {
  return (
    <div
      className={`flex items-center justify-start gap-x-[0.375rem] ${
        disabled ? 'text-grey-600' : ''
      }`}
    >
      <div className="flex items-center">
        <p id={id} className="label">
          {label}
        </p>
        {astric ? <span className="text-red-600">&nbsp;*</span> : null}
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
