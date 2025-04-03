import { Request, Response } from 'express';
import UserScores from '@Models/userScoresModels';
import { getAllUserRanks, getUserRankById } from '@Services/index';
import User from '@Models/userModels';
import { Rank } from '@Constants/Types/leaderboard';

type UserRank = {
  user_id: number;
  total_score: number;
  rank: number;
};

export const createScoreEntry = async (req: Request, res: Response) => {
  try {
    const { subject_id, score } = req.body;
    const user = req.user;
    const currentRank = await getUserRankById(user.id, 'daily');
    const currentRankWeekly = await getUserRankById(user.id, 'weekly');
    const currentRankMonthly = await getUserRankById(user.id, 'monthly');
    await UserScores.create({
      score,
      subject_id,
      user_id: user?.id,
      previous_rank: {
        daily: (currentRank as UserRank)?.rank || null,
        weekly: (currentRankWeekly as UserRank)?.rank || null,
        monthly: (currentRankMonthly as UserRank)?.rank || null,
      },
    });
    res.status(201).json({ message: 'Score added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', details: error });
  }
};

export const getRank = async (req: Request, res: Response) => {
  const { filter_by } = req.query;
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
