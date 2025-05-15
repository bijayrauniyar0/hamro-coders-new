import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cardVariants, containerVariants } from '@Animations/index';
// import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ChevronRight, Users } from 'lucide-react';

import BindContentContainer from '@Components/common/BindContentContainer';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import NoDataAvailable from '@Components/common/NoDataAvailable';
import Searchbar from '@Components/common/SearchBar';
import StatusChip from '@Components/common/StatusChip';
import Skeleton from '@Components/radix/Skeleton';
import isEmpty from '@Utils/isEmpty';
import { StreamsType } from '@Constants/Types/academics';
import { getStreams } from '@Services/academics';

const Streams = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const { data: streamsData, isLoading: streamsDataIsLoading } = useQuery({
    queryKey: ['streams'],
    queryFn: () => getStreams(),
    select: ({ data }) => data as StreamsType[],
  });

  const streams = useMemo(() => {
    const searchedStreams = streamsData?.filter(stream =>
      stream.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
    return searchedStreams;
  }, [streamsData, searchValue]);

  const getStatusLabel = (stream: StreamsType) => {
    if (stream?.tests_count > 0) {
      return `${stream?.tests_count} Tests`;
    }
    return 'Coming Soon';
  };
  const getStatusColor = (stream: StreamsType) => {
    if (stream?.tests_count > 0) {
      return 'success';
    }
    return 'warning';
  };
  return (
    <BindContentContainer>
      <FlexColumn className="w-full gap-4">
        <FlexRow className="w-full items-center justify-between">
          <p className="font-semibold text-primary-700 md:text-md lg:text-lg">
            Streams
          </p>
          <Searchbar
            wrapperStyle="!w-[10rem] lg:!w-[15rem]"
            placeholder="Search streams"
            onChange={e => setSearchValue(e.target.value)}
            value={searchValue}
            isSmall
          />
        </FlexRow>
        {streamsDataIsLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-4 lg:grid-cols-4">
            {[...Array(5).keys()].map(key => (
              <Skeleton className="h-[12rem]" key={key} />
            ))}
          </div>
        ) : isEmpty(streams) ? (
          <div className="flex h-[calc(100vh-20rem)] items-center justify-center">
            <NoDataAvailable />
          </div>
        ) : (
          <FlexColumn className="no-scrollbar max-h-[calc(100dvh-9rem)] gap-4 overflow-y-auto pb-4">
            <motion.div
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-4 lg:grid-cols-4"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {streams?.map(stream => {
                return (
                  <motion.button
                    variants={cardVariants}
                    key={stream.id}
                    className="reset-button disabled:cursor-not-allowed"
                    onClick={() => navigate(`/streams/tests/${stream.id}`)}
                    disabled={stream?.tests_count === 0}
                  >
                    <div
                      className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:border-primary-200 hover:shadow-lg"
                      aria-disabled
                    >
                      <FlexColumn className="gap-4 px-6 py-5">
                        <FlexRow className="items-start justify-between">
                          <p className="text-md font-semibold text-gray-700 transition-colors duration-200 group-hover:text-primary-700 md:text-base">
                            {stream.name}
                          </p>
                        </FlexRow>

                        {stream.students_count > 0 ? (
                          <FlexRow className="items-center">
                            <Users size={14} className="mr-1 text-gray-400" />
                            <span className="text-xs text-gray-500">
                              {stream.students_count} students
                            </span>
                          </FlexRow>
                        ) : (
                          <div className="w-fit">
                            <StatusChip label="New" status="info" />
                          </div>
                        )}

                        <FlexRow className="items-center justify-between border-t border-gray-100 pt-4">
                          <StatusChip
                            label={getStatusLabel(stream)}
                            status={getStatusColor(stream)}
                          />

                          {stream.tests_count > 1 && (
                            <button className="inline-flex items-center text-sm font-medium text-primary-600 transition-transform duration-200 hover:text-indigo-800 group-hover:translate-x-1">
                              Continue
                              <ChevronRight size={14} className="ml-1" />
                            </button>
                          )}
                        </FlexRow>
                      </FlexColumn>
                    </div>
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

export default Streams;
