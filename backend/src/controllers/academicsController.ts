import Subject from '@Models/subjectsModels';
import { Request, Response } from 'express';

export const getSubjectsBySemester = async (req: Request, res: Response) => {
  const { semester, course_name } = req.params;
  try {
    const subjects = await Subject.findAll({
      where: { semester, course_name },
    });
    res.status(200).json(subjects);
  } catch {
    res.status(500).json({ message: 'Internal server error' });
  }
};