import Notification from '@Models/notificationModel';
import { Request, Response } from 'express';

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const notifications = await Notification.findAll({
      where: { user_id: 20 },
    });
    res.status(200).json(notifications);
  } catch {
    res.status(500).json({ message: 'Error fetching notifications' });
  }
};

export const markNotificationAsRead = async (req: Request, res: Response) => {
  const { notificationId } = req.params;
  try {
    await Notification.update(
      { is_read: true },
      { where: { id: notificationId, userId: req.user.id } },
    );
    res.status(200).json({ message: 'Notification marked as read' });
  } catch {
    res.status(500).json({ message: 'Error marking notification as read' });
  }
};

export const markAllNotificationsAsRead = async (
  req: Request,
  res: Response,
) => {
  try {
    await Notification.update(
      { is_read: true },
      { where: { userId: req.user.id, is_read: false } },
    );
    res.status(200).json({ message: 'All notifications marked as read' });
  } catch {
    res
      .status(500)
      .json({ message: 'Error marking all notifications as read' });
  }
};
