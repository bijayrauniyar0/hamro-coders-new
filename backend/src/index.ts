// src/server.ts
import express from 'express';
import userRoutes from './routes/userRoutes';
import sequelize from './config/database';

const app = express();
app.use(express.json()); // Middleware to parse JSON requests
const port = 9000;
// Use the routes
app.use('/api', userRoutes);

// Test database connection
sequelize
  .authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Error connecting to the database:', err));

// Sync models and start server
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
