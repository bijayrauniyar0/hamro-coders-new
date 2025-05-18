// src/server.ts
import express from 'express';
import userRoutes from './routes/userRoutes';
import cors from 'cors';
import mcqRouter from './routes/mcqsRoutes';
import userScoresRouter from './routes/leaderboardRoutes';
import streamRouter from './routes/streamRoutes';
import notificationRouter from './routes/notificationRoutes';
import analyticsRouter from './routes/analyticsRoutes';
import './models/testSectionLinkModel';
import authRouter from './routes/authRoutes';
import cookieParser from 'cookie-parser';
import testimonialRouter from './routes/testimonialsRoutes';
import privateImageRouter from './routes/privateImageRoutes';
import bookmarkRouter from './routes/bookmarkRoutes';
import discussionRouter from './routes/discussionRoutes';
import './models/discussionMentions';
import { CORS_ORIGIN } from './constants';

const app = express();

app.set('view engine', 'ejs');
app.use(
  cors({
    origin: CORS_ORIGIN?.split(' '),
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
app.use('/api/bookmarks', bookmarkRouter);
app.use('/api/discussions', discussionRouter);

export default app;
