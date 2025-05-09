import express from 'express';
import { getPrivateImage } from '../controllers/privateImageController';
const privateImageRouter = express.Router();

privateImageRouter.get('/image/:fileId', getPrivateImage);

export default privateImageRouter;
