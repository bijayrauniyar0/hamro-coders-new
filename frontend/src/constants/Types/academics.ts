export type StreamsType = {
  name: string;
  id: number;
  tests_count: number;
};

export type TestsType = {
  id: number;
  stream_id: number;
  title: string;
  stream_name: string;
};

export interface ITestBoxProps {
  title: string;
  stream_name: string;
}
