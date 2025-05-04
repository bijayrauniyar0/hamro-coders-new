import UserScores from '../../models/userScoresModels';
import { ParsedQs } from 'qs';

export interface LeaderboardQuery extends ParsedQs {
  filter_by: string;
  stream_id?: string;
  mock_test_id?: string;
}
export interface ScoreFilter {
  testIds?: number[];
  startDate: Date | 'all_time';
  endDate?: Date;
}

export interface RankUserByDateProps {
  endDate?: Date;
  testIds: number[];
}

export interface AggregatedScore {
  id: number;
  name: string;
  total_score: number;
}

export interface Rank extends AggregatedScore {
  rank: number;
}

export interface FilterScoresByDateProps {
  startDate: Date;
  endDate: Date;
  scores: UserScores[];
}
