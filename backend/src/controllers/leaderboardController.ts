import UserScores from '@Models/userScoresModels';
import User from '@Models/userModels';
import {
  getEndOfDay,
  getEndOfMonth,
  getEndOfWeek,
  getStartOfDay,
  getStartOfMonth,
  getStartOfWeek,
} from '@Utils/index';
import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Rank from '@Models/rankModel';
import sequelize from 'src/config/database';

export const createScoreEntry = async (req: Request, res: Response) => {
  const transaction = await sequelize.transaction();
  const startOfDay = getStartOfDay();
  const endOfDay = getEndOfDay();
  let newRank;
  try {
    const { subject_code, score, semester } = req.body;
    const user = req.user;
    const existingRank = await Rank.findOne({
      where: {
        user_id: user?.id,
        created_at: { [Op.between]: [startOfDay, endOfDay] },
      },
    });
    if (existingRank) {
      // Update score by adding the new score
      existingRank.score += score;
      await existingRank.save({ transaction });
    } else {
      // Create a new rank record for today
      newRank = await Rank.create(
        { user_id: user?.id, score },
        { transaction },
      );
    }
    await UserScores.create(
      {
        score,
        subject_code,
        user_id: user?.id,
        rank_id: existingRank?.id || newRank?.id,
        semester,
      },
      { transaction },
    );
    await transaction.commit();
    res.status(201).json({ message: 'Score added successfully' });
  } catch (error) {
    transaction.rollback();
    res.status(500).json({ message: 'Internal server error', details: error });
  }
};

// export const getScores = async (req: Request, res: Response) => {
//   const { filter_by } = req.query;

//   let startDate = getStartOfDay();
//   let endDate = getEndOfDay();
//   if (filter_by === 'week') {
//     startDate = getStartOfWeek();
//     endDate = getEndOfWeek();
//   }
//   if (filter_by === 'month') {
//     startDate = getStartOfMonth();
//     endDate = getEndOfMonth();
//   }
//   try {
//     const scores = await UserScores.findAll({
//       where: { createdAt: { [Op.between]: [startDate, endDate] } },
//       order: [['score', 'DESC']],
//       // limit: 10,
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//       attributes: {
//         exclude: ['id', 'createdAt', 'subject_code', 'semester'],
//       },
//     });
//     res.status(200).json(scores);
//   } catch {
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

export const getRank = async (req: Request, res: Response) => {
  const { filter_by } = req.query;

  let startDate = getStartOfDay();
  let endDate = getEndOfDay();
  if (filter_by === 'week') {
    startDate = getStartOfWeek();
    endDate = getEndOfWeek();
  }
  if (filter_by === 'month') {
    startDate = getStartOfMonth();
    endDate = getEndOfMonth();
  }
  try {
    const ranks = await Rank.findAll({
      where: { created_at: { [Op.between]: [startDate, endDate] } },
      order: [['score', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
      attributes: {
        exclude: ['id', 'created_at', 'updated_at'],
      },
    });
    res.status(200).json(ranks);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', details: error });
  }
};
