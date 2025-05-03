import React, { useMemo, useRef, useState } from 'react';
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
  const [selectedOption, setSelectedOption] = useState<Record<string, any>>({});
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

  const {
    data: answers,
    isLoading: answersIsLoading,
    refetch: fetchAnswers,
  } = useQuery({
    queryKey: ['answers'],
    queryFn: () =>
      getMcqAnswers({
        questions: mcqData?.sections
          .map(section => section.questions.map(question => question.id))
          .flat()
          .join(','),
      }),
    select: ({ data }) => data as AnswerType[],
    enabled: false,
  });

  const results = useMemo(() => {
    if (!answers || !mcqData) return { right: 0, wrong: 0 };
    let correctCount = 0;

    for (const correct of answers) {
      const userAnswer = selectedOption[correct.id];
      if (userAnswer && userAnswer.answer === correct.answer) {
        correctCount++;
      }
    }
    return {
      right: correctCount,
      wrong: answers.length - correctCount,
    };
  }, [answers, mcqData, selectedOption]);

  const solvedCount = Object.keys(selectedOption)
    .map(option => selectedOption[option])
    .filter(option => option).length;

  const cancelTimeout = () => {
    if (timeOutRef.current) clearTimeout(timeOutRef.current);
  };

  const questions = useMemo(() => {
    if (!mcqData) return [];
    return mcqData.sections.flatMap(s => s.questions);
  }, [mcqData]);
  const questionsChunk = useMemo(() => chunkArray(questions), [questions]);

  const value: MCQContextType = {
    questionCount,
    setQuestionCount,
    selectedOption,
    setSelectedOption,
    visibleQuestionChunkIndex,
    setVisibleQuestionChunkIndex,
    viewMode,
    setViewMode,
    isRecordCreated,
    setIsRecordCreated,
    results, // Placeholder for results
    cancelTimeout,
    questions,
    questionsChunk,
    questionsIsLoading,
    answersIsLoading,
    mcqData: mcqData ?? ({} as McqResponseType),
    solvedCount,
    fetchAnswers,
  };

  return <MCQContext.Provider value={value}>{children}</MCQContext.Provider>;
};
