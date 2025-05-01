export type OptionType = {
  id: number;
  value: string;
};

export type QuestionType = {
  id: number;
  section_id: number;
  question: string;
  options: OptionType[];
  answer: string; // If it's always a string (e.g., "1")
};

export type SectionType = {
  section_id: number;
  name: string;
  question_count: number;
  marks_per_question: number;
  negative_marking: number;
  questions: QuestionType[];
};

export type McqResponseType = {
  questions_count: number;
  time_limit: number;
  sections: SectionType[];
};

export type AnswerType = {
  id: number;
  answer: number;
};

export type SelectedOptionType = {
  [key: number]: {
    section_id: number;
    answer: number;
  };
};
export type ViewMode =
  | 'answers'
  | 'questions'
  | 'results'
  | 'overview'
  | 'instructions';

export interface MCQContextType {
  questionCount: number;
  setQuestionCount: React.Dispatch<React.SetStateAction<number>>;

  selectedOption: SelectedOptionType;
  setSelectedOption: React.Dispatch<React.SetStateAction<SelectedOptionType>>;

  openAccordion: string;
  setOpenAccordion: React.Dispatch<React.SetStateAction<string>>;

  visibleQuestionChunkIndex: number;
  setVisibleQuestionChunkIndex: React.Dispatch<React.SetStateAction<number>>;

  viewMode: ViewMode;
  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>;

  isRecordCreated: boolean;
  setIsRecordCreated: React.Dispatch<React.SetStateAction<boolean>>;

  results: { right: number; wrong: number };

  cancelTimeout: () => void;

  questions: QuestionType[];
  questionsChunk: QuestionType[][];

  questionsIsLoading: boolean;
  answersIsLoading: boolean;
  mcqData: McqResponseType;
}
