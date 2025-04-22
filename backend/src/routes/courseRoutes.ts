import {
  getCourses,
  getSubjectsByCourse,
  getSubjectsMetaData,
} from '@Controllers/courseController';
import express from 'express';
import { authenticate } from 'src/middlewares/authenticate';

const courseRouter = express.Router();

courseRouter.get('/', authenticate, getCourses);
courseRouter.get('/subjects/:course_id/', getSubjectsByCourse);
courseRouter.get('/subjects/meta-data/:subject_id/', getSubjectsMetaData);

export default courseRouter;
