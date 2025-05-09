import { GoogleAuthToken } from '../models/googleAuthModel';
import oauth2Client from '../config/google';
import { CryptoService } from './encryptDecrypt';

export async function refreshAccessToken() {
  const cryptoService = new CryptoService();
  const authToken = await GoogleAuthToken.findOne({
    where: { id: 1 },
  });
  if (!authToken) {
    throw new Error('No refresh token found in the database');
  }
  if (
    authToken.access_token_expires_at &&
    new Date(authToken.access_token_expires_at) > new Date()
  ) {
    return cryptoService.decryptRefreshToken(authToken.access_token);
  }
  try {
    oauth2Client.setCredentials({
      refresh_token: authToken.refresh_token,
    });
    const { credentials } = await oauth2Client.refreshAccessToken();
    if (!credentials || !credentials.access_token || !credentials.expiry_date) {
      throw new Error('No credentials returned from Google API');
    }
    await GoogleAuthToken.update(
      {
        access_token: cryptoService.encryptRefreshToken(
          credentials.access_token,
        ),
        access_token_expires_at: new Date(credentials.expiry_date),
      },
      { where: { id: 1 } }, // Use your condition to update the correct record
    );
    return credentials.access_token;
  } catch {
    throw new Error('Error refreshing access token');
  }
}
