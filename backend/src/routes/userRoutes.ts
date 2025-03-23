// src/routes/userRoutes.ts
import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginController,
  checkLogin,
} from '../controllers/userController';
import { authenticate } from 'src/middlewares/authenticate';

const userRouter = express.Router();

userRouter.post('/signup/', createUser);
userRouter.post('/login/', loginController);
userRouter.get('/check-login/', authenticate, checkLogin);
userRouter.get('/:id/', authenticate, getUserById);
userRouter.get('/', authenticate, getAllUsers);
userRouter.put('/edit-user/:id/', authenticate, updateUser);
userRouter.delete('/:id/', authenticate, deleteUser);

export default userRouter;
