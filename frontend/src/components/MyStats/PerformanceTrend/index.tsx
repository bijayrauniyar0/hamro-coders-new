/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BarChartIcon, LineChart, Timer } from 'lucide-react';

import { FlexColumn, FlexRow, Grid } from '@Components/common/Layouts';
import NoDataAvailable from '@Components/common/NoDataAvailable';
import SwitchTab from '@Components/common/SwitchTab';
import { Card, CardHeader, CardTitle } from '@Components/radix/card';
import useAnalyticsStore from '@Store/analytics';
import { chartKeysData, filterByOptions } from '@Constants/MyStats';
import { getPerformanceTrend } from '@Services/userStats';

import { PerformanceTrendSkeleton } from '../MyStatsSkeleton';

import PerformanceTrendBarChart from './BarChart';
import PerformanceTrendLineChart from './LineChart';

export const chartTooltipMeta: Record<
  string,
  { title: string; icon: (color: string) => JSX.Element }
> = {
  avg_score: {
    title: 'Avg Score',
    icon: color => (
      <BarChartIcon
        color={color}
        className="flex h-4 w-4 items-center md:h-5 md:w-5"
      />
    ),
  },
  avg_elapsed_time: {
    title: 'Avg Elapsed Time',
    icon: color => (
      <Timer
        color={color}
        className="flex h-4 w-4 items-center md:h-5 md:w-5"
      />
    ),
  },
};

export const chartsTypeData = [
  {
    type: 'bar',
    icon: <BarChartIcon className="h-5 w-5 md:h-6 md:w-6" />,
  },
  {
    type: 'line',
    icon: <LineChart className="h-5 w-5 md:h-6 md:w-6" />,
  },
];

const ChartTooltipContent = ({
  active,
  payload,
  label,
  className,
}: Record<string, any>) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className={`rounded p-2 shadow-md ${className} bg-white`}>
      <p className="text-xs font-bold md:text-sm">{label}</p>
      {payload.map((item: any, index: any) => {
        return (
          <FlexRow key={index} className="items-center gap-2">
            {chartTooltipMeta?.[item.name]?.icon(item.color)}
            <span className="text-sm">
              {chartTooltipMeta?.[item.name].title}: {item.value}
            </span>
          </FlexRow>
        );
      })}
    </div>
  );
};

export default function PerformanceTrend() {
  const [selectedChartType, setSelectedChartType] = useState<
    Record<string, string>
  >(
    chartKeysData.reduce(
      (acc, item) => {
        acc[item.value] = 'bar';
        return acc;
      },
      {} as Record<string, string>,
    ),
  );

  const [filterBy, setFilterBy] = useState<string>('last_3_weeks');

  const mockTestId = useAnalyticsStore(state => state.mockTestId);

  const { data: chartData, isLoading: chartDataIsLoading } = useQuery({
    queryKey: ['performanceTrend', filterBy],
    queryFn: () => {
      return getPerformanceTrend({
        filter_by: filterBy,
        mock_test_id: mockTestId,
      });
    },
    select: res => {
      return res?.data;
    },
    enabled: !!mockTestId,
  });

  return (
    <FlexColumn className="gap-2 md:gap-4">
      <FlexRow className="items-center justify-between max-md:gap-2">
        <p className="text-md font-medium leading-4 tracking-tight text-matt-100 md:text-md lg:text-base">
          Performance Trend
        </p>
        <SwitchTab
          options={filterByOptions}
          onChange={val => setFilterBy(val)}
          activeValue={filterBy}
        />
      </FlexRow>
      {!chartData ? (
        <NoDataAvailable />
      ) : (
        <Grid className="w-full grid-cols-1 gap-4 md:grid-cols-2">
          {chartDataIsLoading ? (
            <PerformanceTrendSkeleton />
          ) : (
            chartKeysData.map(option => (
              <Card key={option.value} className="w-full !p-0">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between !text-md tracking-normal">
                    {option.label}
                    <FlexRow className="gap-2">
                      {chartsTypeData.map(chart => (
                        <button
                          key={chart.type}
                          onClick={() => {
                            setSelectedChartType(prevData => {
                              return {
                                ...prevData,
                                [option.value]: chart.type,
                              };
                            });
                          }}
                          className={`rounded-lg border border-gray-200 p-1 shadow-sm ${selectedChartType?.[option.value] === chart.type ? 'bg-primary-500 text-white' : 'bg-white'}`}
                        >
                          {chart.icon}
                        </button>
                      ))}
                    </FlexRow>
                  </CardTitle>
                </CardHeader>
                {/* <ChartContainer config={chartConfig}> */}
                {selectedChartType[option.value] === 'line' ? (
                  <PerformanceTrendLineChart
                    dataKey={option.value}
                    chartData={chartData}
                    fill={option.color}
                    tooltip={ChartTooltipContent}
                  />
                ) : (
                  <PerformanceTrendBarChart
                    dataKey={option.value}
                    chartData={chartData}
                    fill={option.color}
                    tooltip={ChartTooltipContent}
                  />
                )}
                {/* <PerformanceTrendBarChart
                    dataKey={option.value}
                    chartData={chartData}
                    fill={option.color}
                  /> */}
                {/* <BarChart
                      accessibilityLayer
                      data={chartData}
                      margin={{ top: 15, right: 10, bottom: 10, left: -18 }}
                    >
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="label"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                      />
                      <YAxis domain={[0, 'dataMax + 2']} />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent />}
                      />
                      <Bar
                        dataKey={option.value}
                        fill={option.color}
                        radius={4}
                        barSize={barSize}
                      />
                    </BarChart> */}
                {/* </ChartContainer> */}
              </Card>
            ))
          )}
        </Grid>
      )}
    </FlexColumn>
  );
}
