/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import { LeaderboardService } from './userScoresController';
import UserScores from '../models/userScoresModels';
import { Op } from 'sequelize';
import { formatToMinSec, getStartDateByTimePeriod } from '../utils/index';
import {
  IGetUserStatsParamType,
  IPerformanceDetails,
  IRecentSessions,
  UserScoresArgsType,
} from '../constants/Types/userStats';
import MockTest from '../models/mockTestModel';
import {
  subDays,
  subWeeks,
  subMonths,
  startOfWeek,
  startOfMonth,
} from 'date-fns';
import Stream from '../models/streamModels';
import User from '../models/userModels';
import Discussion from '../models/discussionModel';
import Section from '../models/sectionModel';
// import User from '@Models/userModels';

export async function seedUserScores(count: number = 100) {
  const oneWeekAgo = new Date();
  const startDate = new Date(oneWeekAgo.setDate(oneWeekAgo.getDate() - 7));
  const endDate = new Date();
  const getRandomDate = () => {
    const diff = endDate.getTime() - startDate.getTime();
    return new Date(startDate.getTime() + Math.random() * diff);
  };

  const getRandomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  try {
    const users = await User.findAll({
      attributes: ['id'],
      raw: true,
    });
    const userIds = users.map(user => user.id);
    const mockTest = await MockTest.findAll({
      attributes: ['id'],
    });
    const mockTestIds = mockTest.map(test => test.id);
    const api_url = 'https://zenquotes.io/api/quotes/';

    // create discussions
    // async function getapi() {
    //   const response = await fetch(api_url);
    //   const data = await response.json();
    //   return data;
    // }
    // const data = await getapi();
    // const records = data.map((quote: any) => {
    //   const user_id = userIds[getRandomInt(0, userIds.length - 1)];
    //   const mock_test_id = mockTestIds[getRandomInt(0, mockTestIds.length - 1)];
    //   return {
    //     user_id,
    //     message: quote.q,
    //     created_at: getRandomDate(),
    //     mock_test_id,
    //   };
    // });
    // await Discussion.bulkCreate(records);

    // create scores

    // const records = Array.from({ length: count }).map(() => {
    //   const user_id = userIds[getRandomInt(0, userIds.length - 1)];
    //   const mock_test_id = mockTestIds[getRandomInt(0, mockTestIds.length - 1)];
    //   return {
    //     user_id,
    //     score: getRandomInt(7, 10),
    //     created_at: getRandomDate(),
    //     elapsed_time: getRandomInt(200, 600),
    //     mock_test_id,
    //   };
    // });

    // await UserScores.bulkCreate(records);
  } catch (error) {
    throw new Error('Error seeding user scores:');
  }
}

export class UserStatsService {
  private user_id: number;

  constructor(userId: number) {
    this.user_id = userId;
  }
  async getUserScores({
    startDate,
    otherFilterOptions,
    mock_test_id,
  }: UserScoresArgsType): Promise<UserScores[]> {
    const whereClause: any = {
      user_id: this.user_id,
    };
    if (mock_test_id) {
      whereClause.mock_test_id = mock_test_id;
    }
    if (startDate !== 'all_time') {
      whereClause.created_at = {
        [Op.gte]: startDate,
      };
    }
    const userScores = await UserScores.findAll({
      where: whereClause,
      attributes: {
        exclude: ['user_id', 'mock_test_id'],
      },
      include: [
        {
          model: MockTest,
          attributes: ['title', 'time_limit'],
          include: [
            {
              model: Stream,
              attributes: ['name'], // or other fields
            },
            {
              model: Section,
              attributes: ['question_count', 'marks_per_question'],
            },
          ],
        },
      ],
      order: [['created_at', 'DESC']],
      ...otherFilterOptions,
    });
    return userScores;
  }

