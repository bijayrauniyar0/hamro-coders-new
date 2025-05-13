import { IChangePasswordPayload } from '@Components/common/Navbar/AccountMenu/AccountSettings';
import { User } from '@Store/common';

import { api, authenticated } from '.';

export const getAllUsers = async () => {
  return authenticated(api).get('/api/user/');
};

export const getUserProfile = async () => {
  return authenticated(api).get(`/api/user/profile/`);
};

export const checkLogin = async () => {
  return authenticated(api).get('/api/auth/check-login/');
};

export const logoutUser = async () => {
  return authenticated(api).post('/api/auth/log-out/');
};

export const createNewUser = (payload: Record<string, any>) => {
  return api.post('/api/auth/signup/', { ...payload });
};

export const checkIfEmailExists = (payload: Record<string, any>) => {
  return api.post('/api/auth/check-email-exists/', { ...payload });
};

export const resendVerificationEmail = (payload: Record<string, any>) => {
  return api.post('/api/auth/resend-verification-mail/', payload);
};

export const verifyEmail = (payload: Record<string, any>) => {
  return api.post('/api/auth/verify-email/', payload);
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
  return api.post('/api/auth/login/', { ...payload });
};

export const forgotPassword = (payload: Record<string, any>) => {
  return api.post('/api/auth/forgot-password/', { ...payload });
};

export const getNotificationCount = () => {
  return authenticated(api).get('/api/notification/unread-count/');
};

export const getNotifications = (params: Record<string, any>) => {
  return authenticated(api).get('/api/notification/', { params });
};
export const markNotificationAsRead = (notificationId: number) => {
  return authenticated(api).post(`/api/notification/${notificationId}/`);
};
export const markAllNotificationsAsRead = () => {
  return authenticated(api).post('/api/notification/');
};
