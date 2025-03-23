import { getCourses } from '@Controllers/courseController';
import express from 'express';
import { authenticate } from 'src/middlewares/authenticate';

const userScoresRouter = express.Router();

userScoresRouter.post('/', authenticate, getCourses);

export default userScoresRouter;
