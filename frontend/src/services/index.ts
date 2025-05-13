import axios, { AxiosInstance } from 'axios';

const { API_URL_V1 } = process.env;

export const apiURL = API_URL_V1;

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
