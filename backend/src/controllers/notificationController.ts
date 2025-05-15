import Notification from '../models/notificationModel';
import { Request, Response } from 'express';

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const { filter } = req.query;
    const notifications = await Notification.findAll({
      where: {
        user_id: req.user.id,
        ...(filter === 'unread' && { is_read: false }),
      },
    });
    res.status(200).json(notifications);
  } catch {
    res.status(500).json({ message: 'Error fetching notifications' });
  }
};

export const getUnreadNotificationCount = async (
  req: Request,
  res: Response,
) => {
  try {
    const count = await Notification.count({
      where: { user_id: req.user.id, is_read: false },
    });
    res.status(200).json({ count });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching unread notification count', error });
  }
};

export const markNotificationAsRead = async (req: Request, res: Response) => {
  const { notificationId } = req.params;
  try {
    await Notification.update(
      { is_read: true },
      { where: { id: notificationId, user_id: req.user.id } },
    );
    res.status(200).json({ message: 'Notification marked as read' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error marking notification as read', error });
  }
};

export const markAllNotificationsAsRead = async (
  req: Request,
  res: Response,
) => {
  try {
    await Notification.update(
      { is_read: true },
      { where: { user_id: req.user.id, is_read: false } },
    );
    res.status(200).json({ message: 'All notifications marked as read' });
  } catch {
    res
      .status(500)
      .json({ message: 'Error marking all notifications as read' });
  }
};
