import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants';

// Generate JWT
export const generateToken = (
  user: Record<string, any>,
  expiresIn: number | string = 60,
) => {
  if (!JWT_SECRET) return null;
  return jwt.sign(user, JWT_SECRET, { expiresIn: expiresIn });
};

// Verify JWT
export const verifyToken = (token: string) => {
  try {
    if (!JWT_SECRET) return null;
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
};
