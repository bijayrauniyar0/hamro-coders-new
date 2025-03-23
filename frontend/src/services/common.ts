import { api, authenticated } from '.';

export const getAllUsers = async () => {
  return authenticated(api).get('/api/user/');
};

export const getUserById = async (id: string) => {
  return authenticated(api).get(`/api/user/${id}/`);
};

export const checkLogin = async () => {
  return authenticated(api).get('/api/user/check-login/');
};

export const createNewUser = (payload: Record<string, any>) => {
  return api.post('/api/user/signup/', { ...payload });
};

export const login = (payload: Record<string, any>) => {
  return api.post('/api/user/login/', { ...payload });
};
