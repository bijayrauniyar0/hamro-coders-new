import { getSubjectsBySemester } from '@Controllers/academicsController';
import express from 'express';

const academicsRouter = express.Router();

academicsRouter.get('/subjects/:semester/:course_name/', getSubjectsBySemester);

export default academicsRouter;
