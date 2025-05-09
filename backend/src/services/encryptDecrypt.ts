import crypto from 'crypto';
import dotenv from 'dotenv';
import { ENCRYPTION_KEY } from '../constants';

dotenv.config();

const algorithm = 'aes-256-cbc';
const ivLength = 16; // For AES, the IV is always 16 bytes

export class CryptoService {
  encryptRefreshToken(refreshToken: string): string {
    const iv = crypto.randomBytes(ivLength);
    const cipher = crypto.createCipheriv(
      algorithm,
      Buffer.from(ENCRYPTION_KEY as string),
      iv,
    );
    let encrypted = cipher.update(refreshToken, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
  }

  decryptRefreshToken(encryptedData: string): string {
    const [ivHex, encrypted] = encryptedData.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv(
      algorithm,
      Buffer.from(ENCRYPTION_KEY as string),
      iv,
    );
    let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
  }
}
