import { Request, Response } from 'express';
import UserScores from '@Models/userScoresModels';
import User from '@Models/userModels';
import Subject from '@Models/subjectsModels';
import { Op } from 'sequelize';
import { getStartOfDay, getStartOfMonth, getStartOfWeek } from '@Utils/index';

interface MyQuery {
  filter_by?: string;
  course_id?: string;
  subject_id?: string;
}

export const createScoreEntry = async (req: Request, res: Response) => {
  try {
    const { subject_id, score } = req.body;
    const user = req.user;
    await UserScores.create({
      score,
      subject_id,
      user_id: user?.id,
    });
    res.status(201).json({ message: 'Score added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', details: error });
  }
};

export const getLeaderboard = async (
  req: Request<null, null, null, MyQuery>,
  res: Response,
) => {
  const { filter_by, course_id, subject_id } = req.query;
  const subjects = await Subject.findAll({
    where: { course_id },
    attributes: ['id'],
  });
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

  const userScores = await UserScores.findAll({
    attributes: ['user_id', 'score'],
    where: {
      subject_id: subjectIds,
      mode: 'ranked',
      created_at: { [Op.gte]: startDate }, // Filter by start date
    },
    include: [
      {
        model: User,
        attributes: ['id', 'name'],
      },
    ],
  });
  const previousUserScores = await UserScores.findAll({
    attributes: ['user_id', 'score'],
    where: {
      subject_id: subjectIds,
      mode: 'ranked',
      created_at: { [Op.gte]: startDate, [Op.lt]: fiveMinutesAgo }, // Filter by start date
    },
    include: [
      {
        model: User,
        attributes: ['id'],
      },
    ],
  });

  const userTotalScores = userScores.reduce((acc: any, userScore) => {
    const userId = userScore.user_id;

    if (!acc[userId]) {
      acc[userId] = {
        id: userId,
        // @ts-ignore
        name: userScore.User.name,
        total_score: 0,
      };
    }

    acc[userId].total_score += userScore.score;

    return acc;
  }, {});

  const userTotalPreviousScores = previousUserScores.reduce(
    (acc: any, userScore) => {
      const userId = userScore.user_id;

      if (!acc[userId]) {
        acc[userId] = {
          id: userId,
          total_score: 0,
        };
      }

      acc[userId].total_score += userScore.score;

      return acc;
    },
    {},
  );

  const sortedUserScores = Object.values(userTotalScores).sort(
    (a: any, b: any) => b.total_score - a.total_score,
  );
  const sortedUserPreviousScores = Object.values(userTotalPreviousScores).sort(
    (a: any, b: any) => b.total_score - a.total_score,
  );
  const rankedPrevious = sortedUserPreviousScores.map(
    (user: any, index: number) => ({
      ...user,
      rank: index + 1,
    }),
  );
  const rankedUserScores = sortedUserScores.map((user: any, index: number) => ({
    ...user,
    rank: index + 1,
    previous_rank: rankedPrevious.find(
      previousRank => previousRank.id === user.id,
    ).rank,
  }));
  try {
    res.status(200).json(rankedUserScores);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', details: error });
  }
};
