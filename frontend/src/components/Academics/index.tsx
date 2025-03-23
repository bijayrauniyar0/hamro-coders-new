import React, { useMemo, useState } from 'react';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
// import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCourses } from '@Services/academics';
import isEmpty from '@Utils/isEmpty';
import NoDataAvailable from '@Components/common/NoDataAvailable';
import Skeleton from '@Components/radix/Skeleton';
import Searchbar from '@Components/common/SearchBar';
import { motion } from 'framer-motion';
import { cardVariants, containerVariants } from '@Animations/index';
import { Courses } from '@Constants/Types/academics';
import ToolTip from '@Components/radix/ToolTip';

const Academics = () => {
  // const isModesOpen = useTypedSelector(state => state.commonSlice.isModesOpen);
  // const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  // function handleNextClick() {
  //   navigate(
  //     `/mcq?course=${courseName}&subject_code=${selectedSubjectCode}&semester=${selectedSemester}&selectedMode=${selectedMode}`,
  //   );
  // }
  const { data: courseData, isLoading: subjectsDataIsLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: () => getCourses(),
    select: ({ data }) => data as Courses[],
  });

  const courses = useMemo(() => {
    const searchedCourses = courseData?.filter(course =>
      course.course_name.toLowerCase().includes(searchValue.toLowerCase()),
    );
    return searchedCourses;
  }, [courseData, searchValue]);

  return (
    <>
      <FlexColumn className="w-full gap-4">
        <FlexRow className="w-full items-center justify-between">
          <p className="text-xl font-semibold text-matt-100">Courses</p>
          <Searchbar
            wrapperStyle="!w-[15rem]"
            placeholder="Search Courses"
            onChange={e => setSearchValue(e.target.value)}
            value={searchValue}
          />
        </FlexRow>
        {subjectsDataIsLoading ? (
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
            {[...Array(5).keys()].map(key => (
              <Skeleton className="h-[12rem] w-[18rem]" key={key} />
            ))}
          </div>
        ) : isEmpty(courses) ? (
          <NoDataAvailable />
        ) : (
          <FlexColumn className="gap-4">
            <motion.div
              className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {courses?.map((courses, index) => {
                return (
                  <motion.div
                    variants={cardVariants}
                    key={index}
                    className="flex cursor-pointer flex-col gap-8 rounded-lg border bg-white px-6 py-8 shadow-md hover:shadow-lg"
                  >
                    <FlexRow className="w-full items-center justify-between">
                      <p className="!w-[18rem] text-lg font-medium leading-5">
                        {courses.course_name}
                      </p>
                      <ToolTip message="View Course Details" name="info" />
                    </FlexRow>
                    <div className="h-[1px] w-full bg-slate-400" />
                    <FlexRow className="items-center justify-between gap-1">
                      <p className="w-[75%] text-base font-medium leading-5">
                        <span className="text-primary-700">8</span> Subjects
                      </p>
                    </FlexRow>
                  </motion.div>
                );
              })}
            </motion.div>
          </FlexColumn>
        )}
      </FlexColumn>
      {/* {isModesOpen && <Modes handleNextClick={handleNextClick} />} */}
    </>
  );
};

export default Academics;
