export interface ISubjects {
  title: string;
  id: number;
  subject_code: string;
  details: string;
}
export interface ISubjectBoxProps {
  courseDetails: ISubjects;
  handlePlay: () => void;
}

export type CoursesType = {
  course_name: string;
  id: number;
  subjects_count: number;
};
