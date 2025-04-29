/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import { LeaderboardService } from './leaderboardController';
import UserScores from '@Models/userScoresModels';
import { Op } from 'sequelize';
import { formatToMinSec, getStartDateByTimePeriod } from '@Utils/index';
import {
  IGetUserStatsParamType,
  IPerformanceDetails,
  IRecentSessions,
  UserScoresArgsType,
} from '@Constants/Types/userStats';
import Subject from '@Models/subjectsModels';
import {
  subDays,
  subWeeks,
  subMonths,
  startOfWeek,
  startOfMonth,
} from 'date-fns';

export async function seedUserScores(count: number = 100) {
  const startDate = new Date('2025-01-01');
  const endDate = new Date('2025-04-26');

  const getRandomDate = () => {
    const diff = endDate.getTime() - startDate.getTime();
    return new Date(startDate.getTime() + Math.random() * diff);
  };

  const getRandomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const getRandomMode = () => (Math.random() > 0.5 ? 'practice' : 'ranked');

  const records = Array.from({ length: count }).map(() => {
    const user_id = getRandomInt(1, 4);
    return {
      user_id: user_id,
      score: getRandomInt(6, 10),
      created_at: getRandomDate(),
      elapsed_time: getRandomInt(200, 600),
      mode: getRandomMode(),
      subject_id: getRandomInt(1, 5),
    };
  });

  await UserScores.bulkCreate(records);
}

export class UserStatsService {
  private user_id: number;

  constructor(userId: number) {
    this.user_id = userId;
  }
  async getUserScores({
    startDate,
    mode,
    otherFilterOptions,
  }: UserScoresArgsType): Promise<UserScores[]> {
    const whereClause: any = {
      user_id: this.user_id,
    };
    if (mode !== 'all') {
      whereClause.mode = mode;
    }
    if (startDate !== 'all_time') {
      whereClause.created_at = {
        [Op.gte]: startDate,
      };
    }

    const userScores = await UserScores.findAll({
      where: whereClause,
      attributes: {
        exclude: ['user_id', 'subject_id'],
      },
      include: [{ model: Subject, attributes: ['title'] }],
      order: [['created_at', 'DESC']],
      ...otherFilterOptions,
    });
    return userScores;
  }

  async getRecentSessions(dataLimit: number = 5): Promise<IRecentSessions[]> {
    const userScores = await this.getUserScores({
      startDate: 'all_time',
      mode: 'all',
      otherFilterOptions: {
        limit: dataLimit,
        raw: false,
      },
    });
    const scores = userScores.map(score => {
      const { Subject, ...scoreData } = score.get();
      return {
        ...scoreData,
        date: scoreData.created_at,
        elapsed_time: formatToMinSec(scoreData.elapsed_time),
        title: `${Subject.title}`,
        // accuracy: `${((score.score / 10) * 100).toFixed(2)} %`,
        subject: Subject.title,
      };
    });
    return scores;
  }
  async getUserPerformanceDetails({
    time_period,
    page = 1,
    page_size = 15,
    sort_by = 'created_at',
    sort_order = 'desc',
  }: Pick<IGetUserStatsParamType, 'time_period'> & {
    page?: number;
    page_size?: number;
    sort_by?: keyof IPerformanceDetails;
    sort_order?: 'asc' | 'desc';
  }): Promise<{
    results: IPerformanceDetails[];
    total: number;
    page: number;
    next_page: number | null;
  }> {
    const leaderboardService = new LeaderboardService();

    const startDate = getStartDateByTimePeriod(time_period);
    const allScoresData = await this.getUserScores({
      startDate,
      mode: 'ranked',
    });

    const total = allScoresData.length;
    const offset = (page - 1) * page_size;

    // Sort
    const validSortFields = ['elapsed_time', 'score', 'created_at'] as const;
    const sortField = validSortFields.includes(sort_by as any)
      ? sort_by
      : 'created_at';

    const sortedScores = allScoresData.sort((a, b) => {
      const aVal = a.get?.()[sortField];
      const bVal = b.get?.()[sortField];

      if (aVal == null || bVal == null) return 0;
      return sort_order === 'asc' ? aVal - bVal : bVal - aVal;
    });

    const scoresData = sortedScores.slice(offset, offset + page_size);

    const userScoresStack: IPerformanceDetails[] = [];

    const performanceDetails = await Promise.all(
      scoresData.map(async (scoreModel, index) => {
        const { Subject, ...score } = scoreModel.get();
        const response: IPerformanceDetails = {
          ...score,
          subject: Subject.title,
          date: score.created_at,
          elapsed_time: formatToMinSec(score.elapsed_time),
          title: `${score.mode} #${score.id}`,
          accuracy: `${((score.score / 10) * 100).toFixed(2)} %`,
          rank_change: 'N/A',
        };

        if (score.mode !== 'practice') {
          const userRank = await leaderboardService.getRankedUsers({
            startDate,
            endDate: new Date(
              new Date(score.created_at).getTime() - 24 * 60 * 60 * 1000,
            ),
          });

          const userScoreDetail = userRank.find(
            (user: any) => user.id === this.user_id,
          );

          const updatedResponse = {
            ...response,
            rank_change:
              (userScoreDetail?.rank ?? 0) -
              Number(userScoresStack[index - 1]?.rank_change ?? 0),
          };

          userScoresStack.push(updatedResponse);
          return updatedResponse;
        }

        return response;
      }),
    );

    return {
      results: performanceDetails,
      total,
      page,
      next_page: offset + page_size < total ? page + 1 : null,
    };
  }
}

