import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight, Funnel } from 'lucide-react';

import BindContentContainer from '@Components/common/BindContentContainer';
import DropDown from '@Components/common/DropDown';
import BreadCrumb from '@Components/common/FormComponent/BreadCrumb';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import NoDataComponent from '@Components/common/NoDataComponent';
import Searchbar from '@Components/common/SearchBar';
import {
  DropdownMenu,
  DropdownMenuContent,
} from '@Components/radix/DropDownMenu';
import Skeleton from '@Components/radix/Skeleton';
import isEmpty from '@Utils/isEmpty';
import { getStreams, getTestsByStreams } from '@Services/academics';
import { getLeaderboard } from '@Services/leaderboard';

import ScoreRow from './ScoreRow';

type UserRank = {
  user_id: number;
  name: string;
  total_score: number;
  rank: number;
  previous_rank: number;
  avatar: string;
};

const Leaderboard = () => {
  const navigate = useNavigate();
  const [streamId, setStreamId] = useState<number>();
  const [mockTestId, setMockTestId] = useState();
  const [searchValue, setSearchValue] = useState('');

  const { data: leaderboardData, isLoading: leaderBoardIsLoading } = useQuery({
    queryKey: ['leaderboard', streamId, mockTestId, searchValue],
    queryFn: () =>
      getLeaderboard({
        filter_by: 'monthly',
        mock_test_id: mockTestId,
        search: searchValue,
      }),
    select: ({ data }) => data as UserRank[],
    enabled: !!streamId && !!mockTestId,
  });

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

  useEffect(() => {
    if (streamsListIsSuccess && !isEmpty(streamsList)) {
      setStreamId(streamsList[0].value);
    }
  }, [streamsList, streamsListIsSuccess]);
  const {
    data: testsList,
    isLoading: testsListIsLoading,
    isSuccess: testsListFetchedSuccessfully,
  } = useQuery({
    queryKey: ['tests', streamId],
    queryFn: () => {
      if (!streamId) return;
      return getTestsByStreams(streamId);
    },
    select: res => {
      return res?.data.map((test: any) => ({
        id: test.id,
        label: test.title,
        value: test.id,
      }));
    },
    enabled: !!streamId,
  });

  useEffect(() => {
    if (
      testsListFetchedSuccessfully &&
      !isEmpty(testsList) &&
      streamsListIsSuccess
    ) {
      setMockTestId(testsList[0].value);
    }
  }, [streamsListIsSuccess, testsList, testsListFetchedSuccessfully]);

  return (
    <BindContentContainer className="relative flex flex-col gap-4">
      <FlexRow className="w-full items-center justify-between">
        <BreadCrumb onBackClick={() => navigate(-1)} heading="Leaderboard" />
        <div className="flex flex-row items-center gap-2 lg:justify-between">
          <div className="hidden lg:flex">
            <Searchbar
              placeholder="Search By Name"
              value={searchValue}
              onChange={e => {
                setSearchValue(e.target.value);
              }}
              className={`max-w-[12rem]`}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="group flex items-center justify-center rounded-lg bg-primary-600 px-2 py-[0.35rem] text-md text-white lg:text-base">
                <p className="hidden md:block">Filters</p>
                <ChevronRight className="hidden h-4 w-4 transition-all duration-100 ease-in-out group-hover:translate-x-2 md:block" />
                <Funnel className="h-4 w-4 md:hidden" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="end">
              <div className="flex flex-col justify-end gap-2 px-4 lg:flex-row lg:gap-4">
                <div className="lg:hidden">
                  <Searchbar
                    placeholder="Search By Name"
                    value={searchValue}
                    onChange={e => {
                      setSearchValue(e.target.value);
                    }}
                    className={`max-w-[12rem]`}
                  />
                </div>
                <FlexColumn className="w-full items-start gap-1">
                  <p className="text-sm font-semibold text-matt-100">
                    Select Stream
                  </p>
                  <DropDown
                    options={streamsList}
                    isLoading={streamsListIsLoading}
                    placeholder="Select Stream"
                    value={streamId}
                    onChange={val => {
                      if (!val) return;
                      setStreamId(val);
                    }}
                    className="max-lg:w-full lg:min-w-[10rem]"
                  />
                </FlexColumn>
                <FlexColumn className="items-start gap-1">
                  <p className="text-sm font-semibold text-matt-100">
                    Select Test
                  </p>
                  <DropDown
                    options={testsList}
                    isLoading={testsListIsLoading}
                    placeholder="Select Test"
                    value={mockTestId}
                    onChange={val => {
                      if (!val) return;
                      setMockTestId(val);
                    }}
                    className="max-lg:w-full lg:min-w-[10rem]"
                  />
                </FlexColumn>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </FlexRow>
      <div className="grid overflow-hidden">
        <div className="select-none pt-3">
          {leaderBoardIsLoading ? (
            <FlexColumn className="gap-2">
              <FlexRow className="items-end justify-center">
                <Skeleton className="h-[6rem] w-[6rem] rounded-full" />
                <Skeleton className="h-[8rem] w-[8rem] rounded-full" />
                <Skeleton className="h-[6rem] w-[6rem] rounded-full" />
              </FlexRow>
              <FlexColumn className="gap-2">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} className="h-16 w-full" />
                ))}
              </FlexColumn>
            </FlexColumn>
          ) : isEmpty(leaderboardData) ? (
            <div className="flex h-[calc(100vh-25rem)] items-center justify-center">
              <NoDataComponent variant={searchValue ? 'search' : 'empty'} />
            </div>
          ) : (
            <FlexColumn className="w-full gap-4">
              <FlexColumn className="no-scrollbar h-[calc(100dvh-9rem)] w-full gap-2 overflow-y-auto md:h-[calc(100vh-11rem)]">
                {leaderboardData?.map(leaderboard => {
                  return (
                    <ScoreRow {...leaderboard} key={leaderboard.user_id} />
                  );
                })}
              </FlexColumn>
            </FlexColumn>
          )}
        </div>
        {/* <Filters /> */}
      </div>
    </BindContentContainer>
  );
};

export default Leaderboard;
