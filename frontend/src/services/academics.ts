import { AxiosResponse } from 'axios';

import { McqResponseType } from '@Components/MCQSection/Context/MCQContextTypes';

import { api, authenticated } from '.';

export const getTestsByStreams = async (stream_id: number) => {
  return authenticated(api).get(`/api/streams/mock-tests/${stream_id}/`);
};

export const getStreams = async () => {
  return authenticated(api).get('/api/streams/');
};

export const getTestsMetaData = async (test_id: string) => {
  return authenticated(api).get(`/api/streams/tests/meta-data/${test_id}/`);
};

export const getMcqs = async (
  paramsX: Record<string, any>,
): Promise<AxiosResponse<McqResponseType>> => {
  const { test_id, ...params } = paramsX;
  return authenticated(api).get(`/api/mcq/questions/${test_id}/`, {
    params,
  });
};

export const getMcqAnswers = async (params: Record<string, any>) => {
  return authenticated(api).get(`/api/mcq/answers/`, {
    params,
  });
};

export const getAllTestsList = () => {
  return api.get('/api/streams/mock-tests');
};

