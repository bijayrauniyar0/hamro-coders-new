// src/server.ts
import express from 'express';
import userRoutes from './routes/userRoutes';
import sequelize from './config/database';
import cors from 'cors';
import mcqRouter from './routes/mcqsRoutes';
import userScoresRouter from './routes/leaderboardRoutes';
import streamRouter from './routes/streamRoutes';
import notificationRouter from './routes/notificationRoutes';
import analyticsRouter from './routes/analyticsRoutes';
import './models/testSectionLinkModel';
import authRouter from './routes/authRoutes';
import cookieParser from 'cookie-parser';
import { FRONTEND_URL, PORT } from './constants';
import testimonialRouter from './routes/testimonialsRoutes';
import privateImageRouter from './routes/privateImageRoutes';

const app = express();
app.set('view engine', 'ejs');
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  }),
);
app.use(cookieParser()); // Middleware to parse cookies
app.use(express.json()); // Middleware to parse JSON requests

app.use('/api/user', userRoutes);
app.use('/api/mcq', mcqRouter);
app.use('/api/streams', streamRouter);
app.use('/api/leaderboard', userScoresRouter);
app.use('/api/notification', notificationRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/auth', authRouter);
app.use('/api/testimonial', testimonialRouter);
app.use('/api/private', privateImageRouter);

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

export default app;
