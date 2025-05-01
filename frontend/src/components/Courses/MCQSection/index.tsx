/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
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

import { useMCQContext } from '../../MCQSection/Context/MCQContext';
import { MCQProvider } from '../../MCQSection/Context/MCQProvider';

import MCQSkeleton from './MCQSkeleton';
import QuestionsView from './QuestionsView';
import TimeBox from './TimeBox';

const mcqData = {
  questions_count: 10,
  time_limit: 10,
  sections: [
    {
      section_id: 1,
      name: 'Main',
      question_count: 10,
      marks_per_question: 1,
      negative_marking: 0,
      questions: [
        {
          id: 110,
          section_id: 1,
          question:
            'Heat required to raise the temperature of a body through 1°C is known as:',
          options: [
            {
              id: 1,
              value: 'Specific heat capacity',
            },
            {
              id: 2,
              value: 'Water equivalent',
            },
            {
              id: 3,
              value: 'Molar specification',
            },
            {
              id: 4,
              value: 'Thermal capacity',
            },
          ],
          answer: '4',
        },
        {
          id: 103,
          section_id: 1,
          question:
            'A particle moving along a circular path due to a centripetal force having constant magnitude is an example of motion with:',
          options: [
            {
              id: 1,
              value: 'Constant speed and velocity.',
            },
            {
              id: 2,
              value: 'Variable speed and velocity.',
            },
            {
              id: 3,
              value: 'Variable speed and constant velocity.',
            },
            {
              id: 4,
              value: 'Constant speed and variable velocity.',
            },
          ],
          answer: '4',
        },
        {
          id: 105,
          section_id: 1,
          question: 'A body weighs:',
          options: [
            {
              id: 1,
              value: 'Very slightly greater at night',
            },
            {
              id: 2,
              value: 'Very slightly less at night.',
            },
            {
              id: 3,
              value: 'Exactly equal at day & night.',
            },
            {
              id: 4,
              value: 'Zero at night.',
            },
          ],
          answer: '2',
        },
        {
          id: 109,
          section_id: 1,
          question:
            'The pressure of H2 gas at a gas thermometer is 80cm at 0°C, 110cm at 100°C. At what temperature will it record 95cm pressure?',
          options: [
            {
              id: 1,
              value: '50°C',
            },
            {
              id: 2,
              value: '75°C',
            },
            {
              id: 3,
              value: '95°C',
            },
            {
              id: 4,
              value: '150°C',
            },
          ],
          answer: '2',
        },
        {
          id: 99,
          section_id: 1,
          question:
            'Astronomical unit (AU) is distance between Earth and Sun. 1 AU =',
          options: [
            {
              id: 1,
              value: '1.496 x 10^8 Km',
            },
            {
              id: 2,
              value: '9.46 x 10^12 Km',
            },
            {
              id: 3,
              value: '3.084 x 10^13 Km',
            },
            {
              id: 4,
              value: 'None',
            },
          ],
          answer: '1',
        },
        {
          id: 107,
          section_id: 1,
          question:
            'The speed of light in air is 3 x 10^8 m/s. What will be its speed in diamond whose refractive index is 2.4?',
          options: [
            {
              id: 1,
              value: '3 x 10^8 m/s',
            },
            {
              id: 2,
              value: '330 m/s',
            },
            {
              id: 3,
              value: '1.25 x 10^8 m/s',
            },
            {
              id: 4,
              value: '224 x 10^8 m/s',
            },
          ],
          answer: '3',
        },
        {
          id: 111,
          section_id: 1,
          question:
            'The diameter of a wire is reduced to half. Now the resistance changes by factor:',
          options: [
            {
              id: 1,
              value: '2',
            },
            {
              id: 2,
              value: '4',
            },
            {
              id: 3,
              value: '8',
            },
            {
              id: 4,
              value: '16',
            },
          ],
          answer: '4',
        },
        {
          id: 100,
          section_id: 1,
          question:
            'The magnitude of the sum of the two vectors is equal to the difference of their magnitudes. What is the angle between the vectors?',
          options: [
            {
              id: 1,
              value: '0°',
            },
            {
              id: 2,
              value: '45°',
            },
            {
              id: 3,
              value: '90°',
            },
            {
              id: 4,
              value: '180°',
            },
          ],
          answer: '4',
        },
        {
          id: 104,
          section_id: 1,
          question:
            'A rod of mass M and length L is lying on a horizontal table. The work done in making it stand on one end will be:',
          options: [
            {
              id: 1,
              value: 'MgL',
            },
            {
              id: 2,
              value: 'MgL/2',
            },
            {
              id: 3,
              value: 'MgL/4',
            },
            {
              id: 4,
              value: '2MgL',
            },
          ],
          answer: '2',
        },
        {
          id: 108,
          section_id: 1,
          question: 'Critical angle for water is:',
          options: [
            {
              id: 1,
              value: '24°',
            },
            {
              id: 2,
              value: '49°',
            },
            {
              id: 3,
              value: '42°',
            },
            {
              id: 4,
              value: '35°',
            },
          ],
          answer: '3',
        },
      ],
    },
  ],
};
const questionsIsLoading = false;

