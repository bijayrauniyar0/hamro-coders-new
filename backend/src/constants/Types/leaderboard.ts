import UserScores from '../../models/userScoresModels';
import { ParsedQs } from 'qs';

export interface LeaderboardQuery extends ParsedQs {
  filter_by: string;
  mock_test_id: string;
  search?: string;
}
export interface ScoreFilter {
  mock_test_id?: number;
  startDate: Date | 'all_time';
  endDate?: Date;
}

export interface RankUserByDateProps {
  endDate?: Date;
  mock_test_id: number;
}

export interface AggregatedScore {
  user_id: number;
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
