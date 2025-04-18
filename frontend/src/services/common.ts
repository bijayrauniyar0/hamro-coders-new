import { IChangePasswordPayload } from '@Components/common/Navbar/AccountMenu/AccountSettings';
import { User } from '@Store/slices/common';

import { api, authenticated } from '.';

export const getAllUsers = async () => {
  return authenticated(api).get('/api/user/');
};

export const getUserProfile = async () => {
  return authenticated(api).get(`/api/user/profile/`);
};

export const checkLogin = async () => {
  return authenticated(api).get('/api/user/check-login/');
};

export const createNewUser = (payload: Record<string, any>) => {
  return api.post('/api/user/signup/', { ...payload });
};

export const updateUser = (payload: Partial<User>) => {
  return authenticated(api).patch('/api/user/update/profile/', {
    ...payload,
  });
};

export const changePassword = (payload: IChangePasswordPayload) => {
  return authenticated(api).patch('/api/user/change-password/', {
    ...payload,
  });
};

export const login = (payload: Record<string, any>) => {
  return api.post('/api/user/login/', { ...payload });
};
