interface IIconButtonProps {
  name: string;
  className?: string;
  iconClassName?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function IconButton({
  name,
  className,
  iconClassName,
  onClick,
  disabled,
}: IIconButtonProps) {
  return (
    <button
      type="button"
      className={`flex h-10 w-10 items-center justify-center ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <i
        className={`material-icons-outlined ${
          disabled ? '!text-[#CED5DF]' : ''
        } ${iconClassName}`}
      >
        {name}
      </i>
    </button>
  );
}
