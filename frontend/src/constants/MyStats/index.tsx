import { SessionsBoxProps, StatsCardProps } from '@Constants/Types/myStats';

export const modeDropDownOptions = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Ranked',
    value: 'Ranked',
  },
  {
    label: 'Practice',
    value: 'practice',
  },
];
export const timePeriodDropDownOptions = [
  {
    label: 'Last 7 Days',
    value: 'last_7_days',
  },
  {
    label: 'Last 30 Days',
    value: 'last_30_days',
  },
  {
    label: 'All Time',
    value: 'all_time',
  },
];

export const statsData: StatsCardProps[] = [
  {
    title: 'Average Accuracy',
    value: '85%',
    icon: 'task_alt',
  },
  {
    title: 'Active Score',
    value: 8,
    icon: 'workspace_premium',
  },
  {
    title: 'Total Sessions',
    value: 45,
    icon: 'event',
  },
  {
    title: 'Current Rank',
    value: 12,
    icon: 'trophy',
  },
];

export const sessionsData: SessionsBoxProps[] = [
  {
    title: 'Speed Typing',
    score: 85,
    accuracy: '94.5%',
    time_elapsed: 120,
    mode: 'Practice',
    date_time: '2025-04-18T14:30:00Z',
  },
  {
    title: 'Code Challenge',
    score: 72,
    accuracy: '88.0%',
    time_elapsed: 180,
    mode: 'Ranked',
    date_time: '2025-04-17T19:15:00Z',
  },
  {
    title: 'Memory Test',
    score: 90,
    accuracy: '97.2%',
    time_elapsed: 150,
    mode: 'Practice',
    date_time: '2025-04-16T11:00:00Z',
  },
  {
    title: 'Reflex Drill',
    score: 64,
    accuracy: '76.3%',
    time_elapsed: 60,
    mode: 'Ranked',
    date_time: '2025-04-15T17:45:00Z',
  },
  {
    title: 'Focus Mode',
    score: 95,
    accuracy: '99.1%',
    time_elapsed: 300,
    mode: 'Practice',
    date_time: '2025-04-14T08:20:00Z',
  },
];

export const tableData = [
  {
    date: 'April 17, 2025',
    mode: 'Ranked',
    score: 850,
    accuracy: '92%',
    time: '15m 32s',
    rank_change: 3,
  },
  {
    date: 'April 18, 2025',
    mode: 'Practice',
    score: 780,
    accuracy: '87%',
    time: '12m 10s',
    rank_change: 1,
  },
  {
    date: 'April 19, 2025',
    mode: 'Ranked',
    score: 910,
    accuracy: '95%',
    time: '17m 5s',
    rank_change: 2,
  },
  {
    date: 'April 20, 2025',
    mode: 'Practice',
    score: 730,
    accuracy: '85%',
    time: '14m 50s',
    rank_change: 0,
  },
  {
    date: 'April 21, 2025',
    mode: 'Ranked',
    score: 800,
    accuracy: '90%',
    time: '16m 45s',
    rank_change: 4,
  },
  {
    date: 'April 22, 2025',
    mode: 'Practice',
    score: 820,
    accuracy: '93%',
    time: '13m 25s',
    rank_change: 2,
  },
];
