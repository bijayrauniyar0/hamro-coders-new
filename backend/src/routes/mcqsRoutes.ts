import { getMCQs, getMCQsAnswers } from '../controllers/mcqsController';
import express from 'express';
import { authenticate } from '../middlewares/authenticate';

const mcqRouter = express.Router();

mcqRouter.get('/questions/:subject_id/', authenticate, getMCQs);
mcqRouter.get('/answers/:subject_id/', getMCQsAnswers);


export default mcqRouter;