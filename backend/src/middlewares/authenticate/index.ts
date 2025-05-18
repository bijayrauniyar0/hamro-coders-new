import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../../utils/jwtUtils';
import User from '../../models/userModels';
import { Socket } from 'socket.io';
import { decode } from 'punycode';

// eslint-disable-next-line no-unused-vars
type SocketNextFunction = (err?: Error) => void;

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

export const maybeAuthenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const token = req.cookies?.token;

  if (!token) {
    return next(); // No token — proceed as guest
  }

  try {
    const decoded = verifyToken(token);

    if (decoded && typeof decoded === 'object' && 'id' in decoded) {
      const user = await User.findByPk(decoded.id, {
        attributes: { exclude: ['password'] },
      });

      if (user) {
        req.user = user;
      }
    }
  } catch {
    // Don't throw or return — just skip setting req.user
  }
  next(); // Always continue to controller
};

export const socketAuthMiddleware = (
  socket: Socket,
  next: SocketNextFunction,
) => {
  try {
    const cookieHeader = socket.request.headers.cookie;
    console.log(cookieHeader);
    if (!cookieHeader) {
      next(new Error('Unauthorized: No cookie found'));
      return;
    }

    const token = cookieHeader.split('=')[1]; // access the token

    if (!token) {
      next(new Error('Unauthorized: No token found in cookies'));
      return;
    }
    const decoded = verifyToken(token);
    if (!decoded || typeof decoded !== 'object' || !('id' in decoded)) {
      next(new Error('Unauthorized: Invalid token format'));
      return;
    }
    socket.data.user = decoded;
    console.log(decoded);
    next();
  } catch (error) {
    console.error('Socket authentication error:', error);
    next(new Error('Unauthorized: Invalid token or cookie parsing error'));
    return;
  }
};
