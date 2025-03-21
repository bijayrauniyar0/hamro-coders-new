// src/server.ts
import express from 'express';
import userRoutes from '@Routes/userRoutes';
import sequelize from './config/database';
import cors from 'cors';
import mcqRouter from '@Routes/mcqsRoutes';
import academicsRouter from '@Routes/academicRoutes';
import userScoresRouter from '@Routes/leaderboardRoutes';

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

const port = 9000;

app.use('/api/user', userRoutes);
app.use('/api/mcq', mcqRouter);
app.use('/api/academics', academicsRouter);
app.use('/api/leaderboard', userScoresRouter);

sequelize.authenticate();

sequelize.sync({ force: false }).then(() => {
  app.listen(port);
});
