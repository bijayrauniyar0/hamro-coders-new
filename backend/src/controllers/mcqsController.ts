import MCQ from '@Models/mcqModels';
import Subject from '@Models/subjectsModels';
import { Request, Response } from 'express';
import sequelize from 'src/config/database';

export const getMCQs = async (req: Request, res: Response) => {
  const { subject_id } = req.params;
  const { question_count } = req.query;
  try {
    if (!subject_id || !question_count) {
      res
        .status(400)
        .json({ message: 'subject_id and question_count are required' });
      return;
    }

    const mcqQuestions = await MCQ.findAll({
      order: sequelize.random(),
      limit: +question_count,
      where: { subject_id },
      include: [{ model: Subject }],
    });

    const mcqQuestionsArray = mcqQuestions.map(mcq => {
      return {
        question: mcq.question,
        options: Object.entries(mcq.options).map(([key, value]) => {
          return { id: Number(key), value };
        }),
        id: mcq.id,
      };
    });
    res.status(200).json(mcqQuestionsArray);
  } catch {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getMCQsAnswers = async (req: Request, res: Response) => {
  const { subject_id } = req.params;
  const { questions } = req.query;
  try {
    const mcqAnswers = await MCQ.findAll({
      attributes: ['id', 'answer'],
      where: {
        subject_id,
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
