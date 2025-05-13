import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { cardVariants, containerVariants } from '@Animations/index';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';

import BindContentContainer from '@Components/common/BindContentContainer';
import BreadCrumb from '@Components/common/FormComponent/BreadCrumb';
import hasErrorBoundary from '@Components/common/hasErrorBoundary';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import NoDataAvailable from '@Components/common/NoDataAvailable';
import Searchbar from '@Components/common/SearchBar';
import Skeleton from '@Components/radix/Skeleton';
import isEmpty from '@Utils/isEmpty';
import useAuthStore from '@Store/auth';
import { TestsType } from '@Constants/Types/academics';
import { getTestsByStreams } from '@Services/academics';
import { toggleBookmark } from '@Services/bookmark';

import TestBox from './MockTestBox';

const MockTests = () => {
  const [searchValue, setSearchValue] = useState('');
  const queryClient = useQueryClient();

  const { stream_id } = useParams();
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  const { data: mockTestsData, isLoading: mockTestsDataIsLoading } = useQuery({
    queryKey: ['mockTests'],
    queryFn: () => getTestsByStreams(Number(stream_id) || 0),
    enabled: !!stream_id,
    select: ({ data }) => data as TestsType[],
  });

  const filteredTests = useMemo(() => {
    if (!mockTestsData) return [];
    return mockTestsData.filter(({ title }: TestsType) =>
      title?.toLowerCase()?.includes(searchValue.toLowerCase()),
    );
  }, [mockTestsData, searchValue]);

  const { mutate: updateBookmark } = useMutation({
    mutationFn: (mockTestId: number) => {
      return toggleBookmark(mockTestId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mockTests'] });
    },
  });

  return (
    <BindContentContainer>
      <FlexColumn className="w-full gap-4">
        <FlexRow className="w-full items-center justify-between">
          <BreadCrumb onBackClick={() => navigate(-1)} heading="Tests" />
          <Searchbar
            wrapperStyle="!w-[10rem] lg:!w-[15rem]"
            placeholder="Search mockTests"
            onChange={e => setSearchValue(e.target.value)}
            value={searchValue}
          />
        </FlexRow>
        {mockTestsDataIsLoading ? (
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
            {[...Array(5).keys()].map(key => (
              <Skeleton className="h-[12rem]" key={key} />
            ))}
          </div>
        ) : isEmpty(filteredTests) ? (
          <NoDataAvailable />
        ) : (
          <FlexColumn className="no-scrollbar max-h-[calc(100dvh-9rem)] gap-4 overflow-y-auto pb-4">
            <motion.div
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-4 lg:grid-cols-4"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {filteredTests?.map(test => {
                return (
                  <motion.button variants={cardVariants} key={test.id}>
                    <TestBox
                      title={test.title}
                      stream_name={test.stream_name}
                      students_count={test.students_count}
                      bookmark={test.bookmark}
                      onViewClick={() => {
                        navigate(
                          `/streams/mock-test/${stream_id}/?test_id=${test.id}`,
                        );
                        // navigate(`/mcq/${stream_id}/?test_id=${test.id}`);
                      }}
                      onBookMarkClick={() => {
                        if (!isAuthenticated) {
                          toast.error('Please login to bookmark the test');
                          navigate('/login');
                          return;
                        }
                        updateBookmark(test.id);
                      }}
                    />
                  </motion.button>
                );
              })}
            </motion.div>
          </FlexColumn>
        )}
      </FlexColumn>
    </BindContentContainer>
  );
};

export default hasErrorBoundary(MockTests);
