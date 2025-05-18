import {
  getPerformanceDetails,
  getPerformanceTrend,
  getRadarMetrics,
  getRecentSessions,
  getUserScoresByMockTest,
  getUserStats,
  getUserStatsById,
} from '../controllers/userStatsController';
import express from 'express';
import { authenticate } from '../middlewares/authenticate';

const analyticsRouter = express.Router();

analyticsRouter.get('/stats/', authenticate, getUserStats);
analyticsRouter.get('/recent-sessions/', authenticate, getRecentSessions);
analyticsRouter.get(
  '/performance-details/',
  authenticate,
  getPerformanceDetails,
);
analyticsRouter.get('/performance-trend/', authenticate, getPerformanceTrend);
analyticsRouter.get('/radar-metrics/:user_id', getRadarMetrics);
analyticsRouter.get('/user-scores/:user_id', getUserScoresByMockTest);
analyticsRouter.get('/user-stats/:user_id', getUserStatsById);

export default analyticsRouter;
