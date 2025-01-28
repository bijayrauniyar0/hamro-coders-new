import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModels'; // Update the alias/path based on your structure

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

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

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid credentials.' });
      return;
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h',
    });

    // Respond with token
    res.status(200).json({
      message: 'Login successful.',
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};
