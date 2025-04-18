import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cardVariants, containerVariants } from '@Animations/index';
// import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import NoDataAvailable from '@Components/common/NoDataAvailable';
import Searchbar from '@Components/common/SearchBar';
import Skeleton from '@Components/radix/Skeleton';
import ToolTip from '@Components/radix/ToolTip';
import isEmpty from '@Utils/isEmpty';
import { CoursesType } from '@Constants/Types/academics';
import { getCourses } from '@Services/academics';

const Courses = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const { data: courseData, isLoading: subjectsDataIsLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: () => getCourses(),
    select: ({ data }) => data as CoursesType[],
  });

  const courses = useMemo(() => {
    const searchedCourses = courseData?.filter(course =>
      course.course_name.toLowerCase().includes(searchValue.toLowerCase()),
    );
    return searchedCourses;
  }, [courseData, searchValue]);

  return (
    <FlexColumn className="w-full gap-4">
      <FlexRow className="w-full items-center justify-between">
        <p className="text-xl font-semibold text-primary-700">Courses</p>
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
            {courses?.map(course => {
              return (
                <motion.button
                  variants={cardVariants}
                  key={course.id}
                  className="flex cursor-pointer reset-button flex-col gap-8 rounded-lg border bg-white px-6 py-8 shadow-box hover:shadow-lg disabled:cursor-not-allowed disabled:bg-gray-100 disabled:hover:shadow-box"
                  onClick={() => navigate(`${course.id}`)}
                  disabled={course?.subjects_count === 0}
                >
                  <FlexRow className="w-full items-center justify-between">
                    <p className="!w-[18rem] text-lg font-medium leading-5">
                      {course.course_name}
                    </p>
                    <ToolTip message="View Course Details" name="info" />
                  </FlexRow>
                  <div className="h-[1px] w-full bg-slate-400" />
                  <FlexRow className="items-center justify-between gap-1">
                    <p className="w-[75%] text-base font-medium leading-5">
                      <span className="text-primary-700">
                        {course?.subjects_count > 0
                          ? course?.subjects_count
                          : ''}{' '}
                      </span>
                      {course?.subjects_count > 0 ? 'Subjects' : 'Coming Soon'}
                    </p>
                  </FlexRow>
                </motion.button>
              );
            })}
          </motion.div>
        </FlexColumn>
      )}
    </FlexColumn>
  );
};

export default Courses;
