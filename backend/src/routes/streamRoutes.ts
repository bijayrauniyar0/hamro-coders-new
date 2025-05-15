import express from 'express';
import {
  getAllMockTests,
  getMockTestsListByStream,
  getStreams,
} from '../controllers/streamController';
import { maybeAuthenticate } from '../middlewares/authenticate';

const streamRouter = express.Router();

streamRouter.get('/', getStreams);
streamRouter.get(
  '/mock-tests/:stream_id/',
  maybeAuthenticate,
  getMockTestsListByStream,
);
streamRouter.get('/mock-tests/', getAllMockTests);
// streamRouter.get('/tests/meta-data/:test_id/', getTestsMetaData);

export default streamRouter;