export const getUserStats = async (
  req: Request<unknown, unknown, unknown, IGetUserStatsParamType>,
  res: Response,
) => {
  const { mode, time_period } = req.query;
  const { user } = req;
  const leaderboardService = new LeaderboardService();
  const userStatsService = new UserStatsService(user.id);
  try {
    const scores = await userStatsService.getUserScores({
      startDate: getStartDateByTimePeriod(time_period),
      mode,
    });
    const userRanks = await leaderboardService.getRankedUsers({
      startDate: getStartDateByTimePeriod(time_period),
    });

    const totalScore = scores.reduce((acc, score) => acc + score.score, 0);
    const avg_accuracy = +((totalScore / (scores.length * 10)) * 100).toFixed(
      2,
    );

    const stats = {
      score: totalScore,
      avg_accuracy: avg_accuracy ? `${avg_accuracy}%` : 'N/A',
      total_sessions: scores.length,
      current_rank: userRanks.find((user: any) => user.id === req.user.id)
        ?.rank,
    };

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', details: error });
  }
};

export const getRecentSessions = async (req: Request, res: Response) => {
  const { user } = req;

  const userStatsService = new UserStatsService(user.id);
  try {
    const scoresData = await userStatsService.getRecentSessions(3);
    res.status(200).json(scoresData);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', details: error });
  }
};

export const getPerformanceDetails = async (
  req: Request<unknown, unknown, unknown, IGetUserStatsParamType>,
  res: Response,
) => {
  const {
    time_period,
    page = 1,
    page_size = 15,
    sort_by,
    sort_order,
  } = req.query;
  const { user } = req;
  const pageNum = parseInt(page as string, 10) || 1;
  const pageSize = parseInt(page_size as string, 10) || 15;

  // await seedUserScores(300);
  const userStatsService = new UserStatsService(user.id);
  try {
    const performanceDetails = await userStatsService.getUserPerformanceDetails(
      {
        time_period,
        page: pageNum,
        page_size: pageSize,
        sort_by,
        sort_order,
      },
    );
    res.status(200).json(performanceDetails);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', details: error });
  }
};

export const getPerformanceTrend = async (
  req: Request<unknown, unknown, unknown, { filter_by: string }>,
  res: Response,
) => {
  const { filter_by } = req.query;
  const { user } = req;

  try {
    const now = new Date();

    let getStartDate: (amount: number) => Date;
    let rangeLabelFormat: Intl.DateTimeFormatOptions;
    const startOfCurrentWeek = startOfWeek(now, { weekStartsOn: 0 }); // Week starts on Sunday (0) or Monday (1)
    const startOfCurrentMonth = startOfMonth(now); // Start of the current month
    switch (filter_by) {
      case 'last_3_weeks':
        getStartDate = amount => subWeeks(startOfCurrentWeek, amount);
        rangeLabelFormat = { month: 'short', day: 'numeric' };
        break;
      case 'last_3_months':
        getStartDate = amount => subMonths(startOfCurrentMonth, amount);
        rangeLabelFormat = { month: 'short' };
        break;
      default:
        getStartDate = amount => subDays(new Date(), amount);
        rangeLabelFormat = { month: 'short', day: 'numeric' };
    }

    const rangeStarts = [getStartDate(3), getStartDate(2), getStartDate(1)];

    // console.log(rangeStarts, '000000-----------------------');
    const scores = await UserScores.findAll({
      where: {
        user_id: user.id,
        created_at: {
          [Op.gte]: rangeStarts[0],
        },
      },
      raw: true,
      attributes: ['score', 'elapsed_time', 'created_at'],
      order: [['created_at', 'ASC']],
    });

    const stats = [
      { total_score: 0, total_accuracy: 0, total_time: 0, count: 0 }, // oldest
      { total_score: 0, total_accuracy: 0, total_time: 0, count: 0 },
      { total_score: 0, total_accuracy: 0, total_time: 0, count: 0 }, // most recent
    ];

    for (const score of scores) {
      const createdAt = new Date(score.created_at);

      if (createdAt >= rangeStarts[2]) {
        Object.assign(stats[2], {
          total_score: stats[2].total_score + score.score,
          total_time: stats[2].total_time + score.elapsed_time,
          count: stats[2].count + 1,
        });
      } else if (createdAt >= rangeStarts[1]) {
        Object.assign(stats[1], {
          total_score: stats[1].total_score + score.score,
          total_time: stats[1].total_time + score.elapsed_time,
          count: stats[1].count + 1,
        });
      } else {
        Object.assign(stats[0], {
          total_score: stats[0].total_score + score.score,
          total_time: stats[0].total_time + score.elapsed_time,
          count: stats[0].count + 1,
        });
      }
    }

    const formatStats = (data: (typeof stats)[0], start: Date, end: Date) => {
      return {
        label: `${start.toLocaleDateString(undefined, rangeLabelFormat)} ${
          filter_by === 'last_3_months'
            ? ''
            : `- ${end.toLocaleDateString(undefined, rangeLabelFormat)}`
        }`,
        avg_score: data.count ? +(data.total_score / data.count).toFixed(2) : 0,
        avg_elapsed_time: data.count
          ? +(data.total_time / data.count / 60).toFixed(2)
          : 0,
      };
    };

    const results = [
      formatStats(stats[0], rangeStarts[0], rangeStarts[1]),
      formatStats(stats[1], rangeStarts[1], rangeStarts[2]),
      formatStats(stats[2], rangeStarts[2], new Date()),
    ];

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', details: error });
  }
};
