import React, { useCallback, useEffect, useState } from 'react';
import { BookOpen, CheckCircle, Clock, Target, Trophy } from 'lucide-react';

import { FlexColumn, FlexRow, Grid } from '@Components/common/Layouts';
import { Button } from '@Components/radix/Button';
import Skeleton from '@Components/radix/Skeleton';

import { useMCQContext } from '../Context/MCQContext';

const InstructionsView = () => {
  const { questionsIsLoading, mcqData, setViewMode } = useMCQContext();
  const [timeOut, setTimeOut] = useState(5);

  const instructionDetails = [
    {
      label: 'Time Limit',
      description: `${mcqData.time_limit} minutes to complete all questions`,
      icon: <Clock className="h-4 w-4 text-primary-600 md:h-5 md:w-5" />,
    },
    {
      label: 'Questions',
      description: `${mcqData.questions_count} multiple-choice questions`,
      icon: <BookOpen className="h-4 w-4 text-primary-600 md:h-5 md:w-5" />,
    },
    {
      label: 'Scoring',
      description: 'Each correct answer earns points',
      icon: <CheckCircle className="h-4 w-4 text-primary-600 md:h-5 md:w-5" />,
    },
    {
      label: 'Leaderboard',
      description: 'Compete for the top position',
      icon: <Trophy className="h-4 w-4 text-primary-600 md:h-5 md:w-5" />,
    },
  ];
  const startCountdown = useCallback((time: number) => {
    const interval = setInterval(() => {
      setTimeOut(time);
      time -= 1;
      if (time < 0) {
        clearInterval(interval);
        // setViewMode('questions');
      }
    }, 1000);
  }, []);

  useEffect(() => {
    startCountdown(timeOut);
  }, []);

  return (
    <div className="mx-auto min-h-[15rem]">
      {questionsIsLoading ? (
        <Skeleton className="h-[10rem] w-full" />
      ) : (
        <FlexRow className="h-[calc(100vh-15rem)] w-full items-center justify-center md:h-[calc(100vh-19rem)]">
          <FlexColumn className="mx-auto max-w-full items-center justify-center gap-4 md:gap-6 lg:max-w-[60%]">
            <p className="text-base font-semibold text-primary-600 md:text-lg">
              Challenge Yourself!
            </p>

            <Grid className="mx-auto w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:w-4/5">
              {instructionDetails.map(instruction => {
                return (
                  <FlexRow
                    className="flex-1 items-center gap-2"
                    key={instruction.label}
                  >
                    <div className="rounded-lg bg-primary-100 p-2">
                      {instruction.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold leading-3 md:text-md">
                        {instruction.label}
                      </p>
                      <p className="text-xs md:text-sm">
                        {instruction.description}
                      </p>
                    </div>
                  </FlexRow>
                );
              })}
            </Grid>
            <FlexColumn className="w-full items-center gap-2 rounded-lg bg-gray-100 p-4 shadow-sm md:p-2">
              <FlexRow className="items-center gap-2">
                <Target className="h-4 w-4 text-primary-600 md:h-5 md:w-5" />
                <p className="text-md font-semibold text-primary-600">
                  Your Mission
                </p>
              </FlexRow>
              <p className="text-center text-xs text-primary-600 md:text-md">
                Answer wisely—your score depends on it. <br /> Can you rise to
                the top and claim your spot on the leaderboard?
              </p>
            </FlexColumn>
            <FlexColumn className="w-full items-center gap-2 rounded-lg bg-gray-100 p-4 shadow-sm md:p-2">
              {/* <FlexRow className="items-center gap-2">
                <div className="rounded-md bg-red-400 p-1">
                  <DoorOpen className="h-4 w-4 cursor-pointer rounded-lg text-white md:h-5 md:w-5" />
                </div>

                <div className="rounded-md bg-blue-400 p-1">
                  {isFullScreen ? (
                    <Minimize
                      onClick={() => {
                        handleFullScreen();
                      }}
                      className="h-4 w-4 cursor-pointer rounded-lg text-white md:h-5 md:w-5"
                    />
                  ) : (
                    <Expand
                      onClick={() => {
                        handleFullScreen();
                      }}
                      className="h-4 w-4 cursor-pointer rounded-lg text-white md:h-5 md:w-5"
                    />
                  )}
                </div>
                <button
                  disabled={
                    viewMode === 'instructions' || viewMode === 'results'
                  }
                  onClick={() => {
                    setIsOverviewOpen(!isOverviewOpen);
                  }}
                  className={`flex items-center gap-1 rounded-md px-2 py-[0.325rem] text-xs text-primary-600 hover:bg-primary-500 hover:text-white disabled:cursor-not-allowed disabled:text-white disabled:hover:text-white md:text-sm ${isOverviewOpen ? 'bg-primary-500 text-white' : 'border border-gray-300 bg-white'} disabled:bg-gray-300`}
                >
                  <GridIcon size={14} />
                  Overview
                </button>
              </FlexRow> */}
            </FlexColumn>
            <FlexColumn className="gap-2 md:gap-4">
              <p className="text-sm md:text-md">
                Exam starting in{' '}
                <span className="text-base font-bold text-primary-600">
                  {timeOut}{' '}
                </span>
                seconds
              </p>
              <Button
                className="mx-auto w-fit"
                onClick={() => {
                  setViewMode('questions');
                }}
              >
                Start Now
              </Button>
            </FlexColumn>
          </FlexColumn>
        </FlexRow>
      )}
    </div>
  );
};

export default InstructionsView;
