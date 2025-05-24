import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';
import { ContentType } from 'recharts/types/component/Tooltip';

export type StatsCardProps = {
  title: string;
  value: number | string;
  icon: string;
  tooltipMessage?: string;
};

export interface SessionsBoxProps {
  title: string;
  score: number;
  // accuracy: string;
  elapsed_time: number;
  created_at: string;
  subject: string;
}

export interface PerformanceDetailsProps
  extends Omit<SessionsBoxProps, 'title'> {
  rank_change: number | string;
}

export interface IPerformanceTrendProps {
  time_period: 'all_time' | 'last_30_days' | 'last_7_days';
}

export interface IFilters {
  timePeriodFilter: string;
}

export interface IChartProps {
  chartData: Record<string, any>[];
  dataKey: string;
  fill: string;
  tooltip: ContentType<ValueType, NameType>;
}
