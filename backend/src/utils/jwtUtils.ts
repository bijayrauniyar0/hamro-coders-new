import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

// Generate JWT
export const generateToken = (user: Record<string, any>) => {
  if (!secret) return null;
  return jwt.sign(user, secret, { expiresIn: '300h' });
};

// Verify JWT
export const verifyToken = (token: string) => {
  try {
    if (!secret) return null;
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
};
