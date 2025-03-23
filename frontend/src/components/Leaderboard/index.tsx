import React, { useState } from 'react';
import LeaderBox from './LeaderBox';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import ScoreRow from './ScoreRow';
import { useQuery } from '@tanstack/react-query';
import { getLeaderboard } from '@Services/leaderboard';
import Skeleton from '@Components/radix/Skeleton';
import { rearrangeByRank } from '@Utils/index';
import BreadCrumb from '@Components/common/FormComponent/BreadCrumb';
import BindContentContainer from '@Components/common/BindContentContainer';
import HeaderSwitchTab from '@Components/common/HeaderSwitchTab';
import { useNavigate } from 'react-router-dom';
import { filterOptions } from '@Constants/Leaderboard';

type UserRank = {
  user_id: number;
  name: string;
  total_score: number;
  rank: number;
  previous_rank: number;
};

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('daily');
  const navigate = useNavigate();
  const { data: leaderboardData, isLoading: leaderBoardIsLoading } = useQuery({
    queryKey: ['leaderboard', activeTab],
    queryFn: () => getLeaderboard({ filter_by: activeTab }),
    select: ({ data }) => data as UserRank[],
  });

  return (
    <BindContentContainer className="pt-7">
      <BreadCrumb onBackClick={() => navigate(-1)} heading="Leaderboard" />
      <div className="mt-4 flex items-center justify-center">
        <HeaderSwitchTab
          headerOptions={filterOptions}
          activeTab={activeTab}
          onChange={(val: any) => setActiveTab(val)}
          className="rounded-lg bg-gray-50 px-4 py-2 shadow-sm"
        />
      </div>
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
    </BindContentContainer>
  );
};

export default Leaderboard;
