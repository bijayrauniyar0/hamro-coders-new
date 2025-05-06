import { api, authenticated } from '.';

export const getUserStats = async (params: Record<string, any>) => {
  return authenticated(api).get('/api/analytics/stats/', { params });
};

export const getRecentSessions = async () => {
  return authenticated(api).get('/api/analytics/recent-sessions/');
};

export const getPerformanceDetails = async (params: Record<string, any>) => {
  return authenticated(api).get('/api/analytics/performance-details/', {
    params,
  });
};

export const getPerformanceTrend = async (params: Record<string, any>) => {
  return authenticated(api).get('/api/analytics/performance-trend/', {
    params,
  });
};

export const getMockTestTakenByUser = async () => {
  return authenticated(api).get('/api/user/me/mock-tests');
};
