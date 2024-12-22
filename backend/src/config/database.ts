// /config/database.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Ensure 'port' is correctly converted to a number
const sequelize = new Sequelize({
  host: process.env.DB_HOST || 'hamrocoders-sql-db',
  port: parseInt(process.env.DB_PORT || '5432', 10), // Convert to number here
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialect: 'postgres',
//   logging: false, // Turn off logging for production
});

export default sequelize;
