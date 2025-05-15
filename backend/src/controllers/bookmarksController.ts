import { Request, Response } from 'express';
import Bookmark from '../models/bookmarksModel';
import MockTest from '../models/mockTestModel';
import Stream from '../models/streamModels';

export const getAllBookmarks = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const bookmarks = await Bookmark.findAll({
      where: { user_id: userId },
      include: [
        {
          model: MockTest,
          attributes: ['id', 'title', 'time_limit'],
          include: [
            {
              model: Stream,
              attributes: ['name'],
            },
          ],
        },
      ],
    });

    if (!bookmarks) {
      res.status(404).json({ message: 'No bookmarks found' });
      return;
    }

    const formattedBookmarks = bookmarks.map(bookmark => ({
      id: bookmark.id,
      mock_test_id: bookmark.mock_test_id,
      title: bookmark.MockTest.title,
      time_limit: bookmark.MockTest.time_limit,
      stream_name: bookmark.MockTest.Stream.name,
    }));

    res.status(200).json(formattedBookmarks);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

export const toggleBookmark = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { mock_test_id } = req.params;
    if (!mock_test_id) {
      res.status(400).json({ message: 'Mock test ID is required' });
    }
    const existingBookmark = await Bookmark.findOne({
      where: { user_id: userId, mock_test_id },
    });
    if (existingBookmark) {
      await existingBookmark.destroy();
      res.status(200).json({ message: 'Bookmark removed' });
      return;
    }

    const newBookmark = await Bookmark.create({
      user_id: userId,
      mock_test_id,
    });
    if (!newBookmark) {
      res.status(500).json({ message: 'Failed to add bookmark' });
      return;
    }
    res.status(201).json({ message: 'Bookmark added' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};
