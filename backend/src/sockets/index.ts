import { Server } from 'socket.io';
import { socketAuthMiddleware } from '../middlewares/authenticate';
import ChatController from '../controllers/discussionController';

export const initializeSocket = (io: Server) => {
  io.use(socketAuthMiddleware);

  io.on('connection', socket => {
    socket.on('joinRoom', (mock_test_id: string) => {
      ChatController.handleJoinRoom(socket, mock_test_id);
    });

    socket.on(
      'sendMessage',
      ({ mock_test_id, message }: { mock_test_id: string; message: string }) => {
        ChatController.handleSendMessage(socket, mock_test_id, message);
      },
    );

    socket.on('disconnect', () => {
      ChatController.handleDisconnect(socket);
    });
  });
};
