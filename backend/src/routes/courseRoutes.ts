import { getSubjectsByCourse } from '@Controllers/academicsController';
import { getCourses } from '@Controllers/courseController';
import express from 'express';
import { authenticate } from 'src/middlewares/authenticate';

const courseRouter = express.Router();

courseRouter.get('/', authenticate, getCourses);
courseRouter.get('/subjects/:course_id/', getSubjectsByCourse);


export default courseRouter;
