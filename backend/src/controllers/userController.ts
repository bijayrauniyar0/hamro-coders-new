// /controllers/userController.js
import { Request, Response } from 'express';
import User from '../models/userModels';
import bcrypt from 'bcryptjs';
import { AzureBlobService } from '../services/azureBlobService';

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
      attributes: {
        exclude: ['password', 'created_at', 'updated_at', 'blob_name'],
      },
    });
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

// Update user by ID
export const updateUser = async (req: Request, res: Response): Promise<any> => {
  try {
    // Validate user existence
    const user: User | null = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const { password, old_password, ...restValues } = req.body;
    const { file } = req;
    let fileResponse;

    // If there's a file, try to upload it to Azure
    if (file) {
      const azureService = new AzureBlobService();
      if (user.blob_name) {
        try {
          await azureService.deleteBlob(user.blob_name);
        } catch {
          res.status(500).json({
            message: 'Error updating profile picture',
          });
        }
      }

      const filePath = file.path;
      const blobName = `users/${Date.now()}-${file.originalname}`;

      try {
        const url = await azureService.uploadProfilePic(filePath, blobName);
        fileResponse = { url, blobName };
      } catch (error) {
        return res.status(500).json({
          message: 'Error uploading file to Azure Blob Storage',
          error,
        });
      }
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
      user.password = bcrypt.hashSync(password, 10); // Hash new password
    }

    if (fileResponse) {
      restValues.avatar = fileResponse.url;
      restValues.blob_name = fileResponse.blobName;
    }

    if (Object.keys(restValues).length > 0) {
      Object.assign(user, restValues); // Assign the rest of the values to the user object
      await user.save(); // Save updated user
    }

    return res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating user', error });
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
