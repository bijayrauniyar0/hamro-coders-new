export interface ISubjectBoxProps {
  title: string;
  handlePlay: () => void;
}

export type CoursesType = {
  course_name: string;
  id: number;
  subjects_count: number;
};

export type SubjectType = {
  id: number;
  course_id: number;
  title: string;
  marks: number;
  duration_in_minutes: number;
};
