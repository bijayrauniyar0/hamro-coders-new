// src/server.ts
import express from 'express';
import userRoutes from '@Routes/userRoutes';
import sequelize from './config/database';
import cors from 'cors';
import mcqRouter from '@Routes/mcqsRoutes';
import academicsRouter from '@Routes/academicRoutes';

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

const port = 9000;

app.use('/api/user', userRoutes);
app.use('/api/mcq', mcqRouter);
app.use('/api/academics', academicsRouter);

sequelize.authenticate();

sequelize.sync().then(() => {
  app.listen(port);
});
