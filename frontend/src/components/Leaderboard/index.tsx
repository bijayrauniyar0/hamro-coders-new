import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import BindContentContainer from '@Components/common/BindContentContainer';
import BreadCrumb from '@Components/common/FormComponent/BreadCrumb';
import Icon from '@Components/common/Icon';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import NoDataAvailable from '@Components/common/NoDataAvailable';
import { Button } from '@Components/radix/Button';
import Skeleton from '@Components/radix/Skeleton';
import isEmpty from '@Utils/isEmpty';
import { setIsFiltersOpen } from '@Store/actions/leaderboard';
import { useTypedDispatch, useTypedSelector } from '@Store/hooks';
import { getLeaderboard } from '@Services/leaderboard';

import Filters from './Filters';
import LeaderBox from './LeaderBox';
import ScoreRow from './ScoreRow';

type UserRank = {
  user_id: number;
  name: string;
  total_score: number;
  rank: number;
  previous_rank: number;
};

const Leaderboard = () => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();

  const { course_id, subject_id, filter_by } = useTypedSelector(
    state => state.leaderboardSlice.filters,
  );
  const isFiltersOpen = useTypedSelector(
    state => state.leaderboardSlice.isFiltersOpen,
  );
  const { data: leaderboardData, isLoading: leaderBoardIsLoading } = useQuery({
    queryKey: ['leaderboard', course_id, subject_id, filter_by],
    queryFn: () =>
      getLeaderboard({
        filter_by,
        course_id,
        subject_id: subject_id.join(','),
      }),
    select: ({ data }) => data as UserRank[],
  });

  const findRankDetails = (rank: number) => {
    const rankDetails = leaderboardData?.find(
      ({ rank: r }) => r === rank,
    ) as UserRank;
    if (!rankDetails) return {};
    return {
      name: rankDetails.name,
      total_score: rankDetails.total_score,
      previous_rank: rankDetails.previous_rank,
    };
  };

  return (
    <BindContentContainer className="relative flex flex-col gap-4">
      <FlexRow className="items-center justify-between">
        <BreadCrumb onBackClick={() => navigate(-1)} heading="Leaderboard" />
        <Button
          className="flex w-fit py-1 text-sm font-medium sm:text-md md:hidden"
          onClick={() => dispatch(setIsFiltersOpen(!isFiltersOpen))}
          size="sm"
        >
          <Icon
            name={isFiltersOpen ? 'chevron_left' : 'chevron_right'}
            className="!text-lg sm:!text-xl"
          />
          {isFiltersOpen ? 'Hide' : 'Show'} Filters
        </Button>
      </FlexRow>
      <div className="grid overflow-hidden md:grid-cols-[1fr_22rem]">
        <div className="select-none px-4 pt-3">
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
              <NoDataAvailable />
            </div>
          ) : (
            <FlexColumn className="w-full gap-4">
              <FlexRow className="w-full items-end justify-center gap-4">
                <LeaderBox
                  rank={2}
                  name={findRankDetails(2)?.name}
                  score={findRankDetails(2)?.total_score || 0}
                  previous_rank={findRankDetails(2)?.previous_rank || 0}
                  imageClassName="w-12 h-12 md:w-20 md:h-20"
                  outlineColor="outline-blue-400"
                  rankClassName="bg-blue-400"
                />
                <div className="pb-4">
                  <LeaderBox
                    rank={1}
                    name={findRankDetails(1).name}
                    score={findRankDetails(1)?.total_score || 0}
                    previous_rank={findRankDetails(1)?.previous_rank || 0}
                    imageClassName="w-16 h-16 md:w-24 md:h-24"
                    outlineColor="outline-primary-400"
                    rankClassName="bg-primary-400"
                  />
                </div>
                <LeaderBox
                  rank={3}
                  name={findRankDetails(3).name}
                  score={findRankDetails(3)?.total_score || 0}
                  previous_rank={findRankDetails(3)?.previous_rank || 0}
                  imageClassName="w-12 h-12 md:w-20 md:h-20"
                  outlineColor="outline-green-400"
                  rankClassName="bg-green-400"
                />
              </FlexRow>
              <FlexColumn className="scrollbar h-[calc(100dvh-23.5rem)] w-full gap-2 overflow-y-auto md:max-h-[calc(100vh-22.5rem)]">
                {leaderboardData?.map(
                  ({ rank, name, total_score, previous_rank }) => {
                    if (rank <= 3) return null;
                    return (
                      <ScoreRow
                        key={rank}
                        rank={rank}
                        name={name}
                        score={total_score}
                        image=""
                        previous_rank={previous_rank}
                      />
                    );
                  },
                )}
              </FlexColumn>
            </FlexColumn>
          )}
        </div>
        <Filters />
      </div>
    </BindContentContainer>
  );
};

export default Leaderboard;
