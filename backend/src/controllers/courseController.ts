import Course from '@Models/courseModels';
import Subject from '@Models/subjectsModels';
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
