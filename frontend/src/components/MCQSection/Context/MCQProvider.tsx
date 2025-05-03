import React, { useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';

import { chunkArray, getElapsedTimeInSeconds } from '@Utils/index'; // Utility to chunk questions
import { getMcqAnswers, getMcqs } from '@Services/academics';
import { createLeaderboardEntry } from '@Services/leaderboard';

import { MCQContext } from './MCQContext';
import {
  AnswerType,
  EvaluatedAnswersType,
  MCQContextType,
  McqResponseType,
  MetaDataType,
  ViewMode,
} from './MCQContextTypes';

export const MCQProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const timeOutRef = useRef<NodeJS.Timeout>();
  const startTimeRef = useRef(new Date());

  const [questionCount, setQuestionCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState<
    Record<number, { section_id: number; answer: number }>
  >({});
  const [visibleQuestionChunkIndex, setVisibleQuestionChunkIndex] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>('instructions');
  const [isRecordCreated, setIsRecordCreated] = useState(false);
  const [evaluatedAnswers, setEvaluatedAnswers] =
    useState<EvaluatedAnswersType>({});

  const [searchParams] = useSearchParams();
  const subject_id = searchParams.get('subject_id');

  const { data: mcqData, isLoading: questionsIsLoading } = useQuery({
    queryKey: ['mcq-data', subject_id],
    queryFn: () =>
      getMcqs({
        subject_id,
      }),
    select: ({ data }) => data,
    enabled: Boolean(subject_id),
  });

  const questions = useMemo(() => {
    if (!mcqData) return [];
    return mcqData.sections.flatMap(s => s.questions);
  }, [mcqData]);
  const questionsChunk = useMemo(() => chunkArray(questions), [questions]);
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
    if (!answers || !mcqData || answersIsLoading)
      return { right: 0, wrong: 0, unanswered: 0 };
    let correctCount = 0;

    for (const correct of answers) {
      const userAnswer = selectedOption[correct.id];
      if (userAnswer && userAnswer.answer === correct.answer) {
        correctCount++;
      }
    }
    const wrongCount = Object.keys(selectedOption).length - correctCount;
    return {
      right: correctCount,
      wrong: wrongCount,
      unanswered: answers.length - correctCount - wrongCount,
    };
  }, [answers, mcqData, selectedOption, answersIsLoading]);

  const { mutate: createLeaderboardRecord } = useMutation({
    mutationFn: (payload: Record<string, any>) => {
      return createLeaderboardEntry(payload);
    },
    onSuccess: () => {
      setViewMode('results');
    },
  });

  const handleSubmit = async () => {
    const answersResponse = await fetchAnswers();
    const fetchedAnswers = answersResponse?.data as AnswerType[] | undefined;

    if (!fetchedAnswers || answersIsLoading) return;

    const evaluation = fetchedAnswers.reduce(
      (acc, curr) => {
        const userAnswer = selectedOption?.[curr.id]?.answer;
        acc[curr.id] = {
          correctAnswer: curr.answer,
          selectedAnswer: userAnswer,
          section_id: curr.section_id,
          isCorrect: curr.answer === userAnswer,
        };
        return acc;
      },
      {} as typeof evaluatedAnswers,
    );

    setEvaluatedAnswers(evaluation);

    let score = 0;
    questions.forEach(question => {
      const answerDetail = evaluation[question.id];
      if (!answerDetail) return;
      if (answerDetail.isCorrect) {
        score += metaData[question.section_id].marks_per_question;
      } else {
        score -= metaData[question.section_id].negative_marking;
      }
    });

    const payload = {
      score,
      subject_id,
      mode: 'ranked',
      elapsed_time: getElapsedTimeInSeconds(startTimeRef.current),
    };

    createLeaderboardRecord(payload);
  };

  const solvedCount = Object.keys(selectedOption)
    .map(option => selectedOption[Number(option)])
    .filter(option => option).length;

  const cancelTimeout = () => {
    if (timeOutRef.current) clearTimeout(timeOutRef.current);
  };

  const metaData = useMemo(() => {
    if (!mcqData) return {};
    const sectionsMetaData = mcqData.sections.reduce<MetaDataType>(
      (acc, section) => {
        const { negative_marking, marks_per_question } = section;
        acc[section.section_id] = {
          marks_per_question,
          negative_marking,
        };
        return acc;
      },
      {},
    );
    return sectionsMetaData;
  }, [mcqData]);

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
    evaluatedAnswers,
    metaData,
    handleSubmit,
  };

  return <MCQContext.Provider value={value}>{children}</MCQContext.Provider>;
};
