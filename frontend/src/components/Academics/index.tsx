import React, { useState } from 'react';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import CourseBox from './CourseBox';
import {
  bcaSubjects,
  semestersData,
  switchTabData,
} from '@Constants/Academics';
import HeaderSwitchTab from '@Components/common/HeaderSwitchTab';
import { useNavigate, useParams } from 'react-router-dom';
import ToolTip from '@Components/radix/ToolTip';
import { Select } from '@Components/common/FormUI';
import { ISubjects } from '@Constants/Types/academics';
import Modes from '@Components/Modes';
import { useTypedSelector } from '@Store/hooks';
import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '@Services/common';

const Academics = () => {
  const { courseName } = useParams();
  const isModesOpen = useTypedSelector(state => state.commonSlice.isModesOpen);
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string | number>(1);
  const [selectedStyle, setSelectedStyle] = useState<string>('grid');
  const [filteredList, setFilteredlist] = useState<ISubjects[]>(
    bcaSubjects[0].subjects,
  );
  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string>('');
  const selectedMode = useTypedSelector(
    state => state.commonSlice.selectedMode,
  );
  function handleNextClick() {
    navigate(
      `/mcq?course=${courseName}&subjectCode=${selectedSubjectCode}&semester=${selectedOption}&selectedMode=${selectedMode}`,
    );
  }
  const { data } = useQuery({
    queryKey: ['bcaSubjects'],
    queryFn: getAllUsers,
  });
  console.log(data);
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
              selectedOption={+selectedOption}
              onChange={value => {
                setSelectedOption(value);
                const filteredSemesterData = bcaSubjects.filter(
                  semesterX => semesterX.semesterNumber === +value,
                );
                setFilteredlist(filteredSemesterData[0].subjects);
              }}
            />
          </FlexRow>
        </FlexRow>
        <div key={courseName}>
          <CourseBox
            courseDetails={filteredList}
            selectedStyle={selectedStyle}
            handlePlay={(subjectCode: string) =>
              setSelectedSubjectCode(subjectCode)
            }
          />
        </div>
      </FlexColumn>
      {isModesOpen && <Modes handleNextClick={handleNextClick} />}
    </>
  );
};

export default Academics;
