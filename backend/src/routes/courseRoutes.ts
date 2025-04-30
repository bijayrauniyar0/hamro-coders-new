import {
  getCourses,
  getSubjectsByCourse,
  getSubjectsMetaData,
} from '../controllers/courseController';
import express from 'express';
import { authenticate } from '../middlewares/authenticate';

const courseRouter = express.Router();

courseRouter.get('/', authenticate, getCourses);
courseRouter.get('/subjects/:course_id/', getSubjectsByCourse);
courseRouter.get('/subjects/meta-data/:subject_id/', getSubjectsMetaData);

export default courseRouter;
