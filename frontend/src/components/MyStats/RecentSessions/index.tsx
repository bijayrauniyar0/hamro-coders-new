import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { FlexColumn } from '@Components/common/Layouts';
import { SessionsBoxProps } from '@Constants/Types/myStats';
import { getRecentSessions } from '@Services/userStats';

import { RecentSessionsSkeleton } from '../MyStatsSkeleton';

import SessionsBox from './SessionsBox';

type RecentSessions = SessionsBoxProps & { id: number };

const RecentSessions = () => {
  const { data: recentSessions, isLoading: recentSessionsIsLoading } = useQuery<
    AxiosResponse<RecentSessions[]>, // Response from queryFn
    Error,
    RecentSessions[]
  >({
    queryKey: ['recent-sessions'],
    queryFn: () => getRecentSessions(),
    select: ({ data }) => data,
  });
  return (
    <FlexColumn className="gap-6">
      <p className="text-base font-medium leading-4 tracking-tight text-matt-100 md:text-lg">
        Recent Sessions
      </p>
      <FlexColumn className="bg-white border border-gray-200 shadow-sm rounded-lg">
        {recentSessionsIsLoading ? (
          <RecentSessionsSkeleton />
        ) : (
          recentSessions?.map(({ id, ...session }) => (
            <SessionsBox {...session} key={id} />
          ))
        )}
      </FlexColumn>
    </FlexColumn>
  );
};

export default RecentSessions;
