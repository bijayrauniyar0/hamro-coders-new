// /config/database.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();
// Ensure 'port' is correctly converted to a number
const sequelize = new Sequelize({
  host: process.env.DB_HOST || 'hamrocoders-sql-db',
  port: parseInt(process.env.DB_PORT || '5432', 10), // Convert to number here
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialect: 'postgres',
  timezone: '+05:45',
  dialectModule: pg,
  ssl: true,
});

export default sequelize;
