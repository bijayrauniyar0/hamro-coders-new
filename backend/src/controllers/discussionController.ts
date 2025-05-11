// src/controllers/chatController.ts
import { Socket } from 'socket.io';
import Discussion from '../models/discussionModel';
import User from '../models/userModels';
import { Request, Response } from 'express';
import { Op } from 'sequelize';

export class ChatController {
  // Handles a user joining a room and retrieving historical messages
  static async handleJoinRoom(socket: Socket, mock_test_id: string) {
    try {
      socket.join(mock_test_id);

      const messages = await Discussion.findAll({
        where: { mock_test_id: +mock_test_id },
        order: [['created_at', 'ASC']],
      });

      socket.emit('historyMessages', messages);
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
        user: userData,
        messageId,
      };
      socket.to(mock_test_id).emit('receiveMessage', messagePayload);
    } catch {
      // Handle error
    }
  }
  static handleDisconnect(socket: Socket) {
    // eslint-disable-next-line no-console
    console.log(`User disconnected: ${socket.id}`, socket.data.user.id);
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

export default ChatController;
