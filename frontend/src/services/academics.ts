import { AxiosResponse } from 'axios';

import { McqResponseType } from '@Components/MCQSection/Context/MCQContextTypes';

import { api, authenticated } from '.';

export const getSubjectsByCourse = async (course_id: number) => {
  return authenticated(api).get(`/api/courses/subjects/${course_id}/`);
};

export const getCourses = async () => {
  return authenticated(api).get('/api/courses/');
};

export const getSubjectsMetaData = async (subject_id: string) => {
  return authenticated(api).get(
    `/api/courses/subjects/meta-data/${subject_id}/`,
  );
};

export const getMcqs = async (
  paramsX: Record<string, any>,
): Promise<AxiosResponse<McqResponseType>> => {
  const { subject_id, ...params } = paramsX;
  return authenticated(api).get(`/api/mcq/questions/${subject_id}/`, {
    params,
  });
};

export const getMcqAnswers = async (paramsX: Record<string, any>) => {
  const { subject_id, ...params } = paramsX;
  return authenticated(api).get(`/api/mcq/answers/${subject_id}/`, {
    params,
  });
};
