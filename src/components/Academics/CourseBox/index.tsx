import { Select } from '@Components/common/FormUI';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import { semestersData } from '@Constants/Academics';
import React, { useState } from 'react';
import ToolTip from '@Components/radix/ToolTip';
import SubjectRow from './SubjectRow';
import { ISubjects } from '@Constants/Types/academics';
import SubjectBox from './SubjectBox';

interface ICourse {
  semester: string;
  semesterNumber: number;
  subjects: ISubjects[];
}

interface ICourseBoxProps {
  courseDetails: ICourse[];
  courseName: string;
}

const CourseBox = ({ courseDetails, courseName }: ICourseBoxProps) => {
  const [selectedOption, setSelectedOption] = useState<string | number>(1);
  const [filteredList, setFilteredlist] = useState<ISubjects[]>(
    courseDetails[0].subjects,
  );
  const [selectedStyle, setSelectedStyle] = useState<string>('grid');

  function getStyle() {
    switch (selectedStyle) {
      case 'grid':
        return 'grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5';
      case 'list':
        return 'flex flex-col gap-4 w-full';
      default:
        return 'grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5';
    }
  }
  function getComponentAccordingToStyle(key: number, semester: ISubjects) {
    switch (selectedStyle) {
      case 'grid':
        return <SubjectBox key={key} courseDetails={semester} />;
      case 'list':
        return <SubjectRow key={key} courseDetails={semester} />;
      default:
        return <SubjectBox key={key} courseDetails={semester} />;
    }
  }

  return (
    // <FlexColumn className="gap-4">
    //   <FlexRow className="items-center justify-between">
    //     <p className="text-lg font-bold">{courseName}</p>
    //     <FlexRow className="items-center gap-2">
    //       <ToolTip
    //         name="grid_view"
    //         message="Show Grid View"
    //         iconClick={() => setSelectedStyle('grid')}
    //         className={`${selectedStyle === 'grid' ? '!bg-secondary-100 rounded-sm p-1' : ''} flex items-center justify-center min-w-[2rem]`}
    //       />
    //       <ToolTip
    //         name="view_list"
    //         message="Show List View"
    //         iconClick={() => setSelectedStyle('list')}
    //         className={`${selectedStyle === 'list' ? '!bg-secondary-100 rounded-sm p-1' : ''} flex items-center justify-center min-w-[2rem]`}
    //       />
    //       <Select
    //         options={semestersData || []}
    //         placeholder="Select"
    //         className="!z-0 h-8 !w-[11.25rem] rounded !border border-[#D0D5DD] bg-white"
    //         valueKey="value"
    //         selectedOption={+selectedOption}
    //         onChange={value => {
    //           setSelectedOption(value);
    //           const filteredSemesterData = courseDetails.filter(
    //             semesterX => semesterX.semesterNumber === +value,
    //           );
    //           setFilteredlist(filteredSemesterData[0].subjects);
    //         }}
    //       />
    //     </FlexRow>
    //   </FlexRow>
    //   <div className={getStyle()}>
    //     {filteredList.map((semester, index) => {
    //       return <SubjectBox key={index} courseDetails={semester} />;
    //     })}
    //   </div>
    // </FlexColumn>
    <FlexColumn className="gap-4">
      <FlexRow className="items-center justify-between">
        <p className="text-lg font-bold">{courseName}</p>
        <FlexRow className="items-center gap-2">
          <ToolTip
            name="grid_view"
            message="Show Grid View"
            iconClick={() => setSelectedStyle('grid')}
            className={`${selectedStyle === 'grid' ? 'rounded-sm !bg-secondary-100 p-1' : ''} flex min-w-[2rem] items-center justify-center`}
          />
          <ToolTip
            name="view_list"
            message="Show List View"
            iconClick={() => setSelectedStyle('list')}
            className={`${selectedStyle === 'list' ? 'rounded-sm !bg-secondary-100 p-1' : ''} flex min-w-[2rem] items-center justify-center`}
          />
          <Select
            options={semestersData || []}
            placeholder="Select"
            className="!z-0 h-8 !w-[11.25rem] rounded !border border-[#D0D5DD] bg-white"
            valueKey="value"
            selectedOption={+selectedOption}
            onChange={value => {
              setSelectedOption(value);
              const filteredSemesterData = courseDetails.filter(
                semesterX => semesterX.semesterNumber === +value,
              );
              setFilteredlist(filteredSemesterData[0].subjects);
            }}
          />
        </FlexRow>
      </FlexRow>
      <div className={getStyle()}>
        {filteredList.map((semester, index) => {
          // return <SubjectBox key={index} courseDetails={semester} />;
          return getComponentAccordingToStyle(index, semester);
        })}
      </div>
    </FlexColumn>
  );
};

export default CourseBox;
