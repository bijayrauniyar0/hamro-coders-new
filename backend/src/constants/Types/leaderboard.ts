import UserScores from '@Models/userScoresModels';

export interface LeaderboardQuery {
  filter_by: string;
  course_id?: string;
  subject_id?: string;
}
export interface ScoreFilter {
  subjectIds: number[];
  startDate: Date;
  endDate?: Date;
}

export interface RankUserByDateProps {
  endDate?: Date;
  subjectIds: number[];
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
