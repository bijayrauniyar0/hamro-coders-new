import MCQ from '@Models/mcqModels';
import { Request, Response } from 'express';
import sequelize from 'src/config/database';

export const getMCQs = async (req: Request, res: Response) => {
  const { subject_code } = req.params;
  try {
    const mcqQuestions = await MCQ.findAll({
      attributes: {
        exclude: ['subject_code'], // Excludes the 'answer' column
      },
      order: sequelize.random(),
      limit: 3,
      where: { subject_code: subject_code },
    });
    const mcqQuestionsArray = mcqQuestions.map(mcq => {
      return {
        question: mcq.question,
        options: Object.entries(mcq.options).map(([key, value]) => {
          return { id: Number(key), value: value };
        }),
        id: mcq.id,
        answer: Number(mcq.answer),
      };
    });
    res.status(200).json(mcqQuestionsArray);
  } catch {
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const getMCQsAnswers = async (req: Request, res: Response) => {
  const { subject_code } = req.params;
  const { questions } = req.query;
  try {
    const mcqAnswers = await MCQ.findAll({
      attributes: ['id', 'answer'],
      where: {
        subject_code: subject_code,
        id: (questions as string)?.split(','),
      },
    });
    const mcqAnswersArray = mcqAnswers.map(mcq => {
      return {
        id: Number(mcq.id),
        answer: Number(mcq.answer),
      };
    });
    res.status(200).json(mcqAnswersArray);
  } catch {
    res.status(500).json({ message: 'Internal server error' });
  }
};
// export const getMCQAnswer = async (req: Request, res: Response) => {
//   const { mcq_id } = req.params;
//   try {
//     const mcqAnswer = await MCQ.findByPk(mcq_id, {
//       attributes: ['answer'],
//     });
//     res.status(200).json(mcqAnswer);
//   } catch {
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };
