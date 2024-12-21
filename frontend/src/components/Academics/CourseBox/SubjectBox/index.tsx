import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import { Button } from '@Components/radix/Button';
import { ISubjectBoxProps } from '@Constants/Types/academics';
import mcqThumbnail from '@Assets/images/mcq-thumbnail.png';

const SubjectBox = ({ courseDetails, handlePlay }: ISubjectBoxProps) => {
  return (
    <>
      <FlexColumn className="w-full flex-1 gap-4">
        <div className="h-[12rem] w-full rounded-lg bg-gray-200">
          <img
            src={mcqThumbnail}
            alt=""
            className="h-[12rem] w-full rounded-lg object-cover"
          />
        </div>
        <FlexRow className="items-center justify-between gap-1">
          <p className="w-[75%] text-base font-medium leading-5">
            {courseDetails.name}
          </p>
          <Button onClick={handlePlay}>Play</Button>
        </FlexRow>
      </FlexColumn>
    </>
  );
};

export default SubjectBox;
