import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { chunkArray } from '@Utils/index'; // Utility to chunk questions
import { getMcqAnswers, getMcqs } from '@Services/academics';

import { MCQContext } from './MCQContext';
import {
  AnswerType,
  MCQContextType,
  McqResponseType,
  ViewMode,
} from './MCQContextTypes';

export const MCQProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const timeOutRef = useRef<NodeJS.Timeout>();

  const [questionCount, setQuestionCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState({});
  const [openAccordion, setOpenAccordion] = useState('');
  const [visibleQuestionChunkIndex, setVisibleQuestionChunkIndex] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>('questions');
  const [isRecordCreated, setIsRecordCreated] = useState(false);

  const [searchParams] = useSearchParams();
  const subject_id = searchParams.get('subject_id');

  const { data: mcqData, isLoading: questionsIsLoading } = useQuery({
    queryKey: ['mcq-data'],
    queryFn: () =>
      getMcqs({
        subject_id,
      }),
    select: ({ data }) => data,
    enabled: !!subject_id,
  });
  // eslint-disable-next-line no-unused-vars
  const { data: answers, isLoading: answersIsLoading } = useQuery({
    queryKey: ['answers'],
    queryFn: () =>
      getMcqAnswers({
        subject_id,
        questions: mcqData?.sections
          .map(section => section.questions.map(question => question.id))
          .flat()
          .join(','),
      }),
    select: ({ data }) => data as AnswerType[],
    enabled: questionCount === (mcqData?.questions_count ?? 0) - 1,
  });

  //   const results = useMemo(() => {
  //     if (!mcqData || !answers) return { right: 0, wrong: 0 };
  //     const res = Object.entries(selectedOption).map(
  //       ([question_id, { answer }]) => {
  //         const correct = answers.find(q => q.id === Number(question_id));
  //         return { correct: correct?.answer === answer };
  //       },
  //     );
  //     const right = res.filter(r => r.correct).length;
  //     return { right, wrong: mcqData.questions_count - right };
  //   }, [selectedOption, answers]);

  const cancelTimeout = () => {
    if (timeOutRef.current) clearTimeout(timeOutRef.current);
  };

  const questions = useMemo(() => {
    if (!mcqData) return [];
    return mcqData.sections.flatMap(s => s.questions);
  }, [mcqData]);
  const questionsChunk = useMemo(() => chunkArray(questions), [questions]);

  useEffect(() => {
    const firstId = questionsChunk[visibleQuestionChunkIndex]?.[0]?.id;
    if (firstId) setOpenAccordion(firstId.toString());
  }, [visibleQuestionChunkIndex, questionsChunk]);

  const value: MCQContextType = {
    questionCount,
    setQuestionCount,
    selectedOption,
    setSelectedOption,
    openAccordion,
    setOpenAccordion,
    visibleQuestionChunkIndex,
    setVisibleQuestionChunkIndex,
    viewMode,
    setViewMode,
    isRecordCreated,
    setIsRecordCreated,
    results: { right: 0, wrong: 0 }, // Placeholder for results
    cancelTimeout,
    questions,
    questionsChunk,
    questionsIsLoading,
    answersIsLoading,
    mcqData: mcqData ?? ({} as McqResponseType),
  };

  return <MCQContext.Provider value={value}>{children}</MCQContext.Provider>;
};
