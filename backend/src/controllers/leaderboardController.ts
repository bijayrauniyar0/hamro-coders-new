import LeaderBoard from '@Models/leaderBoardModels';
import { Request, Response } from 'express';

export const postLeaderboardEntry = async (req: Request, res: Response) => {
  try {
    const { subject_code, score, semester } = req.body;
    const user = req.user;
    await LeaderBoard.create({
      score,
      subject_code,
      user_id: user?.id,
      semester,
    });
    res.status(201).json({ message: 'Leaderboard entry created' });
  } catch {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// export const getLeaderboardController = (req: Request, res: Response) => {
//     // try {
//     //     const {semester} = req.query;
//     //     const 
//     // }
// }