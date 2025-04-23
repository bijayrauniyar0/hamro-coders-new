import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { FlexRow } from '@Components/common/Layouts';
import { statsData } from '@Constants/MyStats';
import { IFilters } from '@Constants/Types/myStats';
import { getUserStats } from '@Services/userStats';

import { MyStatsSkeleton } from '../MyStatsSkeleton';

import StatsCard from './StatsCard';

const Stats = ({ modeFilter, timePeriodFilter }: IFilters) => {
  const { data: userStats, isLoading: userStatsIsLoading } = useQuery({
    queryKey: ['userStats', modeFilter, timePeriodFilter],
    queryFn: () =>
      getUserStats({ mode: modeFilter, time_period: timePeriodFilter }),
    select: ({ data }) => data,
    enabled: !!modeFilter && !!timePeriodFilter,
  });
  return (
    <FlexRow className="flex-wrap justify-between gap-4">
      {userStatsIsLoading ? (
        <MyStatsSkeleton />
      ) : (
        statsData.map(({ value_key, ...stat }) => (
          <StatsCard
            {...stat}
            key={stat.title}
            value={userStats?.[value_key] || 'N/A'}
          />
        ))
      )}
    </FlexRow>
  );
};

export default Stats;
