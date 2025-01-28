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
  const token = localStorage.getItem('token');
  if (!token) return apiInstance;
  if (process.env.NODE_ENV === 'development') {
    apiInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    apiInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    apiInstance.defaults.withCredentials = false;
  }
  return apiInstance;
};
