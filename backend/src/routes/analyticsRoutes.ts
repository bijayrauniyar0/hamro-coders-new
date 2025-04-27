import {
  getPerformanceDetails,
  getPerformanceTrend,
  getRecentSessions,
  getUserStats,
} from '@Controllers/userStatsController';
import express from 'express';
import { authenticate } from 'src/middlewares/authenticate';

const analyticsRouter = express.Router();

analyticsRouter.get('/stats/', authenticate, getUserStats);
analyticsRouter.get('/recent-sessions/', authenticate, getRecentSessions);
analyticsRouter.get(
  '/performance-details/',
  authenticate,
  getPerformanceDetails,
);
analyticsRouter.get('/performance-trend/', authenticate, getPerformanceTrend);

export default analyticsRouter;
