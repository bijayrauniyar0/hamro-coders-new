import { Request, Response } from 'express';
import UserScores from '@Models/userScoresModels';
import User from '@Models/userModels';
import Subject from '@Models/subjectsModels';
import { Op } from 'sequelize';
import { getStartOfDay, getStartOfMonth, getStartOfWeek } from '@Utils/index';
import Notification from '@Models/notificationModel';
import {
  AggregatedScore,
  FilterScoresByDateProps,
  LeaderboardQuery,
  Rank,
  RankUserByDateProps,
  ScoreFilter,
} from '@Constants/Types/leaderboard';

const filterUserByDate = ({
  scores,
  startDate,
  endDate,
}: FilterScoresByDateProps): UserScores[] => {
  const filteredScores = scores.filter(
    (userScore: UserScores) =>
      userScore.created_at.getDate() === startDate.getDate() &&
      userScore.created_at.getDate() <= endDate.getDate(),
  );
  return filteredScores;
};

export class LeaderboardService {
  async getUserScores({
    subjectIds,
    startDate,
    endDate = new Date(),
  }: ScoreFilter): Promise<UserScores[]> {
    const userScores = await UserScores.findAll({
      attributes: ['user_id', 'score', 'created_at'],
      where: {
        subject_id: subjectIds,
        mode: 'ranked',
        created_at: {
          [Op.gte]: startDate,
          [Op.lt]: endDate,
        },
      },
      include: [{ model: User, attributes: ['id', 'name'] }],
    });
    return userScores;
  }

  aggregateScores = (scores: UserScores[]) => {
    const aggregated: Record<number, AggregatedScore> = {};

    scores.forEach(score => {
      const userId = score.user_id;
      if (!aggregated[userId]) {
        aggregated[userId] = {
          id: userId,
          name: score.User?.name || 'Unknown',
          total_score: 0,
        };
      }
      aggregated[userId].total_score += score.score;
    });
    return Object.values(aggregated);
  };

  getRanks = (scores: AggregatedScore[]): Rank[] => {
    const rankedScores = scores
      .sort((a, b) => b.total_score - a.total_score)
      .map((user, index) => ({
        ...user,
        rank: index + 1,
      }));
    return rankedScores;
  };

  async getRankedUsers({ subjectIds, startDate, endDate }: ScoreFilter) {
    const allScores = await this.getUserScores({
      subjectIds,
      startDate,
      endDate,
    });
    const aggregatedScores = this.aggregateScores(allScores);
    return this.getRanks(aggregatedScores);
  }

  async getRankedUsersByDate({
    subjectIds,
    endDate = new Date(),
  }: RankUserByDateProps) {
    const scores = await this.getUserScores({
      subjectIds,
      startDate:
        getStartOfMonth() > getStartOfWeek()
          ? getStartOfMonth()
          : getStartOfWeek(),
      endDate: new Date(),
    });
    const userScoresDaily = filterUserByDate({
      scores,
      startDate: getStartOfDay(),
      endDate,
    });
    const userScoresWeekly = filterUserByDate({
      scores,
      startDate: getStartOfWeek(),
      endDate,
    });
    const userScoresMonthly = filterUserByDate({
      scores,
      startDate: getStartOfMonth(),
      endDate,
    });
    const aggregatedDaily = this.aggregateScores(userScoresDaily);
    const aggregatedWeekly = this.aggregateScores(userScoresWeekly);
    const aggregatedMonthly = this.aggregateScores(userScoresMonthly);

    return {
      daily: this.getRanks(aggregatedDaily),
      weekly: this.getRanks(aggregatedWeekly),
      monthly: this.getRanks(aggregatedMonthly),
    };
  }

  async createSurpassedUserNotification(
    users: Rank[],
    subject: string,
    period: string,
    userName: string = 'Unknown',
  ) {
    await Promise.all(
      users.map(async (user: Rank) => {
        await Notification.create({
          user_id: user.id,
          message: `You have been surpassed by ${userName} in the ${period} leaderboard in ${subject} subject.`,
          is_read: false,
        });
      }),
    );
  }
}

