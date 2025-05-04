// /config/database.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

// Ensure 'port' is correctly converted to a number
const sequelize = new Sequelize(process.env.DB_CONNECTION || '', {
  port: parseInt(process.env.DB_PORT || '5432', 10), // Convert to number here
  dialect: 'postgres',
  timezone: '+05:45',
  dialectModule: pg,
});

export default sequelize;
