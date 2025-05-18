// src/controllers/chatController.ts
import { Socket } from 'socket.io';
import Discussion from '../models/discussionModel';
import User from '../models/userModels';
import { Request, Response } from 'express';
import { Op } from 'sequelize';

export class ChatController {
  static async handleJoinRoom(socket: Socket, mock_test_id: string) {
    try {
      socket.join(mock_test_id);
    } catch {
      // Handle error
    }
  }
  static async handleSendMessage(
    socket: Socket,
    mock_test_id: string,
    message: string,
    messageId: string,
  ) {
    try {
      const user = socket.data.user;
      const newMessage = await Discussion.create({
        mock_test_id: +mock_test_id,
        message,
        user_id: +user.id,
      });
      const userData = await User.findOne({
        where: { id: user.id },
        attributes: ['id', 'name', 'avatar'],
        raw: true,
      });
      const messagePayload = {
        message: newMessage.message,
        User: userData,
        messageId,
        status: 'delivered',
        created_at: newMessage.created_at,
        id: newMessage.id,
      };
      socket.to(mock_test_id).emit('receiveMessage', messagePayload);
      socket.emit('messageDelivered', messageId);
    } catch {
      socket.emit('messageError', messageId);
    }
  }
  static handleDisconnect(socket: Socket) {
    // eslint-disable-next-line no-console
    console.log(`User disconnected: ${socket.id}`, socket.data.user.id);
  }
  static handleError(socket: Socket, error: any) {
    // eslint-disable-next-line no-console
    console.error(`Socket error: ${error}`);
    socket.emit('error', 'An error occurred');
  }
}

export const getAllUsersInChat = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { mock_test_id } = req.params;
    const users = await User.findAll({
      attributes: ['id', 'name', 'avatar'],
      include: [
        {
          model: Discussion,
          where: { mock_test_id: +mock_test_id },
          attributes: [],
        },
      ],
      where: {
        id: {
          [Op.ne]: userId, // Exclude current user
        },
      },
      group: ['User.id'],
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', err });
  }
};
export const getHistoryDiscussions = async (req: Request, res: Response) => {
  try {
    const { mock_test_id } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const page_size = parseInt(req.query.page_size as string) || 20; // default 20 per page
    const offset = (page - 1) * page_size;

    const { rows: discussions, count: total } =
      await Discussion.findAndCountAll({
        where: { mock_test_id: +mock_test_id },
        attributes: ['message', 'created_at', 'id'],
        include: [
          {
            model: User,
            attributes: ['id', 'name', 'avatar'],
          },
        ],
        order: [['created_at', 'DESC']],
        offset,
        limit: page_size,
      });

    res.status(200).json({
      results: discussions,
      page,
      total,
      next_page: total > page * page_size ? page + 1 : null,
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', err });
  }
};

export default ChatController;
