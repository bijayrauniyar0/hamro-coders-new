import React from 'react';

import { Grid } from '@Components/common/Layouts';
import Skeleton from '@Components/radix/Skeleton';

export const MyStatsSkeleton = () => {
  return (
    <Grid className="w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className="h-[5rem] rounded-lg" />
      ))}
    </Grid>
  );
};

export const PerformanceTrendSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} className="h-[15.5rem] rounded-lg w-full" />
      ))}
    </>
  );
};

export const RecentSessionsSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} className="h-[12rem] rounded-lg w-full" />
      ))}
    </div>
  );
};
