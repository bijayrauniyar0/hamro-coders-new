import React, { useState } from 'react';

import BindContentContainer from '@Components/common/BindContentContainer';
import DropDown from '@Components/common/DropDown';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import { timePeriodDropDownOptions } from '@Constants/MyStats';
import { IPerformanceTrendProps } from '@Constants/Types/myStats';

import PerformanceDetails from './PerformanceDetails';
import PerformanceTrend from './PerformanceTrend';
import RecentSessions from './RecentSessions';
import Stats from './Stats';

const MyStats = () => {
  const [timePeriodFilter, setTimePeriodFilter] =
    useState<IPerformanceTrendProps['time_period']>('last_7_days');

  return (
    <>
      <div className="h-full w-full overflow-y-auto md:h-[calc(100vh-4rem)]">
        <BindContentContainer>
          <FlexColumn className="gap-4 md:gap-8">
            <FlexRow className="flex-wrap items-center justify-between gap-2 md:gap-4">
              <div>
                <p className="text-primary-600text-md font-semibold md:text-base lg:text-lg">
                  Your Performance History
                </p>
                <p className="text-xs font-medium md:text-md">
                  Track your progress and analyze your performance trends over
                  time
                </p>
              </div>

              <FlexRow className="items-center justify-between max-sm:w-full md:gap-2">
                <p className="text-sm font-medium text-gray-600 md:text-md">
                  Time Period
                </p>
                <DropDown
                  options={timePeriodDropDownOptions}
                  value={timePeriodFilter}
                  onChange={timePeriod => {
                    if (!timePeriod) return;
                    setTimePeriodFilter(timePeriod);
                  }}
                  choose="value"
                  className="w-[9rem]"
                  enableSearchbar={false}
                />
              </FlexRow>
            </FlexRow>

            <Stats timePeriodFilter={timePeriodFilter} />
            <PerformanceTrend />
            <RecentSessions />
            <PerformanceDetails timePeriodFilter={timePeriodFilter} />
          </FlexColumn>
        </BindContentContainer>
      </div>
    </>
  );
};

export default MyStats;
