export type StatsCardProps = {
  title: string;
  value: number | string;
  icon: string;
};

export interface SessionsBoxProps {
  title: string;
  score: number;
  accuracy: string;
  time_elapsed: number;
  mode: string;
  date_time: string;
}

export interface PerformanceDetailsProps
  extends Omit<SessionsBoxProps, 'title'> {
  rank_change: number | string;
}
