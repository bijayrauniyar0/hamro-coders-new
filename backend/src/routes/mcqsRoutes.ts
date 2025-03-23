import { getMCQs, getMCQsAnswers } from '@Controllers/mcqsController';
import express from 'express';
import { authenticate } from 'src/middlewares/authenticate';

const mcqRouter = express.Router();

mcqRouter.get('/questions/:subject_code/', authenticate, getMCQs);
mcqRouter.get('/answers/:subject_code/', getMCQsAnswers);


export default mcqRouter;