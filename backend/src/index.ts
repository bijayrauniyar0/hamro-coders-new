/* eslint-disable no-console */
// src/index.ts
import http from 'http';
import { Server } from 'socket.io';
import app from './server';
import { CORS_ORIGIN, PORT } from './constants';
import sequelize from './config/database';
import { initializeSocket } from './sockets';

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: CORS_ORIGIN?.split(',') ,
    credentials: true,
  },
});

sequelize
.authenticate()
.then(() => {
  return sequelize.sync({ force: false });
})
.then(() => {
    initializeSocket(io);
    httpServer.listen(Number(PORT) || 9000, '0.0.0.0', () => {});
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
