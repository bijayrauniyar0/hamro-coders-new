/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useQuery } from '@tanstack/react-query';
import { Hash, LineChart, TrendingUp } from 'lucide-react';
import { BarChart as BarChartIcon, Target, Timer, Trophy } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

import { DatePickerWithRange } from '@Components/common/DateRangePicker';
import { FlexColumn, FlexRow, Grid } from '@Components/common/Layouts';
import NoDataAvailable from '@Components/common/NoDataAvailable';
import { Card, CardHeader, CardTitle } from '@Components/radix/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from '@Components/radix/chart';
import { chartConfig } from '@Constants/MyStats';
import useScreenWidth from '@Hooks/useScreenWidth';
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

const chartsTypeData = [
  {
    type: 'bar',
    icon: <BarChartIcon />,
  },
  {
    type: 'line',
    icon: <LineChart />,
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

const chartKeysData = [
  // {
  //   label: 'Total Score',
  //   value: 'total_score',
  //   color: '#1e3a8a', // Dark Blue
  // },
  {
    label: 'Avg Score',
    value: 'avg_score',
    color: '#3b82f6', // Medium Blue
  },
  {
    label: 'Avg Elapsed Time (in Minutes)',
    value: 'avg_elapsed_time',
    color: '#1e3a8a', // Dark Blue
  },
  // {
  //   label: 'Avg Accuracy (in %)',
  //   value: 'avg_accuracy',
  //   color: '#3b82f6', // Medium Blue
  // },
  // {
  //   label: 'Avg Count',
  //   value: 'avg_count',
  //   color: '#1e3a8a', // Dark Blue
  // },
];

export default function PerformanceTrend() {
  const screenWidth = useScreenWidth();
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

  const [filterDateRange, setFilterDateRange] = useState<DateRange | undefined>(
    {
      from: new Date(new Date().setDate(new Date().getDate() - 15)),
      to: new Date(),
    },
  );

  const { data: chartData, isLoading: chartDataIsLoading } = useQuery({
    queryKey: ['performanceTrend', filterDateRange],
    queryFn: () => {
      if (!filterDateRange?.from || !filterDateRange?.to) return;
      return getPerformanceTrend({
        start_date: filterDateRange?.from || new Date(),
        end_date: filterDateRange?.to || new Date(),
      });
    },
    select: res => {
      return res?.data;
    },
  });

  // const chartComponents: { [key: string]: React.ReactNode } = {
  //   'bar': <PerformanceTrendBarChart dataKey=''/>
  // };
  // const filterByOptions = [
  //   {
  //     label: 'Last 3 Months',
  //     value: 'last_3_months',
  //   },
  //   {
  //     label: 'Last 3 Weeks',
  //     value: 'last_3_weeks',
  //   },
  //   {
  //     label: 'Last 3 days',
  //     value: 'last_3_days',
  //   },
  // ];
  // const layout = [
  //   { i: 'chart1', x: 0, y: 0, w: 4, h: 2 },
  //   { i: 'chart2', x: 4, y: 0, w: 4, h: 2 },
  // ];
  return (
    <FlexColumn className="gap-4">
      <FlexRow className="items-center justify-between max-md:gap-2">
        <p className="text-base font-medium leading-4 tracking-tight text-matt-100 md:text-lg">
          Performance Trend
        </p>
        <DatePickerWithRange
          date={filterDateRange}
          handleDate={val => {
            setFilterDateRange(val);
          }}
          placeHolderClassName="max-md:hidden"
        />
        {/* <SwitchTab
          options={filterByOptions}
          activeValue={filterBy}
          onChange={setFilterBy}
        /> */}
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
                <ResponsiveContainer className="!h-[300px]">
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
                </ResponsiveContainer>
              </Card>
            ))
          )}
        </Grid>
      )}
    </FlexColumn>
  );
}
