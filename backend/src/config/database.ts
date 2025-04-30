// /config/database.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import pg from 'pg';
dotenv.config();

// Ensure 'port' is correctly converted to a number
const sequelize = new Sequelize(
  'postgresql://neondb_owner:npg_BAao2jLMCFQ6@ep-still-paper-a80p9o3b-pooler.eastus2.azure.neon.tech/hamrocoders?sslmode=require',
  {
    dialect: 'postgres',
    timezone: '+05:45',
    dialectModule: pg,
  },
);

export default sequelize;
