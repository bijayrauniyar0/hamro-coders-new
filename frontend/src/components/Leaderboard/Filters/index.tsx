import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

import DropDown from '@Components/common/DropDown';
import { Label } from '@Components/common/FormUI';
import Checkbox from '@Components/common/FormUI/CheckBox';
import HeaderSwitchTab from '@Components/common/HeaderSwitchTab';
import Icon from '@Components/common/Icon';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import Skeleton from '@Components/radix/Skeleton';
import isEmpty from '@Utils/isEmpty';
import { resetFilters, setFilters } from '@Store/actions/leaderboard';
import { useTypedDispatch, useTypedSelector } from '@Store/hooks';
import { filterOptions } from '@Constants/Leaderboard';
import { SubjectType } from '@Constants/Types/academics';
import { getCourses, getSubjectsByCourse } from '@Services/academics';

const Filters = () => {
  const dispatch = useTypedDispatch();

  const { course_id, subject_id, filter_by } = useTypedSelector(
    state => state.leaderboardSlice.filters,
  );
  const isFiltersOpen = useTypedSelector(
    state => state.leaderboardSlice.isFiltersOpen,
  );
  const {
    data: coursesList,
    isLoading: coursesListIsLoading,
    isSuccess: coursesListIsSuccess,
  } = useQuery({
    queryKey: ['courses'],
    queryFn: () => getCourses(),
    select: ({ data }) => {
      return data.map((course: any) => ({
        id: course.id,
        label: course.course_name,
        value: course.id,
      }));
    },
  });
  const { data: subjectsList, isLoading: subjectsListIsLoading } = useQuery({
    queryKey: ['subjects', course_id],
    queryFn: () => getSubjectsByCourse(course_id),
    select: ({ data }) => {
      return [...data];
    },
    enabled: !!course_id,
  });

  const variants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  useEffect(() => {
    if (coursesListIsSuccess && !isEmpty(coursesList)) {
      dispatch(setFilters({ course_id: coursesList[0].value }));
    }
  }, [coursesListIsSuccess]);

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate={isFiltersOpen ? 'visible' : 'hidden'}
      className={`absolute z-[20] flex h-[calc(100vh-10rem)] w-[95%] flex-col gap-4 rounded-lg border bg-gray-50 px-6 py-4 shadow-lg md:relative md:w-full md:!translate-x-0 md:!opacity-100 ${!isFiltersOpen ? 'hidden md:flex' : ''}`}
    >
      <FlexRow className="items-center justify-between">
        <p className="text-lg font-semibold text-matt-100">Filters</p>
        <button
          className="reset-button flex items-center gap-1"
          onClick={() => {
            dispatch(resetFilters());
            dispatch(setFilters({ course_id: coursesList[0]?.value }));
          }}
        >
          <Icon
            name="restart_alt"
            className="flex items-center justify-center text-primary-700"
          />
          <p className="text-md font-semibold text-primary-700">Reset</p>
        </button>
      </FlexRow>
      <HeaderSwitchTab
        headerOptions={filterOptions}
        activeTab={filter_by}
        onChange={(val: any) => {
          dispatch(setFilters({ filter_by: val }));
        }}
        className="mx-auto rounded-lg bg-gray-50 px-4 py-2 shadow-sm"
      />
      <FlexColumn className="gap-6">
        <FlexColumn className="gap-2 pt-4">
          <Label
            label="Select Course"
            className="text-md font-semibold text-matt-100"
          />
          <DropDown
            options={coursesList}
            isLoading={coursesListIsLoading}
            value={course_id}
            onChange={val => {
              if (!val) return;
              dispatch(setFilters({ course_id: val }));
              dispatch(setFilters({ subject_id: [] }));
            }}
            placeholder="Select Filter"
            choose="value"
          />
        </FlexColumn>
        <FlexColumn className="gap-2">
          <Label
            label="Select Subjects"
            className="text-md font-semibold text-matt-100"
          />
          {subjectsListIsLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-4 w-full animate-pulse rounded bg-gray-200"
              />
            ))
          ) : isEmpty(subjectsList) ? (
            <p className="text-sm text-matt-200">No Subjects Available</p>
          ) : (
            <FlexColumn className="scrollbar max-h-[28rem] overflow-y-auto rounded-lg bg-gray-100">
              {subjectsList?.map((subject: SubjectType) => (
                <button
                  className="reset-button group flex cursor-pointer items-center gap-2 rounded-md px-2 py-4 duration-100"
                  key={subject.id}
                  onClick={() => {
                    if (subject_id.includes(subject.id)) {
                      dispatch(
                        setFilters({
                          subject_id: subject_id.filter(
                            id => id !== subject.id,
                          ),
                        }),
                      );
                    } else {
                      dispatch(
                        setFilters({ subject_id: [...subject_id, subject.id] }),
                      );
                    }
                  }}
                >
                  <Checkbox
                    className="filter-checkbox"
                    onChange={e => {
                      if (e.target.checked) {
                        dispatch(
                          setFilters({
                            subject_id: [...subject_id, subject.id],
                          }),
                        );
                      } else {
                        dispatch(
                          setFilters({
                            subject_id: subject_id.filter(
                              id => id !== subject.id,
                            ),
                          }),
                        );
                      }
                    }}
                    checked={subject_id.includes(subject.id)}
                  />
                  <p className="text-sm">{subject.title}</p>
                </button>
              ))}
            </FlexColumn>
          )}
          {/* <DropDown
            options={subjectsList}
            isLoading={subjectsListIsLoading}
            value={subject_id}
            onChange={val => dispatch(setFilters({ subject_id: val }))}
            placeholder="Select Subjects"
            choose="value"
            multiple
          /> */}
          {/* <FlexRow className="flex-wrap items-start gap-2">
            {selectedSubjects?.map((subject: IDropDownData) => (
              <button
                key={subject.id}
                className="flex w-fit items-center justify-center gap-2 rounded-[2.5rem] border px-2 py-2"
                onClick={() =>
                  dispatch(
                    setFilters({
                      subject_id: subject_id.filter(id => id !== subject.id),
                    }),
                  )
                }
              >
                <p className="text-sm leading-3 tracking-tighter">
                  {subject.label}
                </p>
                <Icon
                  name="close"
                  className="flex items-center justify-center !text-md text-matt-200"
                />
              </button>
            ))}
          </FlexRow> */}
        </FlexColumn>
      </FlexColumn>
    </motion.div>
  );
};

export default Filters;
