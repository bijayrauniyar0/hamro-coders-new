import { getMCQs, getMCQsAnswers } from '../controllers/mcqsController';
import express from 'express';
import { authenticate } from '../middlewares/authenticate';

const mcqRouter = express.Router();

mcqRouter.get('/questions/:test_id/', authenticate, getMCQs);
mcqRouter.get('/answers/', getMCQsAnswers);

export default mcqRouter;
