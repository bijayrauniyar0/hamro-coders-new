import { Request, Response } from 'express';
import { google } from 'googleapis';
import { findOrCreateGoogleUser } from '../services/authService';
import dotenv from 'dotenv';
import User from '../models/userModels';
import bcrypt from 'bcryptjs';
import { UserService } from './userController';
import { generateToken, verifyToken } from '../utils/jwtUtils';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NODE_ENV } from '../constants';

dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID!,
  GOOGLE_CLIENT_SECRET!,
  'http://localhost:9000/api/auth/google/callback',
);

const SCOPES = ['profile', 'email'];

export class AuthService {
  async createUser({
    name,
    email,
    password,
    number,
  }: {
    name: string;
    email: string;
    password: string;
    number: string;
  }) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      number,
    });

    if (!newUser) {
      throw new Error('User creation failed');
    }
    return newUser;
  }
}
export const googleAuthRedirect = (req: Request, res: Response) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  res.redirect(url);
};

export const googleAuthCallback = async (req: Request, res: Response) => {
  try {
    const { code } = req.query;
    if (!code) {
      res.status(400).send('Missing code');
      return;
    }

    const { tokens } = await oauth2Client.getToken(code as string);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2('v2');
    const { data } = await oauth2.userinfo.get({ auth: oauth2Client });

    // Handle signup/login logic
    const user = await findOrCreateGoogleUser(data);
    const token = generateToken({ id: user.id, email: user.email }, '86h');
    // Store in cookie or session
    res.cookie('token', token, {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.redirect('http://localhost:3030/');
  } catch (err) {
    res.status(500).send({ message: 'Google Auth failed', err });
  }
};
// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, number } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      number,
    });

    if (!newUser) {
      res.status(400).json({ message: 'User creation failed' });
      return;
    }
    const userService = new UserService(name, email);
    try {
      await userService.sendVerificationEmail();
      res.status(201).json({
        message: 'User created successfully. Verification email sent.',
        user_id: newUser.id,
      });
    } catch (error) {
      res.status(500).json({ message: 'Failed to send email', details: error });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

export const loginController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required.' });
      return;
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    if (!user.verified) {
      res.status(401).json({
        message: 'User not verified. Please check your email for verification.',
        verified: false,
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid credentials.' });
      return;
    }

    const token = generateToken({ id: user.id, email: user.email }, '86h');
    if (!token) {
      res.status(500).json({ message: 'Error logging in.' });
      return;
    }

    res.cookie('token', token, {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    // eslint-disable-next-line no-unused-vars
    const { password: _, ...userWithoutPassword } = user.toJSON();
    res.status(200).json({
      message: 'Login successful',
      user: {
        ...userWithoutPassword,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.', error });
  }
};

export const checkLogin = async (req: Request, res: Response) => {
  const token = req.cookies.token; // token is stored in cookie
  if (!token) {
    res.status(401).json({ isAuthenticated: false });
    return;
  }

  try {
    const decoded = verifyToken(token);
    if (!decoded || typeof decoded === 'string' || !('id' in decoded)) {
      res.status(401).json({ isAuthenticated: false });
      return;
    }
    const userData = await User.findOne({
      where: { id: decoded.id },
      attributes: { exclude: ['password', 'created_at', 'updated_at'] },
    });
    res.status(200).json({ isAuthenticated: true, user: userData });

    return;
  } catch {
    res.clearCookie('token', {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: 'lax', // or 'none' for cross-origin
    });
    res.status(401).json({
      isAuthenticated: false,
      message: 'Session expired. Please log in again.',
    });
    return;
  }
};

export const getCurrentUser = (req: Request, res: Response) => {
  const user = req.cookies.user;
  if (user) {
    res.json(JSON.parse(user));
  } else {
    res.status(401).send('Not logged in');
  }
};

export const logoutController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: 'lax',
    });
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging out', error });
  }
};
