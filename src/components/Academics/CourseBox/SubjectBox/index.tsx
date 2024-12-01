import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import { Button } from '@Components/radix/Button';
import { ISubjectBoxProps } from '@Constants/Types/academics';
import mcqThumbnail from '@Assets/images/mcq-thumbnail.png';
import { useNavigate } from 'react-router-dom';

const SubjectBox = ({ courseDetails }: ISubjectBoxProps) => {
  const navigate = useNavigate();
  return (
    <>
      <FlexColumn className="w-full flex-1 gap-4">
        <div className="h-[12rem] w-full rounded-lg bg-gray-200">
          <img src={mcqThumbnail} alt="" className="w-full object-cover" />
        </div>
        <FlexRow className="items-center justify-between gap-1">
          <p className="text-base font-medium">{courseDetails.name}</p>
          <Button onClick={() => navigate('/academics/bca')}>Play</Button>
        </FlexRow>
      </FlexColumn>
    </>
  );
};

export default SubjectBox;
