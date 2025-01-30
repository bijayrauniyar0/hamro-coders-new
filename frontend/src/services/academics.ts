import { api, authenticated } from '.';

export const getSubjectsBySemester = async (params: Record<string, any>) => {
  const { semester, course_name } = params;
  return authenticated(api).get(
    `/api/academics/subjects/${semester}/${course_name}/`,
  );
};
