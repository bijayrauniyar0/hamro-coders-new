import { Request, Response } from 'express';
import UserScores from '../models/userScoresModels';
import User from '../models/userModels';
import Subject from '../models/subjectsModels';
import { Op } from 'sequelize';
import {
  getStartDate,
  getStartOfDay,
  getStartOfMonth,
  getStartOfWeek,
} from '../utils/index';
import Notification from '../models/notificationModel';
import {
  AggregatedScore,
  FilterScoresByDateProps,
  LeaderboardQuery,
  Rank,
  RankUserByDateProps,
  ScoreFilter,
} from '@Constants/Types/leaderboard';

const PERIODS = ['daily', 'weekly', 'monthly'] as const;
type Period = (typeof PERIODS)[number];

const filterUserByDate = ({
  scores,
  startDate,
  endDate,
}: FilterScoresByDateProps): UserScores[] => {
  return scores.filter(score => {
    const createdAt = new Date(score.created_at).getTime();
    return createdAt >= startDate.getTime() && createdAt <= endDate.getTime();
  });
};

export class LeaderboardService {
  async getUserScores({
    subjectIds,
    startDate,
    endDate = new Date(),
  }: ScoreFilter): Promise<UserScores[]> {
    const whereClause: any = {};

    if (subjectIds && subjectIds.length > 0) {
      whereClause.subject_id = subjectIds;
    }
    if (startDate !== 'all_time') {
      whereClause.created_at = {
        [Op.gte]: startDate,
        [Op.lt]: endDate,
      };
    }
    if (startDate === 'all_time' && endDate) {
      whereClause.created_at = {
        [Op.lt]: endDate,
      };
    }

    const userScores = await UserScores.findAll({
      attributes: ['user_id', 'score', 'created_at'],
      where: whereClause,
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
          name: score.User.name || 'Unknown',
          total_score: 0,
        };
      }
      aggregated[userId].total_score += score.score;
    });
    return Object.values(aggregated);
  };

  private getAggregatedRanks(
    scores: UserScores[],
    endDate: Date,
  ): Record<Period, Rank[]> {
    const periods: Record<Period, Date> = {
      daily: getStartOfDay(),
      weekly: getStartOfWeek(),
      monthly: getStartOfMonth(),
    };

    const ranks: Record<Period, Rank[]> = {
      daily: [],
      weekly: [],
      monthly: [],
    };

    PERIODS.forEach(period => {
      const filtered = filterUserByDate({
        scores,
        startDate: periods[period],
        endDate,
      });
      const aggregated = this.aggregateScores(filtered);
      ranks[period] = this.getRanks(aggregated);
    });

    return ranks;
  }

  private getRanks = (scores: AggregatedScore[]): Rank[] => {
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
        getStartOfMonth() < getStartOfWeek()
          ? getStartOfMonth()
          : getStartOfWeek(),
      endDate,
    });
    return this.getAggregatedRanks(scores, endDate);
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

const compareAndNotify = async (
  leaderboardService: LeaderboardService,
  oldRanks: Record<Period, Rank[]>,
  newRanks: Record<Period, Rank[]>,
  userId: number,
  subject: string,
  userName: string,
) => {
  await Promise.all(
    PERIODS.map(async period => {
      const previousRank = getUserRank(oldRanks[period], userId);
      const newRank = getUserRank(newRanks[period], userId);
      const surpassedUsers = oldRanks[period].filter(
        ({ rank, id }) =>
          rank >= newRank && rank <= previousRank && id !== userId,
      );
      // console.log(surpassedUsers, 'suprasssed--------------------------');

      if (surpassedUsers.length > 0) {
        await leaderboardService.createSurpassedUserNotification(
          surpassedUsers,
          subject,
          period,
          userName,
        );
      }
    }),
  );
};

export const createScoreEntry = async (req: Request, res: Response) => {
  try {
    const { subject_id, score, elapsed_time } = req.body;
    const user = req.user;
    const leaderboardService = new LeaderboardService();
    const oldRanks = await leaderboardService.getRankedUsersByDate({
      subjectIds: [subject_id],
    });

    await UserScores.create({
      user_id: user.id,
      score,
      subject_id,
      elapsed_time,
    });

    const newRanks = await leaderboardService.getRankedUsersByDate({
      subjectIds: [subject_id],
    });

    const subject = await Subject.findByPk(subject_id);
    await compareAndNotify(
      leaderboardService,
      oldRanks,
      newRanks,
      user?.id,
      subject?.title || 'Unknown',
      user?.name,
    );

    res.status(201).json({ message: 'Score added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', details: error });
  }
};

export const getLeaderboard = async (req: Request, res: Response) => {
  const { filter_by, course_id, subject_id } = req.query as LeaderboardQuery;
  const subjects = await Subject.findAll({
    where: { course_id },
    attributes: ['id'],
  });
  const leaderboardService = new LeaderboardService();
  let subjectIds = subjects.map((subject: Subject) => subject.id);
  if (subject_id) {
    subjectIds = subject_id.split(',').map((id: string) => Number(id));
  }

  const startDate = getStartDate(filter_by);

  const twelveHoursAgo = new Date();
  twelveHoursAgo.setHours(twelveHoursAgo.getHours() - 12);
  try {
    const userRanks = await leaderboardService.getRankedUsers({
      subjectIds,
      startDate,
    });

    const previousUserRanks = await leaderboardService.getRankedUsers({
      subjectIds,
      startDate,
      endDate: twelveHoursAgo,
    });
    const userIds = userRanks.map((user: any) => user.id);
    const users = await User.findAll({
      where: {
        id: {
          [Op.in]: userIds,
        },
      },
      attributes: ['id', 'avatar'],
    });
    const rankedUserScores = userRanks.map((user: any) => ({
      ...user,
      previous_rank:
        previousUserRanks.find(previousRank => previousRank.id === user.id)
          ?.rank || userRanks.length + 1,
      avatar: users.find(u => u.id === user.id)?.avatar,
    }));

    res.status(200).json(rankedUserScores);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', details: error });
  }
};
