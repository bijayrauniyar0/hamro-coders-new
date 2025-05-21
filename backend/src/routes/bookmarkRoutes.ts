import express from 'express';
import {
  getAllBookmarks,
  getBookmarkByMockTestId,
  toggleBookmark,
} from '../controllers/bookmarksController';
import { authenticate } from '../middlewares/authenticate';

const bookmarkRouter = express.Router();

bookmarkRouter.get('/', authenticate, getAllBookmarks);
bookmarkRouter.post('/toggle/:mock_test_id', authenticate, toggleBookmark);
bookmarkRouter.get('/:mock_test_id', authenticate, getBookmarkByMockTestId);

export default bookmarkRouter;
