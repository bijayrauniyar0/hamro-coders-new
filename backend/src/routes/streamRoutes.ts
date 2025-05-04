import express from 'express';
import { authenticate } from '../middlewares/authenticate';
import {
  getMockTestsListByStream,
  getStreams,
} from 'src/controllers/streamController';

const streamRouter = express.Router();

streamRouter.get('/', authenticate, getStreams);
streamRouter.get('/mock-tests/:stream_id/', getMockTestsListByStream);
// streamRouter.get('/tests/meta-data/:test_id/', getTestsMetaData);

export default streamRouter;
