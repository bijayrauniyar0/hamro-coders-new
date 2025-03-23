import Course from '@Models/courseModels';
import { Request, Response } from 'express';

export const getCourses = async (req: Request, res: Response) => {
  try {
    const subjects = await Course.findAll({});
    res.status(200).json(subjects);
  } catch {
    res.status(500).json({ message: 'Internal server error' });
  }
};
