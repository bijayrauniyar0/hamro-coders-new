import Express from 'express';
import {
  checkLogin,
  createUser,
  googleAuthCallback,
  googleAuthRedirect,
  loginController,
  logoutController,
} from '../controllers/authControllers';
import { authenticate } from '../middlewares/authenticate';

const authRouter = Express.Router();

authRouter.get('/google', googleAuthRedirect);
authRouter.get('/google/callback', googleAuthCallback);
authRouter.post('/signup/', createUser);
authRouter.post('/login/', loginController);
authRouter.get('/check-login/', authenticate, checkLogin);
authRouter.post('/log-out/', authenticate, logoutController);

export default authRouter;
