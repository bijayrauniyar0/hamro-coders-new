import { api, authenticated } from '.';

export const getSubjectsByCourse = async (course_id: number) => {
  return authenticated(api).get(`/api/courses/subjects/${course_id}/`);
};

export const getCourses = async () => {
  return authenticated(api).get('/api/courses/');
};

export const getMcqs = async (params: Record<string, any>) => {
  const { subject_id } = params;
  return authenticated(api).get(`/api/mcq/questions/${subject_id}/`);
};

export const getMcqAnswers = async (paramsX: Record<string, any>) => {
  const { subject_id, ...params } = paramsX;
  return authenticated(api).get(`/api/mcq/answers/${subject_id}/`, {
    params,
  });
};
