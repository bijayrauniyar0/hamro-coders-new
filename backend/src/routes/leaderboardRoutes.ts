import {
  createScoreEntry,
  getLeaderboard,
} from '../controllers/userScoresController';
import express from 'express';
import { authenticate } from '..//middlewares/authenticate';

const userScoresRouter = express.Router();

userScoresRouter.post('/', authenticate, createScoreEntry);
userScoresRouter.get('/rank/', authenticate, getLeaderboard);

export default userScoresRouter;
