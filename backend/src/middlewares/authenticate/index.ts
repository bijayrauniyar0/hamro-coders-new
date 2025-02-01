import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@Utils/jwtUtils';

// Middleware to authenticate routes
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

  if (!token) {
    res.status(401).json({ message: 'Authentication token required' });
    return;
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // Attach decoded user data to the request object
    return next(); // Proceed to the next middleware
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
    return;
  }
};
