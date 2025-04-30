import {
  getNotifications,
  getUnreadNotificationCount,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from '../controllers/notificationController';
import express from 'express';
import { authenticate } from '../middlewares/authenticate';

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
