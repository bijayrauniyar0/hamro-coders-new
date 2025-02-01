// src/routes/userRoutes.ts
import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginController,
} from '../controllers/userController';
import { authenticate } from 'src/middlewares/authenticate';

const userRouter = express.Router();

userRouter.post('/login/', loginController);
userRouter.post('/signup/', createUser);
userRouter.get('/', authenticate, getAllUsers);
userRouter.get('/:id/', authenticate, getUserById);
userRouter.put('/edit-user/:id/', authenticate, updateUser);
userRouter.delete('/:id/', authenticate, deleteUser);

export default userRouter;
