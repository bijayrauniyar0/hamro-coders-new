export type CoursesType = {
  name: string;
  id: number;
  subjects_count: number;
};

export type SubjectType = {
  id: number;
  course_id: number;
  title: string;
  course_name: string;
};

export interface ISubjectBoxProps {
  title: string;
  course_name: string;
}
