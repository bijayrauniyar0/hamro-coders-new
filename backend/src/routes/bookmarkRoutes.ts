import express from 'express';
import {
  getAllBookmarks,
  toggleBookmark,
} from '../controllers/bookmarksController';
import { authenticate } from '../middlewares/authenticate';

const bookmarkRouter = express.Router();

bookmarkRouter.get('/', authenticate, getAllBookmarks);
bookmarkRouter.post('/toggle/:mock_test_id', authenticate, toggleBookmark);

export default bookmarkRouter;