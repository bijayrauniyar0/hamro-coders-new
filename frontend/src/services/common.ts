import { api, authenticated } from '.';

export const getAllUsers = async () => {
  return authenticated(api).get('/api/users/');
};

export const createNewUser = (payload: Record<string, any>) => {
  return api.post('/api/users/', { ...payload });
};

export const login = (payload: Record<string, any>) => {
  return api.post('/api/login/', { ...payload });
};
