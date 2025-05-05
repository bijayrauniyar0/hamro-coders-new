// /config/database.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();
// Ensure 'port' is correctly converted to a number
if (!process.env.DB_CONNECTION) {
  throw new Error("Environment variable DB_CONNECTION is not set");
}
const sequelize = new Sequelize(process.env.DB_CONNECTION || '', {
  dialect: 'postgres',
  timezone: '+05:45',
  dialectModule: pg,
});

export default sequelize;
