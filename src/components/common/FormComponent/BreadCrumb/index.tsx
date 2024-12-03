import IconButton from '@Components/common/IconButton';

interface BreadCrumbProps {
  heading: string;
  overlayStatus?: () => void;
  onBackClick?: () => void;
}

const BreadCrumb = ({
  heading,
  overlayStatus,
  onBackClick,
}: BreadCrumbProps) => {
  const [beforeSlash, afterSlash] = heading.split(' / ');

  return (
    <div className="flex w-full items-end justify-start gap-x-2">
      {onBackClick && (
        <IconButton
          name="arrow_back"
          iconClassName="text-[#0B2E62]"
          className="rounded-full !font-normal leading-6 duration-200 hover:bg-primary-200"
          onClick={() => {
            onBackClick();
            overlayStatus?.();
          }}
        />
      )}
      <div>
        <span className="!text-[24px] !font-bold leading-[38px] tracking-[-0.48px] text-[#0B2E62]">
          {beforeSlash} {afterSlash ? `/ ` : ''}
        </span>

        <span className="!text-[24px] !font-light leading-[38px] tracking-[-0.48px] text-[#0B2E62]">
          {afterSlash}
        </span>
      </div>
    </div>
  );
};

export default BreadCrumb;
