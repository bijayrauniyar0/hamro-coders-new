export type StreamsType = {
  name: string;
  id: number;
  tests_count: number;
  students_count: number;
};

export interface ITestBoxProps {
  title: string;
  stream_name: string;
  students_count: number;
  bookmark?: boolean;
  onViewClick?: () => void;
  onBookMarkClick?: () => void;
}

export type TestsType = {
  id: number;
  stream_id: number;
} & ITestBoxProps;
