import { api, authenticated } from '.';

export const getSubjectsBySemester = async (params: Record<string, any>) => {
  const { semester, course_name } = params;
  return authenticated(api).get(
    `/api/academics/subjects/${semester}/${course_name}/`,
  );
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
