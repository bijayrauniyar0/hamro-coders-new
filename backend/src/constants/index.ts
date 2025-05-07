import dotenv from 'dotenv';
dotenv.config();

export const BASE_URL = process.env.BASE_URL;
export const FRONTEND_URL = process.env.FRONTEND_URL;
export const DB_CONNECTION = process.env.DB_CONNECTION;
export const EMAIL_PW = process.env.EMAIL_PW;
export const EMAIL_ID = process.env.EMAIL_ID;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const JWT_SECRET = process.env.JWT_SECRET;
export const PORT = process.env.PORT;
export const NODE_ENV = process.env.NODE_ENV;