const getUserRank = (ranks: Rank[], userId: number) => {
  const rank = ranks.find((rank: Rank) => rank.id === userId)?.rank;
  return rank ? rank : ranks.length + 1;
};

export const createScoreEntry = async (req: Request, res: Response) => {
  try {
    const { subject_id, score, mode, elapsed_time } = req.body;
    const user = req.user;
    const leaderboardService = new LeaderboardService();
    const {
      daily: rankDaily,
      monthly: rankMonthly,
      weekly: rankWeekly,
    } = await leaderboardService.getRankedUsersByDate({
      subjectIds: [subject_id],
    });
    await UserScores.create({
      user_id: user?.id,
      score,
      subject_id,
      mode,
      elapsed_time,
    });
    const {
      daily: rankDailyAfterCreation,
      monthly: rankMonthlyAfterCreation,
      weekly: rankWeeklyAfterCreation,
    } = await leaderboardService.getRankedUsersByDate({
      subjectIds: [subject_id],
    });

    const userRankDaily = getUserRank(rankDaily, user?.id);
    const userRankWeekly = getUserRank(rankWeekly, user?.id);
    const userRankMonthly = getUserRank(rankMonthly, user?.id);
    const userRankDailyAfterCreation = getUserRank(
      rankDailyAfterCreation,
      user?.id,
    );
    const userRankWeeklyAfterCreation = getUserRank(
      rankWeeklyAfterCreation,
      user?.id,
    );
    const userRankMonthlyAfterCreation = getUserRank(
      rankMonthlyAfterCreation,
      user?.id,
    );
    const surpassedUsersDaily = rankDaily.filter(
      (rank: Rank) =>
        rank.rank > userRankDailyAfterCreation && rank.rank <= userRankDaily,
    );
    const surpassedUsersWeekly = rankWeekly.filter(
      (rank: Rank) =>
        rank.rank > userRankWeeklyAfterCreation && rank.rank <= userRankWeekly,
    );
    const surpassedUsersMonthly = rankMonthly.filter(
      (rank: Rank) =>
        rank.rank > userRankMonthlyAfterCreation &&
        rank.rank <= userRankMonthly,
    );

    const subject = await Subject.findByPk(subject_id);
    await Promise.all([
      leaderboardService.createSurpassedUserNotification(
        surpassedUsersDaily,
        subject?.title || 'Unknown',
        'daily',
        user?.name,
      ),
      leaderboardService.createSurpassedUserNotification(
        surpassedUsersWeekly,
        subject?.title || 'Unknown',
        'weekly',
        user?.name,
      ),
      leaderboardService.createSurpassedUserNotification(
        surpassedUsersMonthly,
        subject?.title || 'Unknown',
        'monthly',
        user?.name,
      ),
    ]);

    res.status(201).json({ message: 'Score added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', details: error });
  }
};

export const getLeaderboard = async (
  req: Request<null, null, null, LeaderboardQuery>,
  res: Response,
) => {
  const { filter_by, course_id, subject_id } = req.query;
  const subjects = await Subject.findAll({
    where: { course_id },
    attributes: ['id'],
  });
  const leaderboardService = new LeaderboardService();
  let subjectIds = subjects.map((subject: Subject) => subject.id);
  if (subject_id) {
    subjectIds = subject_id.split(',').map((id: string) => Number(id));
  }

  let startDate = new Date();
  if (filter_by === 'daily') {
    startDate = getStartOfDay();
  } else if (filter_by === 'weekly') {
    startDate = getStartOfWeek();
  } else if (filter_by === 'monthly') {
    startDate = getStartOfMonth();
  }

  const fiveMinutesAgo = new Date();
  fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);
  try {
    const userRanks = await leaderboardService.getRankedUsers({
      subjectIds,
      startDate,
    });

    const previousUserRanks = await leaderboardService.getRankedUsers({
      subjectIds,
      startDate,
      endDate: fiveMinutesAgo,
    });
    const rankedUserScores = userRanks.map((user: any) => ({
      ...user,
      previous_rank:
        previousUserRanks.find(previousRank => previousRank.id === user.id)
          ?.rank || userRanks.length + 1,
    }));

    res.status(200).json(rankedUserScores);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', details: error });
  }
};
