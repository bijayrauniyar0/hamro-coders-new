// /controllers/userController.js
import { Request, Response } from 'express';
import User from '../models/userModels';
import bcrypt from 'bcryptjs';
import { generateToken, verifyToken } from '@Utils/jwtUtils';
import { sendVerificationEmail } from '@Utils/mailer';
import path from 'path';

class UserService {
  email: string;
  name: string;

  constructor(name: string, email: string) {
    this.email = email;
    this.name = name;
  }
  sendVerificationEmail = async (): Promise<any> => {
    const token = generateToken({ email: this.email, name: this.name }, 300);

    const verificationLink = `http://localhost:9000/api/user/verify-email?token=${token}`;
    await sendVerificationEmail(this.email, this.name, verificationLink);
  };
}
// Get all users
export const getAllUsers = async (_: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Get user by ID
export const getUserProfile = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const { user } = req;
    const userData = await User.findOne({
      where: { id: user.id },
      attributes: { exclude: ['password', 'created_at', 'updated_at'] },
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
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
    } catch {
      res.status(500).json({ message: 'Failed to send email' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

// Update user by ID
export const updateUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { password, old_password, ...restValues } = req.body;
    const payload: Partial<User> = { ...restValues };
    const user: User | null = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if ((old_password || password) && (!old_password || !password)) {
      return res.status(400).json({
        message:
          'Both old password and new password are required to change the password',
      });
    }
    if (old_password && password) {
      const isPasswordValid = await bcrypt.compare(old_password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid old password' });
      }
      user.password = bcrypt.hashSync(password, 10);
    }
    Object.assign(user, payload);
    await user.save();
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

// Delete user by ID
export const deleteUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
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
    if(!user.verified){
      res.status(401).json({
        message: 'User not verified. Please check your email for verification.',
        verified: false,
      });
      return;
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid credentials.' });
      return;
    }
    const token = generateToken({ id: user.id, ...req.body }, '24h');
    if (!token) {
      res.status(500).json({ message: 'Error Logging In' });
      return;
    }
    res.status(200).json({
      message: 'Login successful.',
      token,
      user_id: user.id,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.', error });
  }
};

export const checkLogin = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const user = await User.findByPk(id);
    if (id && user) {
      res.status(200).json({ message: 'User is logged in', id });
      return;
    }
    res.status(401).json({ message: 'User is not logged in' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.', error });
  }
};

export const verifyEmail = async (
  req: Request<unknown, unknown, unknown, { token: string }>,
  res: Response,
) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }
    const decoded = verifyToken(token);
    if (typeof decoded !== 'object' || !decoded) {
      res.sendFile(
        path.join(__dirname, '../../public/verificationFailed.html'),
      );
      return;
    }
    const { email } = decoded;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.sendFile(
        path.join(__dirname, '../../public/verificationFailed.html'),
      );
      return;
    }
    user.verified = true;
    await user.save();
    res.sendFile(path.join(__dirname, '../../public/verificationSuccess.html'));
  } catch (error) {
    res.status(500).json({ message: 'Error verifying email', error });
  }
};

export const resendVerificationEmail = async (
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
    if (user.verified) {
      res.status(400).json({ message: 'User already verified' });
      return;
    }
    const userService = new UserService(user.name, user.email);
    await userService.sendVerificationEmail();
    res.status(200).json({
      message: 'Verification email resent successfully',
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error sending verification email', error });
  }
};
