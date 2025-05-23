import React, { useState } from 'react';

import BindContentContainer from '@Components/common/BindContentContainer';
import DropDown from '@Components/common/DropDown';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import {
  timePeriodDropDownOptions,
} from '@Constants/MyStats';
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
      <div className="h-[calc(100vh-4rem)] w-full overflow-y-auto">
        <BindContentContainer>
          <FlexColumn className="gap-8">
            <FlexRow className="flex-wrap items-center justify-between gap-8 md:gap-4">
              <div>
                <p className="text-lg font-semibold text-primary-700 md:text-2xl">
                  Your Performance History
                </p>
                <p className="text-sm font-medium md:text-md">
                  Track your progress and analyze your performance trends over
                  time
                </p>
              </div>
              <div className="flex w-full flex-row items-center justify-between md:w-fit md:gap-4">
                <div className="flex flex-col items-start gap-1 md:flex-row md:items-center md:gap-2">
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
                </div>
              </div>
            </FlexRow>

            <Stats
              timePeriodFilter={timePeriodFilter}
            />
            <PerformanceTrend />
            <RecentSessions />
            <PerformanceDetails
              timePeriodFilter={timePeriodFilter}
            />
          </FlexColumn>
        </BindContentContainer>
      </div>
    </>
  );
};

export default MyStats;
