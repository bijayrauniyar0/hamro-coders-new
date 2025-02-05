import { api, authenticated } from '.';

export const createLeaderboardEntry = (payload: Record<string, any>) => {
  return authenticated(api).post('/api/leaderboard/', payload);
};

export const getLeaderboard = (params: Record<string, any>) => {
  return authenticated(api).get('/api/leaderboard/rank/', { params });
};

export const getUserStats = () => {
  return authenticated(api).get('/api/leaderboard/stats/');
};
