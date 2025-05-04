import Stream from '../models/streamModels';
import Test from '../models/mockTestModel';
import { Request, Response } from 'express';

export class StreamsService {
  async getStreams() {
    try {
      const streams = await Stream.findAll({});
      const updatedStreams = await Promise.all(
        streams.map(async stream => {
          const testsCount = await Test.count({
            where: { stream_id: stream.id },
          });

          return {
            ...stream.toJSON(),
            tests_count: testsCount,
          };
        }),
      );
      return updatedStreams;
    } catch {
      throw new Error('Internal server error');
    }
  }
  async getTestsListByStream(stream_id: number) {
    try {
      const tests = await Test.findAll({
        where: { stream_id },
        include: [
          {
            model: Stream,
            attributes: ['name'],
          },
        ],
      });
      return tests.map(test => ({
        ...test.toJSON(),
        stream_name: test.Stream?.name,
      }));
    } catch (error) {
      throw new Error(error as string);
    }
  }
  async getTestsMetaDataAccordingToSection(test_id: number | string) {
    try {
      const tests = await Test.findByPk(test_id);
      if (!tests) {
        throw new Error('Test not found');
      }
      const sections = await tests.getSections({
        joinTableAttributes: [],
        raw: true,
      });
      return sections;
    } catch {
      throw new Error('Internal server error');
    }
  }
}
export const getStreams = async (req: Request, res: Response) => {
  try {
    const streamsService = new StreamsService();
    const streams = await streamsService.getStreams();
    res.status(200).json(streams);
  } catch {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getMockTestsListByStream = async (req: Request, res: Response) => {
  const { stream_id } = req.params;
  try {
    const streamsService = new StreamsService();
    const tests = await streamsService.getTestsListByStream(+stream_id);
    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

// export const getTestsMetaData = async (
//   req: Request<{ test_id: number }, unknown, unknown, unknown>,
//   res: Response,
// ) => {
//   const { test_id } = req.params;
//   try {
//     const tests = await Test.findByPk(test_id);
//     res.status(200).json(tests);
//   } catch {
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };
