// /config/database.js
import { Sequelize } from 'sequelize';

import pg from 'pg';
import { DB_CONNECTION } from '../constants';

if (!DB_CONNECTION) {
  throw new Error('Environment variable DB_CONNECTION is not set');
}
const sequelize = new Sequelize(DB_CONNECTION || '', {
  dialect: 'postgres',
  timezone: '+05:45',
  dialectModule: pg,
});

export default sequelize;
