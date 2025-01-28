// src/routes/userRoutes.ts
import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:id/', getUserById);
router.put('/:id/', updateUser);
router.delete('/:id/', deleteUser);

export default router;
