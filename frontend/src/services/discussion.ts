import { api, authenticated } from '.';

export const getAllUsersInDiscussion = async (mock_test_id: string) => {
  return authenticated(api).get(`/api/discussions/${mock_test_id}`);
};

export const getHistoryMessages = async (paramsX: Record<string, any>) => {
  const { mock_test_id, ...params } = paramsX;
  return authenticated(api).get(`/api/discussions/history/${mock_test_id}/`, {
    params,
  });
};
