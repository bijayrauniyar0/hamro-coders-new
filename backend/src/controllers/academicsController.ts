import Subject from '@Models/subjectsModels';
import { Request, Response } from 'express';

export const getSubjectsByCourse = async (req: Request, res: Response) => {
  const { course_id } = req.params;
  try {
    const subjects = await Subject.findAll({
      where: { course_id },
    });
    res.status(200).json(subjects);
  } catch {
    res.status(500).json({ message: 'Internal server error' });
  }
};