import React, { useState } from 'react';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import CourseBox from './CourseBox';
import { semestersData, switchTabData } from '@Constants/Academics';
import HeaderSwitchTab from '@Components/common/HeaderSwitchTab';
import { useNavigate, useParams } from 'react-router-dom';
import ToolTip from '@Components/radix/ToolTip';
import { Select } from '@Components/common/FormUI';
import Modes from '@Components/Modes';
import { useTypedSelector } from '@Store/hooks';
import { useQuery } from '@tanstack/react-query';
import { getSubjectsBySemester } from '@Services/academics';
import isEmpty from '@Utils/isEmpty';
import NoDataAvailable from '@Components/common/NoDataAvailable';
import Skeleton from '@Components/radix/Skeleton';
import { getStyle } from '@Utils/index';

const Academics = () => {
  const { courseName } = useParams();
  const isModesOpen = useTypedSelector(state => state.commonSlice.isModesOpen);
  const navigate = useNavigate();
  const [selectedSemester, setSelectedSemester] = useState<string | number>(1);
  const [selectedStyle, setSelectedStyle] = useState<string>('grid');
  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string>('');
  const selectedMode = useTypedSelector(
    state => state.commonSlice.selectedMode,
  );
  function handleNextClick() {
    navigate(
      `/mcq?course=${courseName}&subject_code=${selectedSubjectCode}&semester=${selectedSemester}&selectedMode=${selectedMode}`,
    );
  }
  const { data: subjectsData, isLoading: subjectsDataIsLoading } = useQuery({
    queryKey: ['subjects', courseName, selectedSemester],
    queryFn: () =>
      getSubjectsBySemester({
        semester: selectedSemester,
        course_name: courseName,
      }),
    select: ({ data }) => data,
  });

  return (
    <>
      <FlexColumn className="gap-4">
        <FlexRow className="items-center justify-between">
          <HeaderSwitchTab
            headerOptions={switchTabData}
            activeTab={courseName}
            onChange={(value: string) => {
              // setActiveTab(value);
              navigate(`/academics/${value}`);
            }}
            className="flex-1 gap-2 md:gap-4"
          />
          <FlexRow className="items-center gap-2">
            <ToolTip
              name="grid_view"
              message="Show Grid View"
              iconClick={() => setSelectedStyle('grid')}
              className={`${selectedStyle === 'grid' ? 'rounded-sm !bg-primary-100 p-1' : ''} flex w-[1.5rem] items-center justify-center text-base md:min-w-[2rem] md:text-2xl`}
            />
            <ToolTip
              name="view_list"
              message="Show List View"
              iconClick={() => setSelectedStyle('list')}
              className={`${selectedStyle === 'list' ? 'rounded-sm !bg-primary-100 p-1' : ''} flex w-[1.5rem] items-center justify-center text-base md:min-w-[2rem] md:text-2xl`}
            />
            <Select
              options={semestersData || []}
              placeholder="Select"
              className="!z-0 h-8 !w-[7.25rem] rounded !border border-[#D0D5DD] bg-white md:!w-[11.75rem]"
              valueKey="value"
              selectedOption={+selectedSemester}
              onChange={value => {
                setSelectedSemester(value);
              }}
            />
          </FlexRow>
        </FlexRow>
        {subjectsDataIsLoading ? (
          <div className={getStyle(selectedStyle)}>
            {[...Array(5).keys()].map(key => (
              <Skeleton
                className={`h-[12rem] ${selectedStyle === 'list' ? 'w-full' : 'w-[18rem]'}`}
                key={key}
              />
            ))}
          </div>
        ) : isEmpty(subjectsData) ? (
          <NoDataAvailable />
        ) : (
          <div key={courseName}>
            <CourseBox
              courseDetails={subjectsData}
              selectedStyle={selectedStyle}
              handlePlay={(subjectCode: string) =>
                setSelectedSubjectCode(subjectCode)
              }
            />
          </div>
        )}
      </FlexColumn>
      {isModesOpen && <Modes handleNextClick={handleNextClick} />}
    </>
  );
};

export default Academics;
