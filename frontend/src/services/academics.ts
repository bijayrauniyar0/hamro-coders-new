import { api, authenticated } from '.';

export const getSubjectsByCourse = async (course_id: number) => {
  return authenticated(api).get(`/api/courses/subjects/${course_id}/`);
};

export const getCourses = async () => {
  return authenticated(api).get('/api/courses/');
};

export const getMcqs = async (params: Record<string, any>) => {
  const { subject_code } = params;
  return authenticated(api).get(`/api/mcq/questions/${subject_code}/`);
};

export const getMcqAnswers = async (paramsX: Record<string, any>) => {
  const { subject_code, ...params } = paramsX;
  return authenticated(api).get(`/api/mcq/answers/${subject_code}/`, {
    params,
  });
};
