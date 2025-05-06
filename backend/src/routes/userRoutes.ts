// src/routes/userRoutes.ts
import express from 'express';
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  loginController,
  checkLogin,
  getUserProfile,
  verifyEmail,
} from '../controllers/userController';
import { authenticate } from '../middlewares/authenticate';
import { getMockTestsTakenByUser } from '../controllers/userScoresController';

const userRouter = express.Router();

userRouter.post('/signup/', createUser);
userRouter.post('/login/', loginController);
userRouter.get('/check-login/', authenticate, checkLogin);
userRouter.get('/profile/', authenticate, getUserProfile);
userRouter.get('/', authenticate, getAllUsers);
userRouter.patch('/update/profile/', authenticate, updateUser);
userRouter.patch('/change-password/', authenticate, updateUser);
userRouter.delete('/:id/', authenticate, deleteUser);
// @ts-ignore
userRouter.get('/verify-email', verifyEmail);
userRouter.get('/me/mock-tests/', authenticate, getMockTestsTakenByUser);

export default userRouter;
