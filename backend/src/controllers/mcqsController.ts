import MCQ from '../models/mcqModels';
import Subject from '../models/subjectsModel';
import { Request, Response } from 'express';
import sequelize from '../config/database';
import { CoursesService } from './courseController';
import Section from '../models/sectionModel';

export class MCQsService {
  async getMCQs(section_id: number, question_count: number) {
    try {
      const section = await Section.findByPk(section_id);
      if (!section) {
        throw new Error('Section not found');
      }
      const mcq_questions = await MCQ.findAll({
        where: { section_id: section_id },
        limit: question_count,
        order: sequelize.random(),
        raw: true,
      });
      return mcq_questions;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
export const getMCQs = async (req: Request, res: Response) => {
  const { subject_id } = req.params;
  try {
    if (!subject_id) {
      res
        .status(400)
        .json({ message: 'subject_id and question_count are required' });
      return;
    }
    const subject = await Subject.findByPk(subject_id);
    if (!subject) {
      res.status(404).json({ message: 'Subject not found' });
      return;
    }
    const coursesService = new CoursesService();
    const sections = await coursesService.getSubjectsMetaDataAccordingToSection(
      subject_id,
    );
    const mcqService = new MCQsService();
    const mcq_questions = await Promise.all([
      ...sections.map(async section => {
        try {
          const mcq_question = await mcqService.getMCQs(
            section.id,
            section.question_count,
          );
          const { id, ...restSectionData } = section;
          return {
            section_id: id,
            ...restSectionData,
            questions: (mcq_question ?? []).map(mcq => ({
              ...mcq,
              options: Object.entries(mcq.options).map(([key, value]) => {
                return { id: Number(key), value };
              }),
            })),
          };
        } catch {
          return []; // skip this section
        }
      }),
    ]);
    res.status(200).json({
      questions_count: sections.reduce(
        (acc, section) => acc + section.question_count,
        0,
      ),
      time_limit: subject.time_limit,
      sections: mcq_questions,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
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
