// src/server.ts
import express from 'express';
import userRoutes from '@Routes/userRoutes';
import sequelize from './config/database';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

const port = 9000;

app.use('/api/user', userRoutes);

sequelize.authenticate();

sequelize.sync().then(() => {
  app.listen(port);
});
