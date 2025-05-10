import { api } from '.';

export const forgotPassword = (payload: Record<string, any>) => {
  return api.post('/api/auth/forgot-password/', { ...payload });
};

export const resetPassword = (payload: Record<string, any>) => {
  return api.post('/api/auth/reset-forgot-password/', { ...payload });
};
