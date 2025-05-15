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
import useLeaderboardStore from '@Store/slices/leaderboard';
import { filterOptions } from '@Constants/Leaderboard';
import { TestsType } from '@Constants/Types/academics';
import { getStreams, getTestsByStreams } from '@Services/academics';

const Filters = () => {
  const { filters, setFilters, resetFilters, isFiltersOpen } =
    useLeaderboardStore();
  const { stream_id, filter_by, test_id } = filters;
  const {
    data: streamsList,
    isLoading: streamsListIsLoading,
    isSuccess: streamsListIsSuccess,
  } = useQuery({
    queryKey: ['streams'],
    queryFn: () => getStreams(),
    select: ({ data }) => {
      return data.map((stream: any) => ({
        id: stream.id,
        label: stream.name,
        value: stream.id,
      }));
    },
  });
  const { data: testsList, isLoading: testsListIsLoading } = useQuery({
    queryKey: ['tests', stream_id],
    queryFn: () => getTestsByStreams(stream_id),
    select: ({ data }) => {
      return [...data];
    },
    enabled: !!stream_id,
  });

  const variants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  useEffect(() => {
    if (streamsListIsSuccess && !isEmpty(streamsList)) {
      setFilters({ stream_id: streamsList[0].value });
    }
  }, [setFilters, streamsList, streamsListIsSuccess]);

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate={isFiltersOpen ? 'visible' : 'hidden'}
      className={`absolute z-[200] flex h-full flex-col gap-4 rounded-lg border bg-gray-50 px-6 py-4 shadow-lg md:w-full lg:relative lg:!translate-x-0 lg:!opacity-100 ${!isFiltersOpen ? 'hidden lg:flex' : ''}`}
    >
      <FlexRow className="items-center justify-between">
        <p className="text-lg font-semibold text-matt-100">Filters</p>
        <button
          className="reset-button flex items-center gap-1"
          onClick={() => {
            resetFilters();
            setFilters({ stream_id: streamsList[0]?.value });
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
          setFilters({ filter_by: val });
        }}
        className="mx-auto rounded-lg bg-gray-50 px-4 py-2 shadow-sm"
      />
      <FlexColumn className="gap-6">
        <FlexColumn className="gap-2 pt-4">
          <Label
            label="Select Stream"
            className="text-md font-semibold text-matt-100"
          />
          <DropDown
            options={streamsList}
            isLoading={streamsListIsLoading}
            value={stream_id}
            onChange={val => {
              if (!val) return;
              setFilters({ stream_id: val });
              setFilters({ test_id: [] });
            }}
            placeholder="Select Filter"
            choose="value"
          />
        </FlexColumn>
        <FlexColumn className="gap-2">
          <Label
            label="Select Tests"
            className="text-md font-semibold text-matt-100"
          />
          {testsListIsLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-4 w-full animate-pulse rounded bg-gray-200"
              />
            ))
          ) : isEmpty(testsList) ? (
            <p className="text-sm text-matt-200">No Tests Available</p>
          ) : (
            <FlexColumn className="scrollbar max-h-[28rem] overflow-y-auto rounded-lg bg-gray-100">
              {testsList?.map((test: TestsType) => (
                <button
                  className="reset-button group flex cursor-pointer items-center gap-2 rounded-md px-2 py-4 duration-100"
                  key={test.id}
                  onClick={() => {
                    if (test_id.includes(test.id)) {
                      setFilters({
                        test_id: test_id.filter(id => id !== test.id),
                      });
                    } else {
                      setFilters({ test_id: [...test_id, test.id] });
                    }
                  }}
                >
                  <Checkbox
                    className="filter-checkbox"
                    onChange={e => {
                      if (e.target.checked) {
                        setFilters({
                          test_id: [...test_id, test.id],
                        });
                      } else {
                        setFilters({
                          test_id: test_id.filter(id => id !== test.id),
                        });
                      }
                    }}
                    checked={test_id.includes(test.id)}
                  />
                  <p className="text-sm">{test.title}</p>
                </button>
              ))}
            </FlexColumn>
          )}
        </FlexColumn>
      </FlexColumn>
    </motion.div>
  );
};

export default Filters;
