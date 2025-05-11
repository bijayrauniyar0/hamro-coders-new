import { api, authenticated } from '.';

export const getAllUsersInDiscussion = async (mock_test_id: string) => {
  return authenticated(api).get(`/api/discussions/${mock_test_id}`);
};
