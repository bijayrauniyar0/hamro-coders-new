import express from 'express';
import { authenticate } from '../middlewares/authenticate';
import { getAllUsersInChat } from '../controllers/discussionController';

const discussionRouter = express.Router();

discussionRouter.get('/:mock_test_id', authenticate, getAllUsersInChat);

export default discussionRouter;