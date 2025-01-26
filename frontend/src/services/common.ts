import { api } from '.';

export const getAllUsers = async () => {
  return api.get('/api/users/');
};

export const createNewUser = (payload: Record<string, any>) => {
  return api.post('/api/users/', { ...payload });
};
