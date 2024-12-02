import { FlexColumn } from '@Components/common/Layouts';

type ModeBoxProps = {
  modeTitle: string;
  modeDescription: string;
  imageUrl: string;
};
const ModeBox = ({ modeTitle, modeDescription, imageUrl }: ModeBoxProps) => {
  return (
    <>
      <div className="relative mx-auto h-[35rem] w-full max-w-[25rem] cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm outline outline-gray-200 hover:shadow-lg hover:outline-4 hover:outline-primary-600">
        <div className="h-full w-full">
          <img src={imageUrl} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="absolute top-0 h-full w-full bg-gradient-to-b from-transparent to-primary-800/90" />

        <FlexColumn className="drop-shadow- absolute bottom-0 h-[8rem] w-full items-center justify-center rounded-lg">
          <p className="has-dropshadow orbitron-regular select-none text-[1.75rem] font-semibold text-white md:text-[2.25rem]">
            {modeTitle}
          </p>
          <p className="orbitron-regular select-none px-4 text-center text-sm text-white">
            {modeDescription}
          </p>
        </FlexColumn>
      </div>
    </>
  );
};

export default ModeBox;
