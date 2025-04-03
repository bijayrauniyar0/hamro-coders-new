import { Request, Response } from 'express';
import UserScores from '@Models/userScoresModels';
import { getAllUserRanks } from '@Services/index';
import User from '@Models/userModels';
import { Rank } from '@Constants/Types/leaderboard';

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

export const getRank = async (req: Request, res: Response) => {
  const { filter_by, course_id, subject_id } = req.query;
  const user = req.user;
  const userName = await User.findOne({
    where: {
      id: user.id,
    },
  });
  const sampleRank: Rank = {
    user_id: user.id,
    name: userName?.name,
    totalScore: 0,
    rank: 1,
    previous_rank: null,
  };
  try {
    const ranks: any[] = await getAllUserRanks(
      (filter_by as 'daily' | 'weekly' | 'monthly') || 'daily',
    );
    if (ranks.length === 0) {
      ranks.push(sampleRank);
    }
    res.status(200).json(ranks);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', details: error });
  }
};
