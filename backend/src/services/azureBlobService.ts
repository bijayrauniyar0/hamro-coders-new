import { BlobServiceClient } from '@azure/storage-blob';
import {
  AZURE_STORAGE_CONNECTION_STRING,
  AZURE_STORAGE_CONTAINER_NAME,
} from '../constants';

export class AzureBlobService {
  private blobServiceClient: BlobServiceClient;

  constructor() {
    this.blobServiceClient = BlobServiceClient.fromConnectionString(
      AZURE_STORAGE_CONNECTION_STRING,
    );
  }

  async uploadProfilePic(filePath: string, blobName: string): Promise<string> {
    const containerClient = this.blobServiceClient.getContainerClient(
      AZURE_STORAGE_CONTAINER_NAME,
    );
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.uploadFile(filePath);
    return blockBlobClient.url;
  }
  async deleteBlob(blobName: string): Promise<void> {
    const containerClient = this.blobServiceClient.getContainerClient(
      AZURE_STORAGE_CONTAINER_NAME,
    );
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.deleteIfExists();
  }
}
