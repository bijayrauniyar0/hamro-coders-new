import { FlexColumn } from '@Components/common/Layouts';
import { Button } from '@Components/radix/Button';
import { ISubjectBoxProps } from '@Constants/Types/academics';
import React from 'react';
import mcqThumbnail from '@Assets/images/mcq-thumbnail.png';

const SubjectRow = ({ courseDetails, handlePlay }: ISubjectBoxProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-gray-300 px-6 py-5 shadow-sm hover:shadow-xl lg:flex-row">
      <div className="h-[12rem] w-full rounded-lg bg-gray-200 lg:w-[18rem]">
        <img
          src={mcqThumbnail}
          alt=""
          className="h-[12rem] w-full object-cover"
        />
      </div>
      <FlexColumn className="w-full flex-1 items-end justify-between gap-4">
        <FlexColumn className="items-start gap-2">
          <p className="text-sm font-semibold md:text-base lg:text-lg">
            {courseDetails.title} ({courseDetails.subjectCode})
          </p>
          <p className="text-justify text-xs font-normal leading-5 md:text-sm lg:text-base">
            {courseDetails.details}
          </p>
        </FlexColumn>
        <Button onClick={handlePlay}>
          <p className="text-xs md:text-sm">Play</p>
        </Button>
      </FlexColumn>
    </div>
  );
};

export default SubjectRow;
