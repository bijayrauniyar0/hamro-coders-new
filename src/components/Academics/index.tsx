import React from 'react';
import { FlexColumn } from '@Components/common/Layouts';
import CourseBox from './CourseBox';
import { bcaSubjects } from '@Constants/Academics';

const Academics = () => {
  return (
    <>
      <FlexColumn className="gap-12">
        <CourseBox courseDetails={bcaSubjects} courseName="BCA" />
        <CourseBox courseDetails={bcaSubjects} courseName="CSIT" />
      </FlexColumn>
    </>
  );
};

export default Academics;
