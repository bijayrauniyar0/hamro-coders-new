// src/server.ts
import express from 'express';
import userRoutes from '@Routes/userRoutes';
import sequelize from './config/database';
import cors from 'cors';
import mcqRouter from '@Routes/mcqsRoutes';
import userScoresRouter from '@Routes/leaderboardRoutes';
import courseRouter from '@Routes/courseRoutes';
import notificationRouter from '@Routes/notificationRoutes';

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

const port = 9000;

app.use('/api/user', userRoutes);
app.use('/api/mcq', mcqRouter);
app.use('/api/courses', courseRouter);
app.use('/api/leaderboard', userScoresRouter);
app.use('/api/notification', notificationRouter);

sequelize.authenticate();

sequelize.sync({ force: false }).then(() => {
  app.listen(port);
});
