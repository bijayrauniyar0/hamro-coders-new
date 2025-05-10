import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../../utils/jwtUtils';
import User from '../../models/userModels';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const token = req.cookies?.token;

  if (!token) {
    res.status(401).json({ message: 'Authentication token required' });
    return;
  }

  try {
    const decoded = verifyToken(token);

    if (!decoded || typeof decoded !== 'object' || !('id' in decoded)) {
      res.status(401).json({ message: 'Invalid token format' });
      return;
    }

    // Optional: fetch full user info (exclude password)
    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      res.status(401).json({ message: 'User not found' });
      return;
    }

    req.user = user; // Add user to request
    next();
  } catch {
    res.clearCookie('token');
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
