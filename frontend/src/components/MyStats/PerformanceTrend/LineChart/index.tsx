import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

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
    <ChartContainer config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{ top: 15, right: 50, bottom: 10, left: -5 }}
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
          allowDecimals={false}
        />
        <ChartTooltip cursor={false} content={tooltip} />
        <Line
          dataKey={dataKey}
          stroke={fill}
          radius={4}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
};

export default PerformanceTrendLineChart;
