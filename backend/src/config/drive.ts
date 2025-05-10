import { google } from 'googleapis';
import { refreshAccessToken } from '../services/googleTokens'; // Assuming you have this service for token refresh
import oauth2Client from './google'; // The same OAuth2 client you're already using

async function setCredentials() {
  try {
    const accessToken = await refreshAccessToken();
    if (!accessToken) {
      throw new Error('No access token found');
    }
    oauth2Client.setCredentials({ access_token: accessToken });
  } catch {
    throw new Error('Failed to set credentials');
  }
}

const getDriveInstance = async () => {
  await setCredentials(); // Make sure we have fresh credentials
  return google.drive({ version: 'v3', auth: oauth2Client });
};

export { getDriveInstance };
