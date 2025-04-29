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

  return (
    <div className="flex w-fit items-center justify-start gap-x-2">
      {onBackClick && (
        <IconButton
          name="arrow_back"
          iconClassName="text-primary-700 group-hover:!text-white"
          className="rounded-full !font-normal leading-6 duration-200 hover:bg-primary-400 group"
          onClick={() => {
            onBackClick();
            overlayStatus?.();
          }}
        />
      )}
      <p className='text-base md:text-xl !font-semibold leading-[38px] tracking-[-0.48px] text-primary-700'>
          {heading}
      </p>
    </div>
  );
};

export default BreadCrumb;
