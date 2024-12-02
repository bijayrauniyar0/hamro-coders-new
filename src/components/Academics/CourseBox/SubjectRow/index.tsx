import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import { Button } from '@Components/radix/Button';
import { ISubjectBoxProps } from '@Constants/Types/academics';
import React from 'react';
import mcqThumbnail from '@Assets/images/mcq-thumbnail.png';

const SubjectRow = ({ courseDetails }: ISubjectBoxProps) => {
  return (
    <FlexRow className="gap-4 rounded-lg border border-gray-300 px-6 py-5 shadow-sm hover:shadow-xl">
      <div className="h-[12rem] w-[18rem] rounded-lg bg-gray-200">
        <img src={mcqThumbnail} alt="" className="w-full object-cover" />
      </div>
      <FlexColumn className="w-full flex-1 items-end justify-between gap-4">
        <FlexColumn className="items-start gap-2">
          <p className="text-lg font-semibold">
            {courseDetails.name} ({courseDetails.subjectCode})
          </p>
          <p className="text-justify text-base font-normal leading-5">
            {courseDetails.details}
          </p>
        </FlexColumn>
        <Button>Play</Button>
      </FlexColumn>
    </FlexRow>
  );
};

export default SubjectRow;
