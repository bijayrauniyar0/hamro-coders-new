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
    <div className="group flex w-fit items-center justify-start gap-x-2">
      {onBackClick && (
        <div className="group hover:bg-primary-300 duration-200 rounded-full p-1 flex justify-center items-center">
          <ChevronLeft
            className="rounded-full !font-normal leading-6 text-primary-700 duration-200 group-hover:!text-white"
            onClick={() => {
              onBackClick();
              overlayStatus?.();
            }}
          />
        </div>
      )}
      <p className="text-lg !font-semibold leading-[38px] tracking-[-0.48px] text-primary-700 md:text-xl lg:text-2xl">
        {heading}
      </p>
    </div>
  );
};

export default BreadCrumb;
