import Express from 'express';
import {
  checkIfEmailExists,
  checkLogin,
  createUser,
  forgotPassword,
  googleAuthCallback,
  googleAuthRedirect,
  loginController,
  logoutController,
  resendVerificationEmail,
  resetForgotPassword,
  verifyEmail,
} from '../controllers/authControllers';
import { authenticate } from '../middlewares/authenticate';

const authRouter = Express.Router();

authRouter.get('/google', googleAuthRedirect);
authRouter.get('/google/callback', googleAuthCallback);
authRouter.post('/signup/', createUser);
authRouter.post('/login/', loginController);
authRouter.get('/check-login/', authenticate, checkLogin);
authRouter.post('/log-out/', authenticate, logoutController);
authRouter.post('/verify-email', verifyEmail);
authRouter.post('/resend-verification-mail', resendVerificationEmail);
authRouter.post('/check-email-exists', checkIfEmailExists);
authRouter.get('/forgot-password', forgotPassword);
authRouter.get('/reset-forgot-password', resetForgotPassword);

export default authRouter;
