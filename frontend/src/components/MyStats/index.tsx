import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { format } from 'date-fns';

import DataTable from '@Components/common/DataTable';
import DropDown from '@Components/common/DropDown';
import Icon from '@Components/common/Icon';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import StatusChip from '@Components/common/StatusChip';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@Components/radix/card';
import {
  modeDropDownOptions,
  statsData,
  timePeriodDropDownOptions,
} from '@Constants/MyStats';
import {
  IPerformanceTrendProps,
  SessionsBoxProps,
} from '@Constants/Types/myStats';
import {
  getPerformanceDetails,
  getRecentSessions,
  getUserStats,
} from '@Services/userStats';

import PerformanceTrend from './PerformanceTrend';
import SessionsBox from './SessionsBox';
import StatsCard from './StatsCard';

const performanceTableColumns = [
  {
    header: 'Date',
    accessorKey: 'created_at',
    cell: ({ row }: any) => {
      const date = new Date(row?.original?.created_at);
      return date ? format(date, 'MMMM dd, yyyy') : 'N/A';
    },
  },
  {
    header: 'Mode',
    accessorKey: 'mode',
    cell: ({ row }: any) => {
      const mode = row?.original?.mode;
      return (
        <StatusChip
          status={mode === 'Ranked' ? 'success' : 'info'}
          label={mode}
        />
      );
    },
  },
  { header: 'Score', accessorKey: 'score' },
  { header: 'Accuracy', accessorKey: 'accuracy' },
  { header: 'Time', accessorKey: 'elapsed_time' },
  {
    header: 'Rank Change',
    accessorKey: 'rank_change',
    cell: ({ row }: any) => {
      const rowData = row?.original;
      const rank_change_color =
        rowData.mode === 'practice' || rowData.rank_change === 0
          ? 'text-gray-600'
          : rowData.rank_change > 0
            ? 'text-green-600'
            : 'text-red-600';
      return (
        <div className="flex w-[2rem] items-center justify-center py-2">
          <p className={`text-sm font-semibold ${rank_change_color}`}>
            {row?.original?.rank_change}
          </p>
          {rowData.mode === 'ranked' && (
            <Icon
              name={
                rowData.rank_change > 0 ? ' arrow_drop_up' : 'arrow_drop_down'
              }
              className={`!text-2xl ${rank_change_color} flex items-center justify-center`}
            />
          )}
        </div>
      );
    },
  },
];

type RecentSessions = SessionsBoxProps & { id: number };

const MyStats = () => {
  const [modeFilter, setSelectedModeFilter] = useState('all');
  const [timePeriodFilter, setSelectedTimePeriodFilter] =
    useState<IPerformanceTrendProps['time_period']>('last_7_days');

  const { data: userStats } = useQuery({
    queryKey: ['userStats', modeFilter, timePeriodFilter],
    queryFn: () =>
      getUserStats({ mode: modeFilter, time_period: timePeriodFilter }),
    select: ({ data }) => data,
    enabled: !!modeFilter && !!timePeriodFilter,
  });

  const { data: recentSessions } = useQuery<
    AxiosResponse<RecentSessions[]>, // Response from queryFn
    Error,
    RecentSessions[]
  >({
    queryKey: ['recent-sessions'],
    queryFn: () => getRecentSessions(),
    select: ({ data }) => data,
  });

  return (
    <FlexColumn className="gap-8">
      <FlexRow className="flex-wrap items-center justify-between gap-8 md:gap-4">
        <div>
          <p className="text-lg font-semibold text-primary-700 md:text-2xl">
            Your Performance History
          </p>
          <p className="text-sm font-medium md:text-md">
            Track your progress and analyze your performance trends over time
          </p>
        </div>
        <div className="flex w-full flex-row items-center justify-between md:w-fit md:gap-4">
          <div className="flex flex-col items-start gap-1 md:flex-row md:items-center md:gap-2">
            <p className="text-sm font-medium text-gray-600 md:text-md">Mode</p>
            <DropDown
              options={modeDropDownOptions}
              value={modeFilter}
              onChange={setSelectedModeFilter}
              choose="value"
              className="w-[9rem] md:w-[7rem]"
              enableSearchbar={false}
            />
          </div>
          <div className="flex flex-col items-start gap-1 md:flex-row md:items-center md:gap-2">
            <p className="text-sm font-medium text-gray-600 md:text-md">
              Time Period
            </p>
            <DropDown
              options={timePeriodDropDownOptions}
              value={timePeriodFilter}
              onChange={setSelectedTimePeriodFilter}
              choose="value"
              className="w-[9rem]"
              enableSearchbar={false}
            />
          </div>
        </div>
      </FlexRow>
      <FlexRow className="flex-wrap justify-between gap-4">
        {statsData.map(({ value_key, ...stat }) => (
          <StatsCard
            {...stat}
            key={stat.title}
            value={userStats?.[value_key] || 'N/A'}
          />
        ))}
      </FlexRow>

      <PerformanceTrend />
      <Card>
        <CardHeader>
          <CardTitle>Recent Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <FlexColumn className="gap-4">
            {recentSessions?.map(({ id, ...session }) => (
              <SessionsBox {...session} key={id} />
            ))}
          </FlexColumn>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            queryFn={getPerformanceDetails}
            queryFnParams={{
              mode: modeFilter,
              time_period: timePeriodFilter,
            }}
            columns={performanceTableColumns}
            isSorting={false}
          />
        </CardContent>
      </Card>
    </FlexColumn>
  );
};

export default MyStats;
