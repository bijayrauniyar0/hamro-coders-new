import {
  createScoreEntry,
  getLeaderboard,
} from '@Controllers/leaderboardController';
import express from 'express';
import { authenticate } from 'src/middlewares/authenticate';

const userScoresRouter = express.Router();

userScoresRouter.post('/', authenticate, createScoreEntry);
userScoresRouter.get('/rank/', authenticate, getLeaderboard);

export default userScoresRouter;
