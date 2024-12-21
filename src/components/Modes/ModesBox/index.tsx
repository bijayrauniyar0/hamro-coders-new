import { FlexColumn } from '@Components/common/Layouts';

type ModeBoxProps = {
  modeTitle: string;
  modeDescription: string;
  imageUrl: string;
  // eslint-disable-next-line no-unused-vars
  onClick: (id: string) => void;
  id: number;
  className?: string;
  value?: string;
};
const ModeBox = ({
  modeTitle,
  modeDescription,
  imageUrl,
  onClick,
  className,
  value,
}: ModeBoxProps) => {
  return (
    <>
      <div
        role="button"
        onClick={() => onClick(value || '')}
        className={`${className} relative mx-auto w-full max-w-[80%] cursor-pointer self-stretch overflow-hidden rounded-lg bg-white shadow-sm outline outline-4 outline-gray-200 transition-all duration-[0.4s] ease-in-out hover:shadow-lg hover:outline-primary-600 sm:max-w-[16rem] md:max-w-[22rem]`}
      >
        <div className="h-full w-full">
          <img src={imageUrl} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="absolute top-0 h-full w-full bg-gradient-to-b from-transparent to-primary-800/90" />

        <FlexColumn className="drop-shadow- absolute bottom-0 w-full items-center justify-center rounded-lg py-8">
          <p className="has-dropshadow orbitron-regular select-none text-base font-semibold text-white md:text-[2rem]">
            {modeTitle}
          </p>
          <p className="orbitron-regular select-none px-4 text-center text-xs text-white lg:text-sm">
            {modeDescription}
          </p>
        </FlexColumn>
      </div>
    </>
  );
};

export default ModeBox;
