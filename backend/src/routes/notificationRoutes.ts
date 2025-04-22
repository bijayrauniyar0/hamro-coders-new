import {
  getNotifications,
  getUnreadNotificationCount,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from '@Controllers/notificationController';
import express from 'express';
import { authenticate } from 'src/middlewares/authenticate';

const notificationRouter = express.Router();

notificationRouter
  .get('/', authenticate, getNotifications)
  .post('/', authenticate, markAllNotificationsAsRead);

notificationRouter.get(
  '/unread-count/',
  authenticate,
  getUnreadNotificationCount,
);
notificationRouter.post(
  '/:notificationId/',
  authenticate,
  markNotificationAsRead,
);

export default notificationRouter;
