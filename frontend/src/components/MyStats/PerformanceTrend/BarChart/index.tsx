import React, { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { ChartContainer, ChartTooltip } from '@Components/radix/chart';
import { chartConfig } from '@Constants/MyStats';
import { IChartProps } from '@Constants/Types/myStats';
import useScreenWidth from '@Hooks/useScreenWidth';

const PerformanceTrendBarChart = ({
  chartData,
  dataKey,
  fill,
  tooltip,
}: IChartProps) => {
  const screenWidth = useScreenWidth();
  const barSize = useMemo(() => {
    let barWidth = 56;
    switch (true) {
      case screenWidth < 576:
        barWidth = 28;
        break;
      case screenWidth < 768:
        barWidth = 32;
        break;
      case screenWidth < 992:
        barWidth = 36;
        break;
      default:
        barWidth = 56;
    }
    return barWidth;
  }, [screenWidth]);
  return (
    <ChartContainer config={chartConfig}>
      <BarChart
        accessibilityLayer
        data={chartData}
        margin={{ top: 15, right: 10, bottom: 10, left: -18 }}
        className="z-50 h-[45rem] w-[45rem]"
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="label"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis
        // domain={[() => 0, (dataMax: number) => (dataMax * 1.25).toFixed(0)]}
        />
        <ChartTooltip cursor={false} content={tooltip} />
        <Bar dataKey={dataKey} fill={fill} radius={4} barSize={barSize} />
      </BarChart>
    </ChartContainer>
  );
};

export default PerformanceTrendBarChart;
