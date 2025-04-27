import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

import { ChartContainer, ChartTooltip } from '@Components/radix/chart';
import { chartConfig } from '@Constants/MyStats';
import { IChartProps } from '@Constants/Types/myStats';

const PerformanceTrendLineChart = ({
  chartData,
  dataKey,
  fill,
  tooltip,
}: IChartProps) => {
  return (
    <ResponsiveContainer>
      <ChartContainer config={chartConfig}>
        <LineChart
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
          <YAxis domain={[0, 'dataMax + 2']} />
          <ChartTooltip cursor={false} content={tooltip} />
          <Line dataKey={dataKey} fill={fill} radius={4} />
        </LineChart>
      </ChartContainer>
    </ResponsiveContainer>
  );
};

export default PerformanceTrendLineChart;
