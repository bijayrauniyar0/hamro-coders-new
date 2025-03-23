import { getSubjectsByCourse } from '@Controllers/academicsController';
import express from 'express';

const academicsRouter = express.Router();

academicsRouter.get('/subjects/:course_id/', getSubjectsByCourse);

export default academicsRouter;
