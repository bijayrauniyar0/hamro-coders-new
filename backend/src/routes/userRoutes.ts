// src/routes/userRoutes.ts
import express from 'express';
import {
  getAllUsers,
  updateUser,
  deleteUser,
  getUserProfile,
} from '../controllers/userController';
import { authenticate } from '../middlewares/authenticate';
import { getMockTestsTakenByUser } from '../controllers/userScoresController';
import multer from 'multer';

const userRouter = express.Router();

const upload = multer({
  dest: '/',
  limits: { fileSize: 1024 * 1024 },
});

userRouter.get('/profile/', authenticate, getUserProfile);
userRouter.get('/', authenticate, getAllUsers);
userRouter.patch(
  '/update/profile/',
  authenticate,
  upload.single('avatar'),
  updateUser,
);
userRouter.patch('/change-password/', authenticate, updateUser);
userRouter.delete('/:id/', authenticate, deleteUser);
userRouter.get('/me/mock-tests/', authenticate, getMockTestsTakenByUser);

export default userRouter;
