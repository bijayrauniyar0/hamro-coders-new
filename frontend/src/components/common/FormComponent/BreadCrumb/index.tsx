import { ChevronLeft } from 'lucide-react';

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
        <ChevronLeft
          className="group rounded-full !font-normal leading-6 text-primary-700 duration-200 hover:bg-primary-400 group-hover:!text-white"
          onClick={() => {
            onBackClick();
            overlayStatus?.();
          }}
        />
      )}
      <p className="text-lg !font-semibold leading-[38px] tracking-[-0.48px] text-primary-700 md:text-xl lg:text-2xl">
        {heading}
      </p>
    </div>
  );
};

export default BreadCrumb;