  async getRecentSessions(dataLimit: number = 5): Promise<IRecentSessions[]> {
    const userScores = await this.getUserScores({
      startDate: 'all_time',
      otherFilterOptions: {
        limit: dataLimit,
        raw: false,
      },
    });
    const scores = userScores.map(score => {
      const { MockTest, ...scoreData } = score.get();
      return {
        ...scoreData,
        elapsed_time: formatToMinSec(scoreData.elapsed_time),
        title: `${MockTest.title}`,
        stream_name: MockTest.Stream.name,
        // accuracy: `${((score.score / 10) * 100).toFixed(2)} %`,
        test: MockTest.title,
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
    mock_test_id,
  }: Pick<IGetUserStatsParamType, 'time_period'> & {
    page?: number;
    page_size?: number;
    sort_by?: keyof IPerformanceDetails;
    sort_order?: 'asc' | 'desc';
    mock_test_id: number;
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
      mock_test_id: Number(mock_test_id),
      controllerName: 'getUserPerformanceDetails',
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
        const { MockTest, ...score } = scoreModel.get();
        const response: IPerformanceDetails = {
          ...score,
          test: MockTest?.title,
          date: score.created_at,
          elapsed_time: formatToMinSec(score.elapsed_time),
          title: `${score.mode} #${score.id}`,
          accuracy: `${((score.score / 10) * 100).toFixed(2)} %`,
          rank_change: 'N/A',
        };

        const userRank = await leaderboardService.getRankedUsers({
          startDate,
          endDate: new Date(
            new Date(score.created_at).getTime() - 24 * 60 * 60 * 1000,
          ),
          mock_test_id,
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

        // return response;
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
  const { time_period, mock_test_id } = req.query;
  const { user } = req;
  const leaderboardService = new LeaderboardService();
  const userStatsService = new UserStatsService(user.id);
  if (!mock_test_id) {
    res.status(400).end('Mock test id is required');
    return;
  }
  try {
    const scores = await userStatsService.getUserScores({
      startDate: getStartDateByTimePeriod(time_period),
      mock_test_id: Number(mock_test_id),
    });
    const userRanks = await leaderboardService.getRankedUsers({
      startDate: 'all_time',
      mock_test_id: Number(mock_test_id),
    });

    const totalScore = scores.reduce((acc, score) => acc + score.score, 0);
    const avg_accuracy = +((totalScore / (scores.length * 10)) * 100).toFixed(
      2,
    );
    const stats = {
      score: totalScore,
      avg_accuracy: avg_accuracy ? `${avg_accuracy}%` : 'N/A',
      total_sessions: scores.length,
      current_rank: userRanks.find((user: any) => user.user_id === req.user.id)
        ?.rank,
    };

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', details: error });
  }
};

export const getRadarMetrics = async (
  req: Request<{ user_id: string }, unknown, unknown, IGetUserStatsParamType>,
  res: Response,
) => {
  const { user_id } = req.params;
  const { mock_test_id } = req.query;

  if (!mock_test_id) {
    res.status(400).send('Mock test id is required');
    return;
  }
  if (!user_id) {
    res.status(400).send('User id is required');
    return;
  }

  try {
    const userStatsService = new UserStatsService(+user_id);
    const maxTestsTakenInSubject = 10;
    const maxTimeRatio = 1.5;

    const userAttempts = await userStatsService.getUserScores({
      startDate: 'all_time',
      mock_test_id: Number(mock_test_id),
    });

    if (userAttempts.length === 0){
      res.status(404).json({ message: 'No attempts found' });
      return; 
}
    const sortedAttempts = [...userAttempts].sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    );

    // Helper to calculate full marks and total questions from sections
    const calcMockStats = (
      sections: (typeof userAttempts)[0]['MockTest']['Sections'],
    ) => {
      const fullMarks = sections.reduce(
        (sum, sec) => sum + sec.question_count * sec.marks_per_question,
        0,
      );
      const totalQuestions = sections.reduce(
        (sum, sec) => sum + sec.question_count,
        0,
      );
      return { fullMarks, totalQuestions };
    };

    let totalScore = 0;
    let totalFullMarks = 0;
    let totalElapsedTime = 0;
    let totalTimeGiven = 0;
    let totalUnansweredQuestions = 0;
    let totalQuestions = 0;

    for (const attempt of userAttempts) {
      const { Sections, time_limit } = attempt.MockTest;
      const { fullMarks, totalQuestions: mockTotalQuestions } =
        calcMockStats(Sections);

      totalScore += attempt.score;
      totalFullMarks += fullMarks;
      totalElapsedTime += attempt.elapsed_time;
      totalTimeGiven += time_limit * 60;
      totalUnansweredQuestions += attempt.unanswered_questions;
      totalQuestions += mockTotalQuestions;
    }

    // Accuracy %
    const accuracy = (totalScore / totalFullMarks) * 100;
    // Average Elapsed Time (inverted, clamped)
    const avgElapsedRatio = totalElapsedTime / totalTimeGiven;
    const clampedTimeRatio = Math.min(avgElapsedRatio, maxTimeRatio);
    const normElapsedTime = ((maxTimeRatio - clampedTimeRatio) / 1.0) * 100;

    // Tests Taken (normalized)
    const testsTaken = userAttempts.length;
    const normTestsTaken = Math.min(
      100,
      (testsTaken / maxTestsTakenInSubject) * 100,
    );

    // Improvement Rate
    const getDerivedScore = (attempt: (typeof userAttempts)[0]) => {
      const { fullMarks } = calcMockStats(attempt.MockTest.Sections);
      return attempt.score / fullMarks;
    };
    const improvementRate =
      (getDerivedScore(sortedAttempts[sortedAttempts.length - 1]) -
        getDerivedScore(sortedAttempts[0])) *
      100;
    const normImprovement = Math.max(
      0,
      Math.min(100, (improvementRate + 100) / 2),
    );

    // Average Unanswered Questions (%)
    const avgUnansweredQuestions =
      (totalUnansweredQuestions / totalQuestions) * 100;

    // Final Radar Metrics
    const radarMetrics = {
      accuracy: Number(accuracy.toFixed(2)),
      avg_elapsed_time: Number(normElapsedTime.toFixed(2)),
      tests_taken: Number(normTestsTaken.toFixed(2)),
      improvement_rate: Number(normImprovement.toFixed(2)),
      avg_unanswered_questions: Number(avgUnansweredQuestions.toFixed(2)),
    };

    res.status(200).json(radarMetrics);
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
  // await seedUserScores(100);

  const {
    time_period,
    page = 1,
    page_size = 15,
    sort_by,
    sort_order,
    mock_test_id,
  } = req.query;
  const { user } = req;
  const pageNum = parseInt(page as string, 10) || 1;
  const pageSize = parseInt(page_size as string, 10) || 15;
  const userStatsService = new UserStatsService(user.id);
  if (!mock_test_id) {
    res.status(400).end('Mock test id is required');
    return;
  }
  try {
    const performanceDetails = await userStatsService.getUserPerformanceDetails(
      {
        time_period,
        page: pageNum,
        page_size: pageSize,
        sort_by,
        sort_order,
        mock_test_id: Number(mock_test_id),
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
