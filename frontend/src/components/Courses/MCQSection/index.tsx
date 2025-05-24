import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';

import BindContentContainer from '@Components/common/BindContentContainer';
import Icon from '@Components/common/Icon';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import NoDataAvailable from '@Components/common/NoDataAvailable';
import { Button } from '@Components/radix/Button';
import Skeleton from '@Components/radix/Skeleton';
import { getPercentageColor } from '@Utils/index';
import isEmpty from '@Utils/isEmpty';
import {
  endStats,
  optionsLabel,
} from '@Constants/QuestionsBox';
import {
  getMcqAnswers,
  getMcqs,
  getSubjectsMetaData,
} from '@Services/academics';
import { createLeaderboardEntry } from '@Services/leaderboard';

import MCQButton from './MCQButton';
import MCQSkeleton from './MCQSkeleton';
import Question from './Question';
import TimeBox from './TimeBox';

type Option = {
  id: number;
  value: string;
};

export type QuestionType = {
  question: string;
  options: Option[];
  id: number;
};
type AnswerType = {
  id: number;
  answer: number;
};

const MCQBox = () => {
  const handleBeforeUnload = useRef((event: BeforeUnloadEvent) => {
    event.preventDefault();
  });
  const startTimeRef = useRef(new Date());
  const metaDataRef = useRef<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState<boolean[]>([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState<Record<string, any>[]>(
    [],
  );
  const [showModal, setShowModal] = useState(true);
  const [timeOut, setTimeOut] = useState(5);
  const timeOutRef = useRef<NodeJS.Timeout>();

  const [gameOver, setGameOver] = useState(false);
  const [modeToShow, setModeToShow] = useState<
    'answers' | 'questions' | 'results'
  >('questions');

  const [searchParams] = useSearchParams();
  const subject_id = searchParams.get('subject_id');
  const { course_id } = useParams();
  const navigate = useNavigate();

  const [isRecordCreated, setIsRecordCreated] = useState(false);

  const {
    data: metaData,
    isLoading: metaDataIsLoading,
    isSuccess: metaDataFetched,
  } = useQuery({
    queryKey: ['answers'],
    queryFn: () => {
      return getSubjectsMetaData(subject_id || '');
    },
    select: ({ data }) => data,
  });

  useEffect(() => {
    if (metaDataFetched && metaData) {
      metaDataRef.current = {
        question_count: metaData.question_count,
        subject_id: metaData.subject_id,
        subject_name: metaData.subject_name,
      };
      startCountdown(5);
      const timeoutId = setTimeout(
        () => {
          setQuestionCount(0);
          setModeToShow('answers');
        },
        metaData?.time_limit * 60 * 1000 || 5000,
      );

      return () => clearInterval(timeoutId);
    }
    return () => {};
  }, [metaDataFetched]);

  const { data: questions, isLoading: questionsIsLoading } = useQuery({
    queryKey: ['questions', metaDataFetched],
    queryFn: () =>
      getMcqs({
        subject_id,
        question_count: metaData?.questions_count,
      }),
    select: ({ data }) => data as QuestionType[],
    enabled: metaDataFetched && !!metaData,
  });

  const { data: answers, isLoading: answersIsLoading } = useQuery({
    queryKey: ['answers'],
    queryFn: () =>
      getMcqAnswers({
        subject_id,
        questions: questions?.map(question => question.id).join(','),
      }),
    select: ({ data }) => data as AnswerType[],
    enabled: questionCount === (questions?.length ?? 0) - 1,
  });

  const { mutate: createLeaderboardRecord } = useMutation({
    mutationFn: (payload: Record<string, any>) =>
      createLeaderboardEntry(payload),
  });

  const results: { [key: string]: number } = useMemo(() => {
    if (!questions || !answers) return { right: 0, wrong: 0 };
    const results = selectedOption.map(({ question_id, id }) => {
      const correctAnswer = answers.find(answer => answer.id === question_id);
      return {
        question_id,
        correct: correctAnswer?.answer === id, // Compare selected option with correct answer
      };
    });
    const rightAnswers = results.filter(result => result.correct).length;

    const wrongAnswers = questions.length - rightAnswers;

    return {
      right: rightAnswers,
      wrong: wrongAnswers,
    };
  }, [answers]);

  const handleScoreSubmission = () => {
    const payload = {
      subject_id,
      score: results.right,
      elapsed_time: Math.floor(
        (new Date().getTime() - startTimeRef.current.getTime()) / 1000,
      ),
    };
    if (!isRecordCreated) {
      createLeaderboardRecord(payload);
    }
    setIsRecordCreated(true);
  };

  function handleNextSkipClick(clickType: string) {
    if (!gameOver) {
      const value = clickType === 'skip' ? false : true;
      setCurrentQuestion((prevData: boolean[]) => [...prevData, value]);
    }
    setQuestionCount(prevCount => prevCount + 1);
  }

  const startCountdown = useCallback((time: number) => {
    const interval = setInterval(() => {
      setTimeOut(time);
      time -= 1;
      if (time < 0) {
        clearInterval(interval);
        setShowModal(false);
      }
    }, 1000);
  }, []);

  useEffect(() => {
    const listener = handleBeforeUnload.current;

    window.addEventListener('beforeunload', listener);

    return () => {
      window.removeEventListener('beforeunload', listener);
    };
  }, []);

  const disableBeforeUnload = () => {
    window.removeEventListener('beforeunload', handleBeforeUnload.current);
  };

  useEffect(() => {
    if (!questions) return;
    if (questionCount === questions.length) {
      setModeToShow('results');
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
    <>
      <BindContentContainer>
        <div className="mx-auto w-full rounded-lg border bg-white p-2 shadow-lg md:w-4/5 md:p-4">
          {questionsIsLoading ? (
            <MCQSkeleton />
          ) : isEmpty(questions) || !questions ? (
            <NoDataAvailable />
          ) : (
            <FlexColumn className="items-end gap-6 px-3 py-2 md:px-6 md:py-4">
              <FlexRow className="w-full justify-between">
                <TimeBox
                  startTimer={!showModal || timeOut < 1}
                  stopTimer={questionCount === questions.length || gameOver}
                />
                <FlexRow className="items-center justify-center rounded-3xl bg-gray-100 px-2 py-1">
                  <p className="text-sm md:text-md">
                    <span className="font-medium">Solved: </span>
                    <span
                      className={`tracking-[-0.1rem] ${modeToShow === 'questions' ? getPercentageColor(questionCount, questions.length) : 'text-green-700'}`}
                    >
                      {currentQuestion.filter(item => item === true).length} /{' '}
                      {questions.length}
                    </span>
                  </p>
                </FlexRow>
              </FlexRow>
              {showModal ? (
                <div className="mx-auto min-h-[15rem] md:w-1/2">
                  {metaDataIsLoading ? (
                    <Skeleton className="h-[10rem] w-full" />
                  ) : (
                    <FlexColumn className="items-center gap-4 pt-8">
                      <p className="text-center">
                        {`Challenge yourself with ${metaData?.time_limit} minutes in total for each question. Every correct answer earns you ${metaData.negative_marking} point, but be careful—each wrong answer will cost you -${metaData?.marks_per_question || 1} points. Can you rise to the top and make your mark on the leaderboard?`}
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
                  {modeToShow === 'questions' ? (
                    <FlexColumn className="w-full items-end gap-5">
                      <div className="w-full">
                        {questions.map((questionData, index) => {
                          if (index !== questionCount) return null;
                          return (
                            <Question
                              questionCount={questionCount}
                              questionData={questionData}
                              selectedOption={selectedOption}
                              handleOptionClick={id => {
                                setSelectedOption(
                                  (prevData: Record<string, any>[]) => {
                                    // Check if the option is already selected
                                    if (prevData[questionCount]?.id === id) {
                                      // If selected, deselect it (remove it from the array)
                                      return prevData.filter(
                                        (_, index) => index !== questionCount,
                                      );
                                    } else {
                                      // If not selected, add it to the array at the specific index
                                      const updatedData = [...prevData];
                                      updatedData[questionCount] = {
                                        question_id: questionData.id,
                                        id,
                                      };
                                      return updatedData;
                                    }
                                  },
                                );
                              }}
                              key={questionData.id}
                            />
                            // <FlexColumn className="gap-5" key={questionData.id}>
                            //   <p className="text-md font-medium leading-5 md:text-lg">
                            //     {questionData.question}
                            //   </p>
                            //   <div className="grid select-none grid-cols-1 gap-4 md:grid-cols-2">
                            //     {questionData.options.map(
                            //       ({ id, value }, subIndex) => {
                            //         const isOptionSelected =
                            //           selectedOption[questionCount]?.id === id;
                            //         return (
                            //           <button
                            //             className={`flex cursor-pointer items-center justify-start gap-4 rounded-lg border bg-white p-2 shadow-sm transition-all duration-200 ease-in-out hover:border-primary-400 md:p-4 ${isOptionSelected ? 'border-primary-400' : 'border-gray-200'}`}
                            //             key={subIndex}
                            //             onClick={() => {
                            //               setSelectedOption(
                            //                 (
                            //                   prevData: Record<string, any>[],
                            //                 ) => {
                            //                   // Check if the option is already selected
                            //                   if (
                            //                     prevData[questionCount]?.id ===
                            //                     id
                            //                   ) {
                            //                     // If selected, deselect it (remove it from the array)
                            //                     return prevData.filter(
                            //                       (_, index) =>
                            //                         index !== questionCount,
                            //                     );
                            //                   } else {
                            //                     // If not selected, add it to the array at the specific index
                            //                     const updatedData = [
                            //                       ...prevData,
                            //                     ];
                            //                     updatedData[questionCount] = {
                            //                       question_id: questionData.id,
                            //                       id,
                            //                     };
                            //                     return updatedData;
                            //                   }
                            //                 },
                            //               );
                            //             }}
                            //           >
                            //             <MCQButton
                            //               label={optionsLabel[subIndex]}
                            //               value={value}
                            //             />
                            //           </button>
                            //         );
                            //       },
                            //     )}
                            //   </div>
                            // </FlexColumn>
                          );
                        })}
                      </div>
                      <Button
                        onClick={() => {
                          handleNextSkipClick('next');
                          if (questionCount === questions.length) {
                            setGameOver(true);
                            setModeToShow('results');
                          }
                        }}
                        disabled={selectedOption[questionCount] === undefined}
                      >
                        NEXT
                      </Button>
                    </FlexColumn>
                  ) : modeToShow === 'answers' && answers ? (
                    <>
                      <div className="w-full">
                        {questions.map((questionData, index) => {
                          if (index !== questionCount) return null;
                          return (
                            <FlexColumn className="gap-5" key={questionData.id}>
                              <p className="text-md font-medium leading-5 md:text-lg">
                                {questionData.question}
                              </p>
                              <div className="grid select-none grid-cols-1 gap-4 md:grid-cols-2">
                                {questionData.options.map(
                                  ({ id, value }, subIndex) => {
                                    const isOptionSelected =
                                      selectedOption[questionCount]?.id === id;
                                    const correctAnswer =
                                      answers?.find(
                                        answer =>
                                          Number(answer.id) === questionData.id,
                                      )?.answer || null;
                                    const isCorrectAnswer =
                                      correctAnswer === id;

                                    return (
                                      <button
                                        className={`flex cursor-pointer items-center justify-start gap-4 rounded-lg border p-2 shadow-sm md:p-4 ${isOptionSelected && isCorrectAnswer ? 'bg-green-600 text-white' : ''} ${isOptionSelected && !isCorrectAnswer ? 'bg-red-400 text-white' : ''} ${!isOptionSelected && isCorrectAnswer ? 'bg-green-600 text-white' : ''}`}
                                        key={subIndex}
                                      >
                                        <MCQButton
                                          label={optionsLabel[subIndex]}
                                          value={value}
                                        />
                                      </button>
                                    );
                                  },
                                )}
                              </div>
                            </FlexColumn>
                          );
                        })}
                      </div>
                      <FlexRow className="gap-4">
                        <Button
                          variant="secondary"
                          disabled={questionCount === 0}
                          onClick={() => {
                            setQuestionCount(questionCount - 1);
                          }}
                        >
                          PREV
                        </Button>
                        <Button
                          onClick={() => {
                            if (questionCount !== questions.length - 1) {
                              setQuestionCount(questionCount + 1);
                              return;
                            }
                            setGameOver(true);
                            setModeToShow('results');
                          }}
                        >
                          NEXT
                        </Button>
                      </FlexRow>
                    </>
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
                            setModeToShow('answers');
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
                            disableBeforeUnload();
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
    </>
  );
};

export default MCQBox;