const MCQBox = () => {
  const { results, questionsChunk, answersIsLoading } = useMCQContext();
  const handleBeforeUnload = useRef((event: BeforeUnloadEvent) => {
    event.preventDefault();
  });
  const startTimeRef = useRef(new Date());
  const [questionCount, setQuestionCount] = useState(0);
  const [visibleQuestionChunkIndex, setVisibleQuestionChunkIndex] = useState(0);
  const [timeOut, setTimeOut] = useState(2);
  const timeOutRef = useRef<NodeJS.Timeout>();

  const [gameOver, setGameOver] = useState(false);
  const [viewMode, setViewMode] = useState<
    'answers' | 'questions' | 'results' | 'grid' | 'instructions'
  >('questions');

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
    startCountdown(2);
    if (selectedMode === 'practice') return () => {};
    if (selectedMode === 'ranked') {
      setTimeout(() => {
        setQuestionCount(0);
        setViewMode('answers');
      }, 600000);
    }

    const timeoutId = setTimeout(() => {
      // console.log("object");
    }, 3000);
    return () => clearInterval(timeoutId);
  }, [selectedMode]);

  useEffect(() => {
    if (!mcqData) return;
    if (questionCount === mcqData.questions_count) {
      setViewMode('results');
      handleScoreSubmission();
    }
  }, [questionCount]);

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

  return (
    <MCQProvider>
      <BindContentContainer>
        <div className="mx-auto w-full rounded-lg border bg-white p-4 shadow-lg md:w-4/5 md:p-4">
          {questionsIsLoading ? (
            <MCQSkeleton />
          ) : isEmpty(mcqData) || !mcqData ? (
            <NoDataAvailable />
          ) : (
            <FlexColumn className="items-end gap-6">
              <FlexRow className="w-full justify-between border-b border-gray-300 pb-4">
                <p className="text-lg font-semibold text-primary-600">
                  Hamro Coders
                </p>

                <FlexRow className="items-center justify-end gap-4">
                  <p className="text-md text-gray-500">
                    Exam: Computer Science
                  </p>
                  <TimeBox
                    startTimer={viewMode !== 'instructions' || timeOut < 1}
                    stopTimer={
                      questionCount === mcqData.questions_count || gameOver
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
              </FlexRow>
              <FlexRow className="w-full items-center justify-between gap-4">
                <FlexRow className="items-center gap-6">
                  <span className="font-medium">
                    Solved {0}/{mcqData.questions_count}
                  </span>
                  <FlexRow className="items-center gap-4">
                    <div className="flex items-center gap-1">
                      <span className="inline-block h-3 w-3 rounded-full bg-green-500"></span>
                      <span className="text-xs">Answered (0)</span>
                    </div>
                    {/* <div className="flex items-center gap-1">
                      <span className="inline-block h-3 w-3 rounded-full bg-yellow-500"></span>
                      <span className="text-xs">
                        Flagged ({Object.keys(flaggedQuestions).length})
                      </span>
                    </div> */}
                  </FlexRow>
                </FlexRow>
                <button
                  onClick={() => {}}
                  className="flex items-center gap-1 rounded bg-gray-200 px-2 py-1 text-xs hover:bg-gray-300"
                >
                  <Grid size={14} />
                  Overview
                </button>
              </FlexRow>
              {viewMode === 'instructions' ? (
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
              ) : (
                <>
                  {viewMode === 'questions' ? (
                    <FlexColumn className="w-full items-end gap-5">
                      <QuestionsView />
                      {/* <Accordion
                        type="single"
                        collapsible
                        value={openAccordion}
                        defaultValue={questionsChunk[
                          visibleQuestionChunkIndex
                        ]?.[0]?.id.toString()}
                        className="flex w-full flex-col gap-4"
                        onValueChange={setOpenAccordion}
                      >
                        {questionsChunk[visibleQuestionChunkIndex].map(
                          (question, questionIndex) => {
                            const isAccordionOpen =
                              question.id.toString() === openAccordion;
                            return (
                              <AccordionItem
                                value={question.id.toString()}
                                key={question.id}
                                className={`!rounded-md border transition-all duration-200 ease-in-out ${
                                  isAccordionOpen
                                    ? 'border-gray-300'
                                    : 'border-gray-300 hover:border-primary-400'
                                }`}
                              >
                                <AccordionTrigger
                                  className={`grid min-w-full grid-cols-[1fr_2rem] gap-2 p-2 ${isAccordionOpen ? 'border-b bg-gray-100' : 'border-0 opacity-50'} transition-all duration-200 ease-in-out hover:no-underline hover:opacity-100`}
                                >
                                  <FlexRow className="items-center gap-2">
                                    <p className="text-md font-semibold md:text-base">
                                      Q
                                      {getGlobalIndex(
                                        questionsChunk,
                                        visibleQuestionChunkIndex,
                                        questionIndex,
                                      ) + 1}
                                    </p>{' '}
                                    <p className="text-justify text-sm font-normal leading-[1.15rem] md:text-md">
                                      {question.question}
                                    </p>
                                  </FlexRow>
                                </AccordionTrigger>
                                <AccordionContent>
                                  <div className="grid select-none grid-cols-1 gap-2 px-2 py-4 md:grid-cols-2">
                                    {question.options.map(
                                      (option, optionIndex) => {
                                        const isOptionSelected =
                                          selectedOption[question.id]
                                            ?.answer === option.id;
                                        return (
                                          <MCQButton
                                            label={optionsLabel[optionIndex]}
                                            value={option.value}
                                            onClick={() =>
                                              setSelectedOption(
                                                prevSelections => {
                                                  return {
                                                    ...prevSelections,
                                                    [question.id]: {
                                                      answer: option.id,
                                                      section_id:
                                                        question.section_id,
                                                    },
                                                  };
                                                },
                                              )
                                            }
                                            isOptionSelected={isOptionSelected}
                                            key={`${question.id}-${option.id}`}
                                          />
                                        );
                                      },
                                    )}
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            );
                          },
                        )}
                      </Accordion> */}
                      {/* {questions.map((question, index) => {
                        if (index !== questionCount) return null;
                        return (
                          <Question
                            questionCount={questionCount}
                            questionData={question}
                            selectedOption={selectedOption}
                            handleOptionClick={() => {}}
                            key={question.id}
                          />
                        );
                      })} */}
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
                            visibleQuestionChunkIndex ===
                            questionsChunk.length - 1
                          }
                        >
                          NEXT
                        </Button>
                      </FlexRow>
                    </FlexColumn>
                  ) : (
                    <>
                      <FlexColumn className="flex w-full items-center gap-6 p-2 md:p-4">
                        <FlexColumn className="w-full items-center gap-1">
                          <p className="text-base font-semibold leading-4 md:text-lg md:leading-normal">
                            Challenge Completed
                          </p>
                          <p className="text-center text-sm leading-4 md:text-base">
                            You&apos;ve finished all the problems! Here&apos;s
                            your performance summary
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
                            <p className="text-base font-semibold">
                              Learning Resources
                            </p>
                          </FlexRow>
                          <FlexColumn className="items-start gap-4 pt-2">
                            <FlexRow className={`items-center gap-2`}>
                              <Icon
                                name="stacks"
                                className={`flex items-center justify-center text-primary-600`}
                              />
                              <p className="text-md text-primary-600">
                                Practice Exercises
                              </p>
                            </FlexRow>
                          </FlexColumn>
                        </FlexColumn>
                        {timeOut !== 0 && gameOver && (
                          <FlexColumn className="items-center">
                            <p className="text-center text-base font-medium leading-3">
                              Redirecting to Courses in{' '}
                              <span className="text-primary-500">
                                {timeOut}
                              </span>
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
                            setQuestionCount(0);
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
                  )}
                </>
              )}
            </FlexColumn>
          )}
        </div>
      </BindContentContainer>
    </MCQProvider>
  );
};

export default MCQBox;
