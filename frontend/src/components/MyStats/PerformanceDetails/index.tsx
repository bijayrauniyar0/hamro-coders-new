import React from 'react';
import { format } from 'date-fns';

import DataTable from '@Components/common/DataTable';
import Icon from '@Components/common/Icon';
import { FlexColumn } from '@Components/common/Layouts';
import StatusChip from '@Components/common/StatusChip';
import { IFilters } from '@Constants/Types/myStats';
import { getPerformanceDetails } from '@Services/userStats';

const performanceTableColumns = [
  {
    header: 'Date',
    accessorKey: 'created_at',
    size: 10,
    cell: ({ row }: any) => {
      const date = new Date(row?.original?.created_at);
      return (
        <p className="text-nowrap">
          {date ? format(date, 'MMMM dd, yyyy') : 'N/A'}
        </p>
      );
    },
  },
  {
    header: 'Mode',
    accessorKey: 'mode',
    sortingFn: undefined,
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

const PerformanceDetails = ({ modeFilter, timePeriodFilter }: IFilters) => {
  return (
    <FlexColumn className="gap-6">
      <p className="text-base font-medium leading-4 tracking-tight text-matt-100 md:text-lg">
        Performance Details
      </p>
      {/* <div className="h-[28rem]"> */}
      <DataTable
        queryFn={getPerformanceDetails}
        queryFnParams={{
          mode: modeFilter,
          time_period: timePeriodFilter,
        }}
        initialState={{
          paginationState: {
            pageIndex: 0,
            pageSize: 15,
          },
        }}
        queryKey="performanceDetails"
        searchInput=""
        columns={performanceTableColumns}
        needSorting={true}
      />
      {/* </div> */}
    </FlexColumn>
  );
};

export default PerformanceDetails;
