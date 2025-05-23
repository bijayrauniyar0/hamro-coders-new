import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { Grid } from '@Components/common/Layouts';
import { statsData } from '@Constants/MyStats';
import { IFilters } from '@Constants/Types/myStats';
import { getUserStats } from '@Services/userStats';

import { MyStatsSkeleton } from '../MyStatsSkeleton';

import StatsCard from './StatsCard';

const Stats = ({ timePeriodFilter }: IFilters) => {
  const { data: userStats, isLoading: userStatsIsLoading } = useQuery({
    queryKey: ['userStats', timePeriodFilter],
    queryFn: () =>
      getUserStats({ time_period: timePeriodFilter }),
    select: ({ data }) => data,
    enabled: !!timePeriodFilter,
  });
  return (
    <Grid className="w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
    </Grid>
  );
};

export default Stats;
