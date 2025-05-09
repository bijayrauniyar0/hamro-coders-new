import { Request, Response } from 'express';
import { streamImageFromDrive } from '../services/driveService';

export const getPrivateImage = async (
  req: Request<{ fileId: string }, unknown, unknown, unknown>,
  res: Response,
): Promise<void> => {
  try {
    const { fileId } = req.params;
    if (!fileId) {
      res.status(400).json({ message: 'File ID is required' });
      return;
    }

    const fileStream = await streamImageFromDrive(fileId);
    res.setHeader('Content-Type', fileStream.mimeType);
    fileStream.fileStream.pipe(res);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};
