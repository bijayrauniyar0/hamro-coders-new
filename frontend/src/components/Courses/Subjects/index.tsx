import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import NoDataAvailable from '@Components/common/NoDataAvailable';
import Searchbar from '@Components/common/SearchBar';
import Skeleton from '@Components/radix/Skeleton';
import { getSubjectsByCourse } from '@Services/academics';
import { useQuery } from '@tanstack/react-query';
import isEmpty from '@Utils/isEmpty';
import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cardVariants, containerVariants } from '@Animations/index';
import { SubjectType } from '@Constants/Types/academics';
import SubjectBox from './SubjectBox';
import hasErrorBoundary from '@Components/common/hasErrorBoundary';
import Modes from '@Components/Modes';
import { useTypedSelector } from '@Store/hooks';
import BreadCrumb from '@Components/common/FormComponent/BreadCrumb';

const Subjects = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isModesOpen, setIsModesOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<number>();

  const selectedMode = useTypedSelector(
    state => state.commonSlice.selectedMode,
  );

  const { course_id } = useParams();
  const navigate = useNavigate();

  const { data: subjectsData, isLoading: subjectsDataIsLoading } = useQuery({
    queryKey: ['subjects'],
    queryFn: () => getSubjectsByCourse(Number(course_id) || 0),
    enabled: !!course_id,
    select: ({ data }) => data as SubjectType[],
  });
  const filteredSubjects = useMemo(() => {
    if (!subjectsData) return [];
    return subjectsData.filter(({ title }: SubjectType) =>
      title?.toLowerCase()?.includes(searchValue.toLowerCase()),
    );
  }, [subjectsData, searchValue]);
  return (
    <>
      <FlexColumn className="w-full gap-4">
        <FlexRow className="w-full items-center justify-between">
          <BreadCrumb onBackClick={() => navigate(-1)} heading="Subjects" />
          <Searchbar
            wrapperStyle="!w-[15rem]"
            placeholder="Search Subjects"
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
        ) : isEmpty(filteredSubjects) ? (
          <NoDataAvailable />
        ) : (
          <FlexColumn className="gap-4">
            <motion.div
              className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {filteredSubjects?.map(subject => {
                return (
                  <motion.button
                    variants={cardVariants}
                    key={subject.id}
                    onClick={() => {
                      setSelectedSubject(subject.id);
                      setIsModesOpen(true);
                    }}
                  >
                    <SubjectBox title={subject.title} handlePlay={() => {}} />
                  </motion.button>
                );
              })}
            </motion.div>
          </FlexColumn>
        )}
      </FlexColumn>
      {isModesOpen && (
        <Modes
          onClose={() => setIsModesOpen(false)}
          handleNextClick={() =>
            navigate(
              `/courses/${course_id}/mcq/?subject_id=${selectedSubject}&mode=${selectedMode}`,
            )
          }
        />
      )}
    </>
  );
};

export default hasErrorBoundary(Subjects);
