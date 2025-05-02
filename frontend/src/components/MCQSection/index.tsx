/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Grid } from 'lucide-react';

import BindContentContainer from '@Components/common/BindContentContainer';
import Icon from '@Components/common/Icon';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import NoDataAvailable from '@Components/common/NoDataAvailable';
import { Button } from '@Components/radix/Button';
import Skeleton from '@Components/radix/Skeleton';
import isEmpty from '@Utils/isEmpty';
import { endStats, modesDescription } from '@Constants/QuestionsBox';
import { createLeaderboardEntry } from '@Services/leaderboard';

import { useMCQContext } from './Context/MCQContext';
import { MCQProvider } from './Context/MCQProvider';
import MCQSkeleton from './MCQSkeleton';
import OverviewMode from './OverviewMode';
import QuestionsView from './QuestionsView';
import TimeBox from './TimeBox';

const questionsIsLoading = false;

const MCQBox = () => {
  const {
    results,
    questionsChunk,
    answersIsLoading,
    mcqData,
    viewMode,
    setViewMode,
    setVisibleQuestionChunkIndex,
    visibleQuestionChunkIndex,
  } = useMCQContext();
  const handleBeforeUnload = useRef((event: BeforeUnloadEvent) => {
    event.preventDefault();
  });
  const startTimeRef = useRef(new Date());
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const [timeOut, setTimeOut] = useState(2);
  const timeOutRef = useRef<NodeJS.Timeout>();

  const [gameOver, setGameOver] = useState(false);

  const [searchParams] = useSearchParams();
  const selectedMode = searchParams.get('mode');
  const subject_id = searchParams.get('subject_id');
  const { course_id } = useParams();
  const navigate = useNavigate();

  const [isRecordCreated, setIsRecordCreated] = useState(false);

  const { mutate: createLeaderboardRecord } = useMutation({
    mutationFn: (payload: Record<string, any>) =>
      createLeaderboardEntry(payload),
  });

  const handleScoreSubmission = () => {
    const payload = {
      subject_id,
      score: results.right,
      mode: selectedMode,
      elapsed_time: Math.floor(
        (new Date().getTime() - startTimeRef.current.getTime()) / 1000,
      ),
    };
    if (!isRecordCreated) {
      createLeaderboardRecord(payload);
    }
    setIsRecordCreated(true);
  };

  const startCountdown = useCallback((time: number) => {
    const interval = setInterval(() => {
      setTimeOut(time);
      time -= 1;
      if (time < 0) {
        clearInterval(interval);
        setViewMode('questions');
      }
    }, 1000);
  }, []);

  // useEffect(() => {
  //   const listener = handleBeforeUnload.current;

  //   window.addEventListener('beforeunload', listener);

  //   return () => {
  //     window.removeEventListener('beforeunload', listener);
  //   };
  // }, []);

  // const disableBeforeUnload = () => {
  //   window.removeEventListener('beforeunload', handleBeforeUnload.current);
  // };

  useEffect(() => {
    if (!selectedMode) {
      toast.error('Please select a mode to continue');
      setTimeout(() => {
        navigate(`/courses/${course_id}`);
      }, 500);
      return () => {};
    }
    startCountdown(timeOut);
    if (selectedMode === 'practice') return () => {};
    if (selectedMode === 'ranked') {
      setTimeout(() => {
        // setQuestionCount(0);
        setViewMode('answers');
      }, 600000);
    }

    const timeoutId = setTimeout(() => {
      // console.log("object");
    }, 3000);
    return () => clearInterval(timeoutId);
  }, [selectedMode]);

  // useEffect(() => {
  //   if (!mcqData) return;
  //   if (questionCount === mcqData.questions_count) {
  //     setViewMode('results');
  //     handleScoreSubmission();
  //   }
  // }, [questionCount]);

  useEffect(() => {
    if (gameOver) {
      startCountdown(10);
      timeOutRef.current = setTimeout(() => {
        navigate(`/courses/${course_id}`);
      }, 10000);
    }
  }, [gameOver]);

  const cancelTimeout = () => {
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current);
    }
  };
  const viewModes: { [key: string]: React.ReactNode } = {
    instructions: (
      <div className="mx-auto min-h-[15rem] md:w-1/2">
        {questionsIsLoading ? (
          <Skeleton className="h-[10rem] w-full" />
        ) : (
          <FlexColumn className="items-center gap-4 pt-8">
            <p className="text-center">
              {modesDescription[selectedMode || 'practice']}
            </p>
            <p className="text-center text-base font-medium">
              Game starting in{' '}
              <span className="text-primary-500">{timeOut}</span>
            </p>
          </FlexColumn>
        )}
      </div>
    ),
    questions: <QuestionsView />,
    results: (
      <>
        <FlexColumn className="flex w-full items-center gap-6 p-2 md:p-4">
          <FlexColumn className="w-full items-center gap-1">
            <p className="text-base font-semibold leading-4 md:text-lg md:leading-normal">
              Challenge Completed
            </p>
            <p className="text-center text-sm leading-4 md:text-base">
              You&apos;ve finished all the problems! Here&apos;s your
              performance summary
            </p>
          </FlexColumn>
          <FlexColumn className="w-full gap-4 rounded-lg bg-gray-100 px-2 py-4 md:px-6 md:py-6 md:pt-4">
            <p className="text-center text-md font-semibold md:text-base">
              Your Stats:
            </p>
            <FlexColumn className="items-start gap-4">
              {endStats.map((stat, idx) => (
                <FlexRow key={idx} className="items-center gap-2">
                  <Icon
                    name={stat.name}
                    className={`flex items-center justify-center ${stat.bg_color} ${stat.color} rounded-full p-1`}
                  />
                  {/* @ts-ignore */}
                  <p className="text-md font-medium leading-4 tracking-tight md:text-base md:tracking-normal">{`${results[stat.keyName]} ${stat.text}`}</p>
                </FlexRow>
              ))}
            </FlexColumn>
          </FlexColumn>
          <FlexColumn className="w-full gap-4 rounded-lg bg-purple-50 px-2 py-4 md:px-6 md:py-6 md:pt-4">
            <FlexRow className="items-center gap-2">
              <Icon
                name="deployed_code"
                className="flex items-center justify-center text-primary-600"
              />
              <p className="text-base font-semibold">Learning Resources</p>
            </FlexRow>
            <FlexColumn className="items-start gap-4 pt-2">
              <FlexRow className={`items-center gap-2`}>
                <Icon
                  name="stacks"
                  className={`flex items-center justify-center text-primary-600`}
                />
                <p className="text-md text-primary-600">Practice Exercises</p>
              </FlexRow>
            </FlexColumn>
          </FlexColumn>
          {timeOut !== 0 && gameOver && (
            <FlexColumn className="items-center">
              <p className="text-center text-base font-medium leading-3">
                Redirecting to Courses in{' '}
                <span className="text-primary-500">{timeOut}</span>
              </p>
              <Button
                variant="link"
                onClick={() => {
                  cancelTimeout();
                  navigate(`/courses/${course_id}`);
                }}
                className="!py-0"
              >
                Redirect Now
              </Button>
            </FlexColumn>
          )}
        </FlexColumn>
        <div className="flex w-full flex-col items-center justify-center gap-2 md:flex-row">
          <Button
            onClick={() => {
              cancelTimeout();
              // setQuestionCount(0);
              setViewMode('answers');
            }}
            variant="secondary"
            disabled={answersIsLoading}
            isLoading={answersIsLoading}
            className="w-full md:w-fit"
          >
            {answersIsLoading
              ? 'Analyzing Results'
              : gameOver
                ? 'Preview Answers Again'
                : 'Preview Answers'}
          </Button>
          <Button
            onClick={() => {
              // disableBeforeUnload();
              navigate(0);
            }}
            className="w-full md:w-fit"
          >
            Try Again
          </Button>
        </div>
      </>
    ),
    // overview: ,
  };

  return (
    <>
      <BindContentContainer>
        <div className="flex w-full items-center justify-center">
          <div className="relative mx-auto h-[calc(100dvh-4rem)] w-full rounded-lg border bg-white p-4 shadow-lg md:w-4/5 md:p-4 overflow-hidden">
            {questionsIsLoading ? (
              <MCQSkeleton />
            ) : isEmpty(mcqData) || !mcqData ? (
              <NoDataAvailable />
            ) : (
              <FlexColumn className="items-end gap-3 md:gap-6">
                <div className="flex w-full flex-wrap justify-between border-b border-gray-300 pb-4">
                  <p className="text-md font-semibold text-primary-600 lg:text-lg">
                    Hamro Coders
                  </p>

                  <FlexRow className="items-center justify-between gap-4 max-sm:w-full md:justify-end">
                    <p className="text-sm text-gray-500 md:text-md">
                      Exam: Computer Science
                    </p>
                    <TimeBox
                      startTimer={viewMode !== 'instructions' || timeOut < 1}
                      stopTimer={
                        false
                        // questionCount === mcqData.questions_count || gameOver
                      }
                    />
                  </FlexRow>
                  {/* <FlexRow className="items-center justify-center rounded-3xl bg-gray-100 px-2 py-1">
                    <p className="text-sm md:text-md">
                      <span className="font-medium">Solved: </span>
                      <span
                        className={`tracking-[-0.1rem] ${viewMode === 'questions' ? getPercentageColor(questionCount, mcqData.questions_count) : 'text-green-700'}`}
                      >
                        {currentQuestion.filter(item => item === true).length} /{' '}
                        {mcqData.questions_count}
                      </span>
                    </p>
                  </FlexRow> */}
                </div>
                <FlexRow className="z-10 w-full items-center justify-between gap-4 bg-white">
                  <FlexRow className="items-center gap-6">
                    <span className="text-sm font-medium md:text-md">
                      Section {visibleQuestionChunkIndex}/
                      {questionsChunk.length}
                    </span>
                    {/* <FlexRow className="items-center gap-4">
                      <div className="flex items-center gap-1">
                        <span className="inline-block h-3 w-3 rounded-full bg-green-500"></span>
                        <span className="text-xs">Answered (0)</span>
                      </div>
                    </FlexRow> */}
                  </FlexRow>
                  <button
                    onClick={() => {
                      setIsOverviewOpen(!isOverviewOpen);
                    }}
                    className={`flex items-center gap-1 rounded px-2 py-1 text-xs hover:bg-primary-500 hover:text-white ${viewMode === 'overview' ? 'bg-primary-500 text-white' : 'bg-gray-300'}`}
                  >
                    <Grid size={14} />
                    Overview
                  </button>
                </FlexRow>
                <motion.div
                  layout // This enables smooth layout transitions based on content size
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: isOverviewOpen ? 'auto' : 0,
                    opacity: isOverviewOpen ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="w-full overflow-hidden"
                >
                  <OverviewMode />
                </motion.div>

                <motion.div
                  layout
                  animate={{ y: isOverviewOpen ? 0 : -16 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className=" max-md:scrollbar-thin h-[calc(100dvh-19rem)] w-full overflow-y-auto"
                >
                  {viewModes[viewMode]}
                </motion.div>
                {!isOverviewOpen && (
                  <FlexRow className="gap-4">
                    <Button
                      variant="secondary"
                      onClick={() => {
                        if (visibleQuestionChunkIndex === 0) return;
                        setVisibleQuestionChunkIndex(
                          visibleQuestionChunkIndex - 1,
                        );
                      }}
                      disabled={visibleQuestionChunkIndex === 0}
                    >
                      PREV
                    </Button>
                    <Button
                      onClick={() => {
                        if (
                          visibleQuestionChunkIndex ===
                          questionsChunk.length - 1
                        )
                          return;
                        setVisibleQuestionChunkIndex(
                          visibleQuestionChunkIndex + 1,
                        );
                      }}
                      disabled={
                        visibleQuestionChunkIndex === questionsChunk.length - 1
                      }
                    >
                      NEXT
                    </Button>
                  </FlexRow>
                )}
              </FlexColumn>
            )}
          </div>
        </div>
      </BindContentContainer>
    </>
  );
};

export default MCQBox;
