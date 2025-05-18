import { Server } from 'socket.io';
import { socketAuthMiddleware } from '../middlewares/authenticate';
import ChatController from '../controllers/discussionController';

export type SocketSendMessageType = {
  mock_test_id: string;
  message: string;
  messageId: string;
};
export const initializeSocket = (io: Server) => {
  io.use(socketAuthMiddleware);
  try {
    io.on('connection', socket => {
      socket.on('joinRoom', (mock_test_id: string) => {
        ChatController.handleJoinRoom(socket, mock_test_id);
      });

      socket.on(
        'sendMessage',
        ({ mock_test_id, message, messageId }: SocketSendMessageType) => {
          ChatController.handleSendMessage(
            socket,
            mock_test_id,
            message,
            messageId,
          );
        },
      );

      socket.on('disconnect', () => {
        socket.emit('disconnected', socket.id);
      });
      socket.on('connection_error', err =>
        ChatController.handleError(socket, err),
      );
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Socket error:', err);
  }
};
