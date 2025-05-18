// src/routes/userRoutes.ts
import express from 'express';
import {
  getAllUsers,
  updateUser,
  deleteUser,
  getUserProfile,
  getPublicUserProfileById,
} from '../controllers/userController';
import { authenticate } from '../middlewares/authenticate';
import { getMockTestsTakenByUser } from '../controllers/userScoresController';
import multer from 'multer';

const userRouter = express.Router();

const upload = multer({
  dest: '/',
  limits: { fileSize: 1024 * 1024 },
});

// Authenticated user routes
userRouter.get('/profile', authenticate, getUserProfile);
userRouter.delete('/profile', authenticate, deleteUser);
userRouter.patch('/profile', authenticate, upload.single('avatar'), updateUser);
userRouter.patch('/profile/change-password', authenticate, updateUser);
userRouter.get('/profile/mock-tests', authenticate, getMockTestsTakenByUser);

// Public or admin routes
userRouter.get('/:user_id', getPublicUserProfileById);
userRouter.get('/', getAllUsers); // Consider adding admin middleware if needed

export default userRouter;
