/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Hash, TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import DropDown from '@Components/common/DropDown';
import { FlexRow, Grid } from '@Components/common/Layouts';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@Components/radix/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from '@Components/radix/chart';
import { getPerformanceTrend } from '@Services/userStats';

const chartConfig = {
  currentData: {
    label: 'Total Score',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

import { BarChart as BarChartIcon, Target, Timer, Trophy } from 'lucide-react';

import NoDataAvailable from '@Components/common/NoDataAvailable';
import Skeleton from '@Components/radix/Skeleton';

import { PerformanceTrendSkeleton } from '../MyStatsSkeleton';

export const chartTooltipMeta: Record<
  string,
  { title: string; icon: (color: string) => JSX.Element }
> = {
  total_score: {
    title: 'Total Score',
    icon: color => (
      <Trophy
        color={color}
        className="flex h-4 w-4 items-center md:h-5 md:w-5"
      />
    ),
  },
  avg_score: {
    title: 'Avg Score',
    icon: color => (
      <BarChartIcon
        color={color}
        className="flex h-4 w-4 items-center md:h-5 md:w-5"
      />
    ),
  },
  avg_accuracy: {
    title: 'Avg Accuracy (in %)',
    icon: color => (
      <Target
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
  avg_count: {
    title: 'Avg Count',
    icon: color => (
      <Hash color={color} className="flex h-4 w-4 items-center md:h-5 md:w-5" />
    ),
  },
};

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
  const [filterBy, setFilterBy] = useState('last_3_months');

  const { data: chartData, isLoading: chartDataIsLoading } = useQuery({
    queryKey: ['performanceTrend', filterBy],
    queryFn: () => getPerformanceTrend({ filter_by: filterBy }),
    select: ({ data }) => {
      return data;
    },
  });

  const chartKeysData = [
    {
      label: 'Total Score',
      value: 'total_score',
      color: '#1e3a8a', // Dark Blue
    },
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
    {
      label: 'Avg Accuracy (in %)',
      value: 'avg_accuracy',
      color: '#3b82f6', // Medium Blue
    },
    {
      label: 'Avg Count',
      value: 'avg_count',
      color: '#1e3a8a', // Dark Blue
    },
  ];

  const filterByOptions = [
    {
      label: 'Last 3 Months',
      value: 'last_3_months',
    },
    {
      label: 'Last 3 Weeks',
      value: 'last_3_weeks',
    },
    {
      label: 'Last 3 days',
      value: 'last_3_days',
    },
  ];
  const layout = [
    { i: 'chart1', x: 0, y: 0, w: 4, h: 2 },
    { i: 'chart2', x: 4, y: 0, w: 4, h: 2 },
  ];
  return (
    <Card>
      <CardHeader className="w-full flex-row items-center justify-between !py-1 md:!py-2">
        <CardTitle>Performance Trend</CardTitle>
        <DropDown
          options={filterByOptions}
          value={filterBy}
          onChange={setFilterBy}
          choose="value"
          className="w-[12rem]"
        />
      </CardHeader>
      {!chartData ? (
        <NoDataAvailable />
      ) : (
        <CardContent className="!py-4 px-4 md:px-6">
          <Grid className="w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {chartDataIsLoading ? (
              <PerformanceTrendSkeleton />
            ) : (
              chartKeysData.map(option => (
                <Card key={option.value} className="w-full !p-0">
                  <CardHeader>
                    <CardTitle className="!text-md tracking-normal">
                      {option.label}
                    </CardTitle>
                  </CardHeader>
                  <ChartContainer config={chartConfig}>
                    <BarChart
                      accessibilityLayer
                      data={chartData}
                      margin={{ top: 15, right: 10, bottom: 10, left: 0 }}
                    >
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="label"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                      />
                      <YAxis />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent />}
                      />
                      <Bar
                        dataKey={option.value}
                        fill={option.color}
                        radius={4}
                        barSize={56}
                      />
                    </BarChart>
                  </ChartContainer>
                </Card>
              ))
            )}
          </Grid>
        </CardContent>
      )}
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {chartDataIsLoading ? (
          <Skeleton className="h-[1.5rem] w-full md:w-4/5 lg:w-1/2" />
        ) : (
          <div className="text-muted-foreground leading-none">
            Showing Analytics Data for the{' '}
            {filterByOptions?.find(o => o.value === filterBy)?.label}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
