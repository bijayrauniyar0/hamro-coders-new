import React from 'react';
import LeaderBox from './LeaderBox';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import ScoreRow from './ScoreRow';
import { useQuery } from '@tanstack/react-query';
import { getLeaderboard } from '@Services/leaderboard';
import Skeleton from '@Components/radix/Skeleton';
import { rearrangeByRank } from '@Utils/index';

type UserRank = {
  user_id: number;
  name: string;
  totalScore: number;
  rank: number;
  previous_rank: number;
};

const Leaderboard = () => {
  const { data: leaderboardData, isLoading: leaderBoardIsLoading } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: () => getLeaderboard({ filter_by: 'daily' }),
    select: ({ data }) => data as UserRank[],
  });
  return (
    <div className="select-none px-4 pt-3">
      {leaderBoardIsLoading ? (
        <FlexColumn>
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-20 w-full" />
          ))}
        </FlexColumn>
      ) : (
        <FlexRow className="relative mx-auto items-end md:max-w-[25rem]">
          {rearrangeByRank(leaderboardData as any[])?.map(
            ({ rank, name, totalScore }) => (
              <div key={rank} className={`w-full ${rank === 1 ? 'pb-8' : ''}`}>
                <LeaderBox rank={rank} name={name} score={totalScore} />
              </div>
            ),
          )}
        </FlexRow>
      )}
      <FlexColumn className="mx-auto mt-[5rem] max-w-[55rem] gap-2">
        {leaderboardData?.map(({ rank, name, totalScore, previous_rank }) => {
          if (rank <= 3) return null;
          return (
            <ScoreRow
              key={rank}
              rank={rank}
              name={name}
              score={totalScore}
              image=""
              previous_rank={previous_rank}
            />
          );
        })}
      </FlexColumn>
    </div>
  );
};

export default Leaderboard;
