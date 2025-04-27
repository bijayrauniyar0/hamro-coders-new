import React from 'react';

import Skeleton from '@Components/radix/Skeleton';

export const MyStatsSkeleton = () => {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className="h-[5rem] rounded-lg" />
      ))}
    </>
  );
};

export const PerformanceTrendSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} className="h-[15.5rem] w-full rounded-lg" />
      ))}
    </>
  );
};

export const RecentSessionsSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} className="h-[12rem] w-full rounded-lg" />
      ))}
    </div>
  );
};
