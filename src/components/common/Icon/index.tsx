interface IIconProps extends React.HTMLAttributes<HTMLElement> {
  name: string;
  className?: string;
  onClick?: () => void;
  type?: string;
}

export default function Icon({
  name,
  className,
  onClick,
  type = 'material-symbols-outlined',
}: IIconProps): JSX.Element {
  return (
    <span
      className=""
      role="button"
      tabIndex={0}
      onKeyUp={() => {}}
      onClick={onClick}
    >
      <i
        className={`${type} naxatw-text-icon-sm lg:naxatw-text-icon-md ${className}`}
      >
        {name}
      </i>
    </span>
  );
}
