import axios, { AxiosInstance } from 'axios';
import { io } from 'socket.io-client';

const { API_URL_V1 } = process.env;

export const apiURL = API_URL_V1;
export const socket = io(apiURL, { withCredentials: true });

export const api = axios.create({
  baseURL: API_URL_V1,
  timeout: 5 * 60 * 1000,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const authenticated = (apiInstance: AxiosInstance) => {
  apiInstance.defaults.withCredentials = true; // Automatically send cookies with requests
  return apiInstance;
};
