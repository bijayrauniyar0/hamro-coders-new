import {
  getNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from '@Controllers/notificationController';
import express from 'express';
import { authenticate } from 'src/middlewares/authenticate';

const notificationRouter = express.Router();

notificationRouter
  .get('/', getNotifications)
  .post('/', authenticate, markAllNotificationsAsRead);
notificationRouter.post(
  '/:notificationId/',
  authenticate,
  markNotificationAsRead,
);

export default notificationRouter;