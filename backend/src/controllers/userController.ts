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

