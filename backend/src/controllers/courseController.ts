import Course from '../models/courseModels';
import Subject from '../models/subjectsModels';
import { Request, Response } from 'express';

export const getCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.findAll({});
    const updatedCourses = await Promise.all(
      courses.map(async course => {
        const subjectsCount = await Subject.count({
          where: { course_id: course.id },
        });

        return {
          ...course.toJSON(),
          subjects_count: subjectsCount,
        };
      }),
    );
    // console.log(updatedCourses.);
    res.status(200).json(updatedCourses);
  } catch {
    res.status(500).json({ message: 'Internal server error' });
  }
};

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

export const getSubjectsMetaData = async (
  req: Request<{ subject_id: number }, unknown, unknown, unknown>,
  res: Response,
) => {
  const { subject_id } = req.params;
  try {
    const subjects = await Subject.findByPk(subject_id);
    res.status(200).json(subjects);
  } catch {
    res.status(500).json({ message: 'Internal server error' });
  }
};
