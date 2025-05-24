import {
  getCourses,
  getSubjectsByCourse,
  getSubjectsMetaData,
} from '../controllers/courseController';
import express from 'express';

const courseRouter = express.Router();

courseRouter.get('/', getCourses);
courseRouter.get('/subjects/:course_id/', getSubjectsByCourse);
courseRouter.get('/subjects/meta-data/:subject_id/', getSubjectsMetaData);

export default courseRouter;
