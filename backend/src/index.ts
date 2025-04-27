// src/server.ts
import express from 'express';
import userRoutes from '@Routes/userRoutes';
import sequelize from './config/database';
import cors from 'cors';
import mcqRouter from '@Routes/mcqsRoutes';
import userScoresRouter from '@Routes/leaderboardRoutes';
import courseRouter from '@Routes/courseRoutes';
import notificationRouter from '@Routes/notificationRoutes';
import analyticsRouter from '@Routes/analyticsRoutes';

const PORT = process.env.PORT || 9000;

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

app.use('/api/user', userRoutes);
app.use('/api/mcq', mcqRouter);
app.use('/api/courses', courseRouter);
app.use('/api/leaderboard', userScoresRouter);
app.use('/api/notification', notificationRouter);
app.use('/api/analytics', analyticsRouter);

sequelize
  .authenticate()
  .then(() => {
    return sequelize.sync({ force: false });
  })
  .then(() => {
    app.listen(Number(PORT) || 9000, '0.0.0.0', () => {});
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to the database:', err);
  });
