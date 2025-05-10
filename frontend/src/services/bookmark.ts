import { api, authenticated } from '.';

export const toggleBookmark = async (mock_test_id: number) => {
  return authenticated(api).post(`/api/bookmarks/toggle/${mock_test_id}`);
};

export const getBookmarks = async () => {
  return authenticated(api).get('/api/bookmarks/');
};