import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { FlexColumn } from '@Components/common/Layouts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@Components/radix/card';
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
    <Card>
      <CardHeader>
        <CardTitle>Recent Sessions</CardTitle>
      </CardHeader>
      <CardContent>
        <FlexColumn className="gap-4">
          {recentSessionsIsLoading ? (
            <RecentSessionsSkeleton />
          ) : (
            recentSessions?.map(({ id, ...session }) => (
              <SessionsBox {...session} key={id} />
            ))
          )}
        </FlexColumn>
      </CardContent>
    </Card>
  );
};

export default RecentSessions;
