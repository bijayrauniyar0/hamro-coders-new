import fs from 'fs';
import { getDriveInstance } from '../config/drive';

interface File {
  path: string;
  originalname: string;
  mimetype: string;
}

export const uploadFileToDrive = async (file: File, file_name?: string) => {
  const { path, originalname, mimetype } = file;
  try {
    const drive = await getDriveInstance();
    const response = await drive.files.create({
      requestBody: {
        name: file_name || originalname,
        mimeType: mimetype,
        parents: ['1SI3KQrapg5Oia4d1TdHrw0JV0RBhramg'], // Replace with your folder ID
      },
      media: {
        mimeType: mimetype,
        body: fs.createReadStream(path),
      },
    });
    fs.unlinkSync(path); // delete from uploads

    return response.data;
  } catch {
    throw new Error('Failed to upload file to Google Drive');
  }
};

export const streamImageFromDrive = async (fileId: string) => {
  try {
    // Fetch the file content
    const drive = await getDriveInstance();
    const file = await drive.files.get(
      { fileId, alt: 'media' },
      { responseType: 'stream' },
    );

    // Get file metadata (like mimeType) to set the correct content-type
    const metadata = await drive.files.get({
      fileId,
      fields: 'mimeType',
    });

    return {
      fileStream: file.data,
      mimeType: metadata.data.mimeType || 'image/jpeg',
    };
  } catch {
    throw new Error('Unable to load image');
  }
};

export const getImageUrl = async (fileId: string): Promise<string> => {
  try {
    const drive = await getDriveInstance();
    const fileMetadata = await drive.files.get({
      fileId,
      fields: 'webViewLink',
    });
    if (fileMetadata.data.webViewLink) {
      return fileMetadata.data.webViewLink;
    } else {
      throw new Error('File not accessible or not found');
    }
  } catch {
    throw new Error('Failed to retrieve image URL');
  }
};
