import { Request, Response } from 'express';
import { google } from 'googleapis';
import { findOrCreateGoogleUser } from '../services/authService';
import dotenv from 'dotenv';
import User from '../models/userModels';
import bcrypt from 'bcryptjs';
import { generateToken, verifyToken } from '../utils/jwtUtils';
import {
  FRONTEND_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
  NODE_ENV,
} from '../constants';
import { sendEmail } from '../utils/mailer';
import path from 'path';
import ejs from 'ejs';

dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID!,
  GOOGLE_CLIENT_SECRET!,
  GOOGLE_REDIRECT_URI!,
);

const SCOPES = ['profile', 'email'];

export class AuthService {
  name: string;
  email: string;
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
  private generateToken = (payload: object, expiresIn: number) => {
    return generateToken(payload, expiresIn);
  };
  sendVerificationEmail = async (): Promise<any> => {
    const token = this.generateToken(
      { email: this.email, name: this.name },
      300,
    );

    const templatePath = path.join(
      process.cwd(),
      'src',
      'templates',
      'emailVerification.ejs',
    );
    const verificationLink = `${FRONTEND_URL}/email-verification/${token}`;
    const verificationTemplate = await ejs.renderFile(templatePath, {
      verificationLink: verificationLink,
      currentYear: new Date().getFullYear(),
      userName: this.name,
      expiryTime: '30 minutes',
    });
    await sendEmail(this.email, verificationTemplate);
  };
  sendPasswordResetEmail = async (): Promise<any> => {
    const token = this.generateToken(
      { email: this.email, name: this.name },
      1200,
    );
    const templatePath = path.join(
      process.cwd(),
      'src',
      'templates',
      'resetPassword.ejs',
    );
    const resetLink = `${FRONTEND_URL}/reset-password/${token}`;
    const resetTemplate = await ejs.renderFile(templatePath, {
      resetLink: resetLink,
      currentYear: new Date().getFullYear(),
      userName: this.name,
      expiryTime: '10 minutes',
    });
    await sendEmail(this.email, resetTemplate);
  };
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
    res.redirect(FRONTEND_URL!);
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
    const userService = new AuthService(name, email);
    try {
      await userService.sendVerificationEmail();
      res.status(201).json({
        message: 'User created successfully. Verification email sent.',
        user_id: 20,
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
  const user = req.user;
  if (!user) {
    res.status(401).json({ isAuthenticated: false });
    return;
  }
  res.status(200).json({
    isAuthenticated: true,
  });
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

export const verifyEmail = async (
  req: Request<unknown, unknown, { token: string }, unknown>,
  res: Response,
) => {
  try {
    const { token } = req.body;
    if (!token) {
      res.status(400).json({ message: 'Token is required' });
      return;
    }
    const decoded = verifyToken(token);
    if (typeof decoded !== 'object' || !decoded) {
      res
        .status(400)
        .json({ message: 'Invalid token', verificationStatus: 'failed' });
      return;
    }
    const { email } = decoded;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res
        .status(400)
        .json({ message: 'Invalid User', verificationStatus: 'failed' });
      return;
    }
    user.verified = true;
    const isUserVerified = await user.save();
    if (!isUserVerified) {
      res.status(400).json({
        message: 'Error Verifying Email',
        verificationStatus: 'failed',
      });

      return;
    }
    res.status(200).json({
      message: 'Email verified successfully',
      verificationStatus: 'success',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying email', error });
  }
};

export const resendVerificationEmail = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { email: reqEmail, token } = req.body;

    if (!reqEmail && !token) {
      res.status(400).json({
        isVerified: false,
        userFound: false,
        message: 'Either name & email or token is required.',
      });
      return;
    }
    let email = reqEmail;
    if (token) {
      const decoded = verifyToken(token);
      if (typeof decoded !== 'object' || !decoded) {
        res.status(400).json({
          isVerified: false,
          userFound: false,
          message: 'Invalid token.',
        });
        return;
      }
      email = decoded.email;
    }

    // Check if user exists in the database
    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(404).json({
        isVerified: false,
        userFound: false,
        message: 'User not found.',
      });
      return;
    }

    // Check if the user is already verified
    if (user.verified) {
      res.status(400).json({
        isVerified: true,
        userFound: true,
        message: 'User already verified.',
      });
      return;
    }

    const userService = new AuthService(user.name, user.email);

    try {
      await userService.sendVerificationEmail();
      res.status(200).json({
        isVerified: false,
        userFound: true,
        message: 'Verification email resent successfully!',
      });
      return;
    } catch {
      res.status(500).json({
        isVerified: false,
        userFound: true,
        message: 'Failed to send verification email.',
      });
      return;
    }
  } catch {
    res.status(500).json({
      isVerified: false,
      userFound: false,
      message: 'An unexpected error occurred. Please try again later.',
    });
    return;
  }
};

export const checkIfEmailExists = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ message: 'Email is required' });
      return;
    }
    const user = await User.findOne({ where: { email } });
    if (user) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ message: 'Email is required' });
      return;
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    const userService = new AuthService(user.name, user.email);

    try {
      await userService.sendPasswordResetEmail();
      res.status(200).json({
        message: 'Password Reset email sent successfully!',
      });
      return;
    } catch (error) {
      res.status(500).json({
        message: 'Failed to send password reset link.',
        error,
      });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

export const resetForgotPassword = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { token, password } = req.body;
    if (!token || !password) {
      res.status(400).json({ message: 'Token and password are required' });
      return;
    }
    const decoded = verifyToken(token);
    if (typeof decoded !== 'object' || !decoded) {
      res.status(400).json({ message: 'Invalid token' });
      return;
    }
    const { email } = decoded;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};
