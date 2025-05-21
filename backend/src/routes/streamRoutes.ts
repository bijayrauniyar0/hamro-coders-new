import express from 'express';
import {
  getAllMockTests,
  getMockTestDetails,
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
streamRouter.get('/mock-tests/meta-data/:mock_test_id/', maybeAuthenticate, getMockTestDetails);

export default streamRouter;
