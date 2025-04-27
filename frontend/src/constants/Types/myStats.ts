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
  mode: string;
  created_at: string;
}

export interface PerformanceDetailsProps
  extends Omit<SessionsBoxProps, 'title'> {
  rank_change: number | string;
}

export interface IPerformanceTrendProps {
  time_period: 'all_time' | 'last_30_days' | 'last_7_days';
}

export interface IFilters {
  modeFilter: string;
  timePeriodFilter: string;
}
