import { api } from '.';

export const getAllUsers = async () => {
  return api.get('/users/');
};
