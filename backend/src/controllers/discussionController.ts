/* eslint-disable no-console */
// src/controllers/chatController.ts
import { Socket } from 'socket.io';
import Discussion from '../models/discussionModel';

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
    } catch (error) {
      console.error('Error in handleJoinRoom:', error);
    }
  }
  static async handleSendMessage(
    socket: Socket,
    mock_test_id: string,
    message: string,
  ) {
    try {
      const user = socket.data.user;
      console.log(user);
      const newMessage = await Discussion.create({
        mock_test_id: +mock_test_id,
        message,
        user_id: +user.id,
      });

      socket.to(mock_test_id).emit('receiveMessage', {
        message: newMessage.message,
        user: newMessage.user_id,
      });
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
    }
  }
  static handleDisconnect(socket: Socket) {
    console.log(`User disconnected: ${socket.id}`);
  }
}

export default ChatController;
