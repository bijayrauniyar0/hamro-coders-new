import Course from '../models/courseModels';
import Subject from '../models/subjectsModel';
import { Request, Response } from 'express';

export class CoursesService {
  async getCourses() {
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
      return updatedCourses;
    } catch {
      throw new Error('Internal server error');
    }
  }
  async getSubjectsByCourse(course_id: number) {
    try {
      const subjects = await Subject.findAll({
        where: { course_id },
      });
      return subjects;
    } catch {
      throw new Error('Internal server error');
    }
  }
  async getSubjectsMetaDataAccordingToSection(subject_id: number | string) {
    try {
      const subjects = await Subject.findByPk(subject_id);
      if (!subjects) {
        throw new Error('Subject not found');
      }
      const sections = await subjects.getSections({
        joinTableAttributes: [],
        raw: true,
      });
      return sections;
    } catch {
      throw new Error('Internal server error');
    }
  }
}
export const getCourses = async (req: Request, res: Response) => {
  try {
    const coursesService = new CoursesService();
    const courses = await coursesService.getCourses();
    res.status(200).json(courses);
  } catch {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getSubjectsByCourse = async (req: Request, res: Response) => {
  const { course_id } = req.params;
  try {
    const coursesService = new CoursesService();
    const subjects = await coursesService.getSubjectsByCourse(+course_id);
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
