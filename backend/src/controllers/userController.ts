// /controllers/userController.js
import { Request, Response } from 'express';
import User from '../models/userModels';
import bcrypt from 'bcryptjs';

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
export const getUserById = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
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
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

// Update user by ID
export const updateUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;
    await user.save();
    res.status(200).json(user);
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
