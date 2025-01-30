export interface ISubjects {
  title: string;
  id: number;
  subjectCode: string;
  details: string;
}
export interface ISubjectBoxProps {
  courseDetails: ISubjects;
  handlePlay: () => void;
}
