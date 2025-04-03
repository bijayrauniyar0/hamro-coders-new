import LeaderBox from './LeaderBox';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import ScoreRow from './ScoreRow';
import { useQuery } from '@tanstack/react-query';
import { getLeaderboard } from '@Services/leaderboard';
import Skeleton from '@Components/radix/Skeleton';
import { rearrangeByRank } from '@Utils/index';
import BreadCrumb from '@Components/common/FormComponent/BreadCrumb';
import BindContentContainer from '@Components/common/BindContentContainer';
import { useNavigate } from 'react-router-dom';
import Filters from './Filters';
import { useTypedDispatch, useTypedSelector } from '@Store/hooks';
import { Button } from '@Components/radix/Button';
import Icon from '@Components/common/Icon';
import { setIsFiltersOpen } from '@Store/actions/leaderboard';

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
    queryFn: () => getLeaderboard({ filter_by, course_id, subject_id }),
    select: ({ data }) => data as UserRank[],
  });

  return (
    <BindContentContainer className="relative flex flex-col gap-4 pt-7">
      <FlexRow className="items-center justify-between">
        <BreadCrumb onBackClick={() => navigate(-1)} heading="Leaderboard" />
        <Button
          className="flex text-md font-medium md:hidden w-[10rem]"
          onClick={() => dispatch(setIsFiltersOpen(!isFiltersOpen))}
        >
          <Icon name={isFiltersOpen ? 'chevron_left' : 'chevron_right'} />
          {isFiltersOpen ? 'Hide' : 'Show'} Filters
        </Button>
      </FlexRow>
      <div className="grid md:grid-cols-[1fr_22rem]">
        <div className="select-none px-4 pt-3">
          {leaderBoardIsLoading ? (
            <FlexColumn className="gap-2">
              <FlexRow className="items-end justify-center">
                <Skeleton className="h-[8rem] w-[8rem]" />
                <Skeleton className="h-[12rem] w-[10rem]" />
                <Skeleton className="h-[8rem] w-[8rem]" />
              </FlexRow>
              <FlexColumn className="gap-2">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} className="h-16 w-full" />
                ))}
              </FlexColumn>
            </FlexColumn>
          ) : (
            <FlexRow className="relative mx-auto items-end md:max-w-[25rem]">
              {rearrangeByRank(leaderboardData as any[])?.map(
                (leaderboard: any) => (
                  <div
                    key={leaderboard?.rank}
                    className={`w-full ${leaderboard.rank === 1 ? 'pb-8' : ''}`}
                  >
                    <LeaderBox
                      rank={leaderboard?.rank}
                      name={leaderboard?.name}
                      score={leaderboard?.total_score}
                    />
                  </div>
                ),
              )}
            </FlexRow>
          )}
          <FlexColumn className="mx-auto mt-[7rem] gap-2 md:mt-[5rem]">
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
        </div>
        <Filters />
      </div>
    </BindContentContainer>
  );
};

export default Leaderboard;
