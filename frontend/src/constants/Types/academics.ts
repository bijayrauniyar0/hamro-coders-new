import { LucideIcon } from 'lucide-react';

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

export type TestInfoKey =
  | 'duration'
  | 'full_marks'
  | 'pass_marks'
  | 'negative_marking'
  | 'total_questions';

export interface TestMetaDataItem {
  id: number;
  label: string;
  value_key: TestInfoKey;
  icon: LucideIcon;
  icon_color: string;
}

export type TestInfoProps = {
  title: string;
  description: string;
  duration: string;
  total_questions: number;
  full_marks: number;
  negative_marking: string;
  stream_name: string;
  rating: number;
  students_count: number;
  bookmark?: boolean;
};

export type ChatMessageUserType = {
  id: number;
  name: string;
  avatar: string;
};
export type ChatMessage = {
  User: Partial<ChatMessageUserType>;
  message: string;
  status?: string;
  id?: number;
  messageId?: string;
  created_at: string;
};

export type UserMention = {
  id: number;
  name: string;
};
