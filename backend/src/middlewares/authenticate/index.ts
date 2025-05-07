import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../../utils/jwtUtils';

// Middleware to authenticate routes
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.cookies?.token;

  if (!token) {
    res.status(401).json({ message: 'Authentication token required' });
    return;
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded as Record<string, any>; // Attach decoded user data to the request object
    return next(); // Proceed to the next middleware
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
    return;
  }
};
