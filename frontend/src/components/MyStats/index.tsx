import React, { useState } from 'react';

import DataTable from '@Components/common/DataTable';
import DropDown from '@Components/common/DropDown';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import StatusChip from '@Components/common/StatusChip';
import {
  modeDropDownOptions,
  sessionsData,
  statsData,
  tableData,
  timePeriodDropDownOptions,
} from '@Constants/MyStats';

import SessionsBox from './SessionsBox';
import StatsCard from './StatsCard';

const MyStats = () => {
  const [modeFilter, setSelectedModeFilter] = useState('all');
  const [timePeriodFilter, setSelectedTimePeriodFilter] =
    useState('last_7_days');

  const performanceTableColumns = [
    { header: 'Date', accessorKey: 'date' },
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
    { header: 'Time', accessorKey: 'time' },
    {
      header: 'Rank Change',
      accessorKey: 'rank_change',
      cell: ({ row }: any) => {
        return (
          <div className="flex w-[2rem] items-center justify-center py-2">
            <p className="text-sm font-semibold text-green-600">
              {' '}
              {row?.original?.rank_change}
            </p>
          </div>
        );
      },
    },
  ];

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
          {/* <div className="h-[2rem] w-[1px] bg-gray-300" /> */}
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
        {statsData.map(stat => (
          <StatsCard {...stat} key={stat.title} />
        ))}
      </FlexRow>
      <FlexColumn className="shadow-statsCard rounded-lg border border-gray-200 bg-white">
        <FlexRow className="border-b border-gray-300 px-4 py-4 md:px-6 md:py-6">
          <p className="text-base font-medium text-matt-100 md:text-lg">
            Recent Sessions
          </p>
        </FlexRow>
        <FlexColumn className="gap-4 px-4 py-4 md:px-6 md:py-8">
          {sessionsData.map(session => (
            <SessionsBox
              {...session}
              key={`${session.date_time}-${session.accuracy}`}
            />
          ))}
        </FlexColumn>
      </FlexColumn>
      <FlexColumn className="shadow-statsCard rounded-lg border border-gray-200 bg-white">
        <FlexRow className="border-b border-gray-300 px-4 py-4 md:px-6 md:py-6">
          <p className="text-base font-medium text-matt-100 md:text-lg">
            Performance Details
          </p>
        </FlexRow>
        <div className="px-4 py-4 md:px-6 md:py-8">
          <DataTable data={tableData} columns={performanceTableColumns} />
        </div>
      </FlexColumn>
    </FlexColumn>
  );
};

export default MyStats;
