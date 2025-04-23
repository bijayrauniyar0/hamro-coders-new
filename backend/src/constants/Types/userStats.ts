import { ParsedQs } from 'qs';
import { ScoreFilter } from './leaderboard';
import UserScores from '@Models/userScoresModels';
import { InferAttributes } from 'sequelize';
import { SequelizeAttributes } from '.';

export type UserScoresArgsType = {
  startDate: ScoreFilter['startDate'];
  mode: 'ranked' | 'practice' | 'all';
  otherFilterOptions?: Partial<SequelizeAttributes>;
};

export interface IGetUserStatsParamType extends ParsedQs {
  mode: UserScoresArgsType['mode'];
  time_period: 'last_1_month' | 'last_7_days' | 'all_time';
  sort_by?: keyof IPerformanceDetails;
  sort_order?: 'asc' | 'desc';
}

export type UserScoresType = InferAttributes<UserScores>;

export interface IPerformanceDetails
  extends Omit<UserScoresType, 'elapsed_time'> {
  rank_change: number | string;
  elapsed_time: string;
  accuracy: string;
}

export interface IRecentSessions
  extends Omit<IPerformanceDetails, 'rank_change' | 'created_at'> {
  date: Date;
}
