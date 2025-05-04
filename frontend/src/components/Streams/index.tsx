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
          <FlexColumn className="scrollbar max-h-[calc(100dvh-9rem)] gap-4 overflow-y-auto pb-4">
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

                        <FlexRow className="items-center">
                          <Users size={14} className="mr-1 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            45 students
                          </span>
                        </FlexRow>

                        {/* {!stream.comingSoon && (
                          <div className="mt-3">
                            <div className="relative pt-1">
                              <div className="mb-2 flex items-center justify-between">
                                <div>
                                  <span className="inline-block text-xs font-semibold text-indigo-600">
                                    Progress
                                  </span>
                                </div>
                                <div className="text-right">
                                  <span className="inline-block text-xs font-semibold text-indigo-600">
                                    {stream.progress}%
                                  </span>
                                </div>
                              </div>
                              <div className="mb-1 flex h-2 overflow-hidden rounded bg-indigo-50 text-xs">
                                <div
                                  style={{ width: `${stream.progress}%` }}
                                  className="flex flex-col justify-center whitespace-nowrap rounded bg-gradient-to-r from-indigo-500 to-purple-500 text-center text-white shadow-none"
                                ></div>
                              </div>
                            </div>
                          </div>
                        )} */}

                        <FlexRow className="items-center justify-between border-t border-gray-100 pt-4">
                          <StatusChip
                            label={getStatusLabel(stream)}
                            status={getStatusColor(stream)}
                          />

                          {stream.tests_count > 1 && (
                            <button className="inline-flex items-center text-xs font-medium text-primary-600 transition-transform duration-200 hover:text-indigo-800 group-hover:translate-x-1">
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
