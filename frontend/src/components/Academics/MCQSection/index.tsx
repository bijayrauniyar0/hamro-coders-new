import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import { Button } from '@Components/radix/Button';
import {
  endStats,
  modesDescription,
  optionsLabel,
} from '@Constants/QuestionsBox';
import React, { useCallback, useEffect, useRef, useState } from 'react';
// import FromStepper from './FormStepper';
import buttonPng from '@Assets/images/button.png';
import { useNavigate, useSearchParams } from 'react-router-dom';
import TimeBox from './TimeBox';
import { useTypedSelector } from '@Store/hooks';
import { toast } from 'react-toastify';
import Modal from '@Components/common/Modal';
import Icon from '@Components/common/Icon';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getMcqAnswers, getMcqs } from '@Services/academics';
import Skeleton from '@Components/radix/Skeleton';
import NoDataAvailable from '@Components/common/NoDataAvailable';
import isEmpty from '@Utils/isEmpty';
import FromStepper from './FormStepper';
import { createLeaderboardEntry } from '@Services/leaderboard';

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
  const [currentQuestion, setCurrentQuestion] = useState<boolean[]>([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState<Record<string, any>[]>(
    [],
  );
  const [showModal, setShowModal] = useState(true);
  const [timeOut, setTimeOut] = useState(5);
  const selectedMode = useTypedSelector(
    state => state.commonSlice.selectedMode,
  );
  const [gameOver, setGameOver] = useState(false);
  const [modeToShow, setModeToShow] = useState<
    'answers' | 'question' | 'results'
  >('question');

  const [searchParams] = useSearchParams();
  const selectedModeParams = searchParams.get('selectedMode');
  const subject_code = searchParams.get('subject_code');
  const semester = searchParams.get('semester');
  const navigate = useNavigate();
  const resultsRef = useRef<{
    right: number;
    wrong: number;
    [key: string]: number;
  }>({
    right: 0,
    wrong: 0,
  });

  const { data: questions, isLoading: questionsIsLoading } = useQuery({
    queryKey: ['questions'],
    queryFn: () =>
      getMcqs({
        subject_code,
      }),
    select: ({ data }) => data as QuestionType[],
  });

  const { data: answers, isLoading: answersIsLoading } = useQuery({
    queryKey: ['answers'],
    queryFn: () =>
      getMcqAnswers({
        subject_code,
        questions: questions?.map(question => question.id).join(','),
      }),
    select: ({ data }) => data as AnswerType[],
    enabled: gameOver,
  });

  const { mutate: createLeaderboardRecord } = useMutation({
    mutationFn: (payload: Record<string, any>) =>
      createLeaderboardEntry(payload),
  });

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
    if (!selectedMode) {
      toast.error('Please select a mode to continue');
      setTimeout(() => {
        navigate('/academics/BCA');
      }, 500);
      return () => {};
    }
    startCountdown(5);
    if (selectedModeParams === 'practice') return () => {};
    if (selectedModeParams === 'rapid') {
      const intervalId = setInterval(() => {
        handleNextSkipClick('skip');
      }, 10000);

      return () => clearInterval(intervalId);
    }
    if (selectedModeParams === 'ranked') {
      setTimeout(() => {
        setQuestionCount(0);
        setModeToShow('answers');
      }, 600000);
    }

    const timeoutId = setTimeout(() => {
      // console.log("object");
    }, 3000);
    return () => clearInterval(timeoutId);
  }, [selectedModeParams]);

  useEffect(() => {
    if (!questions) return;
    if (questionCount === questions.length) {
      if (gameOver) {
        setModeToShow('results');
        if (selectedModeParams === 'ranked') {
          const payload = {
            subject_code,
            score: resultsRef.current.right,
            semester: Number(semester),
          };
          createLeaderboardRecord(payload);
        }
        startCountdown(5);
        setTimeout(() => {
          navigate('/academics/BCA');
        }, 6000);
        return;
      }
      setQuestionCount(0);
      setModeToShow('answers');
      setGameOver(true);
    }
  }, [questionCount]);

  useEffect(() => {
    if (!questions || !answers) return;
    const results = selectedOption.map(({ question_id, id }) => {
      const correctAnswer = answers.find(answer => answer.id === question_id);
      return {
        question_id,
        correct: correctAnswer?.answer === id, // Compare selected option with correct answer
      };
    });
    const rightAnswers = results.filter(result => result.correct).length;

    const wrongAnswers = questions.length - rightAnswers;
    resultsRef.current = {
      right: rightAnswers,
      wrong: wrongAnswers,
    };
  }, [answers, gameOver]);

  return (
    <>
      <Modal
        onClose={() => setShowModal(false)}
        isOpen={showModal && !!selectedMode}
        title={`${selectedMode?.toUpperCase()} MODE`}
      >
        <FlexColumn className="gap-4">
          <p>
            {
              modesDescription[
                (selectedMode as keyof typeof modesDescription) || 'practice'
              ]
            }
          </p>
          <p className="text-center text-base font-medium">
            Game starting in <span className="text-primary-500">{timeOut}</span>
          </p>
        </FlexColumn>
      </Modal>
      <FlexColumn className="w-full gap-8 pt-[8rem]">
        <FromStepper
          currentQuestion={currentQuestion}
          questionCount={questionCount}
          questionData={questions || []}
        />

        <div className="w-full">
          <div className="mx-auto w-full rounded-lg border bg-white p-4 shadow-lg md:w-4/5">
            {questionsIsLoading || answersIsLoading ? (
              <FlexColumn className="gap-6">
                <Skeleton className="h-20 w-full" />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {[...Array(4).keys()].map(key => (
                    <Skeleton key={key} className="h-16 w-full" />
                  ))}
                </div>
              </FlexColumn>
            ) : isEmpty(questions) || !questions ? (
              <NoDataAvailable />
            ) : (
              <FlexColumn className="items-end gap-6 px-3 py-2 md:px-6 md:py-4">
                <FlexRow className="w-full justify-between">
                  <TimeBox
                    startTimer={!showModal || timeOut < 1}
                    stopTimer={questionCount === questions.length || gameOver}
                  />
                  <FlexRow className="gap-4">
                    <p className="text-base">
                      <span className="font-medium">Solved: </span>
                      <span className="text-yellow-500">
                        {currentQuestion.filter(item => item === true).length}
                      </span>
                    </p>
                    {selectedModeParams !== 'practice' && (
                      <p className="text-base">
                        <span className="font-medium">Skipped: </span>
                        <span className="text-red-500">
                          {
                            currentQuestion.filter(item => item === false)
                              .length
                          }
                        </span>
                      </p>
                    )}
                  </FlexRow>
                </FlexRow>
                {modeToShow === 'question' ? (
                  <div className="w-full">
                    {questions.map((questionData, index) => {
                      if (index !== questionCount) return null;
                      return (
                        <FlexColumn className="gap-5" key={questionData.id}>
                          <p className="text-lg font-medium leading-5">
                            {questionData.question}
                          </p>
                          <div className="grid select-none grid-cols-1 gap-4 md:grid-cols-2">
                            {questionData.options.map(
                              ({ id, value }, subIndex) => {
                                const isOptionSelected =
                                  selectedOption[questionCount]?.id === id;
                                return (
                                  <div
                                    className={`flex cursor-pointer items-center justify-start gap-4 rounded-lg border bg-white p-2 shadow-sm transition-all duration-200 ease-in-out hover:border-primary-400 md:p-4 ${isOptionSelected ? 'border-primary-400' : 'border-gray-200'}`}
                                    key={subIndex}
                                    onClick={() => {
                                      setSelectedOption(
                                        (prevData: Record<string, any>[]) => {
                                          // Check if the option is already selected
                                          if (
                                            prevData[questionCount]?.id === id
                                          ) {
                                            // If selected, deselect it (remove it from the array)
                                            return prevData.filter(
                                              (_, index) =>
                                                index !== questionCount,
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
                                  >
                                    <div className="relative">
                                      <img
                                        src={buttonPng}
                                        className="max-h-[3rem] max-w-[3rem]"
                                      />
                                      <p className="left absolute left-1/2 top-1/2 z-50 translate-x-[-50%] translate-y-[-50%] text-lg font-bold text-white">
                                        {optionsLabel[subIndex]}
                                      </p>
                                    </div>
                                    <p className="text-sm leading-4 lg:text-base">
                                      {value}
                                    </p>
                                  </div>
                                );
                              },
                            )}
                          </div>
                        </FlexColumn>
                      );
                    })}
                  </div>
                ) : modeToShow === 'answers' && answers ? (
                  <div className="w-full">
                    {questions.map((questionData, index) => {
                      if (index !== questionCount) return null;
                      return (
                        <FlexColumn className="gap-5" key={questionData.id}>
                          <p className="text-lg font-medium leading-5">
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
                                const isCorrectAnswer = correctAnswer === id;

                                return (
                                  <div
                                    className={`flex cursor-pointer items-center justify-start gap-4 rounded-lg border p-2 shadow-sm transition-all duration-200 ease-in-out hover:border-primary-400 md:p-4 ${isOptionSelected && isCorrectAnswer ? 'bg-green-600 text-white' : ''} ${isOptionSelected && !isCorrectAnswer ? 'bg-red-400 text-white' : ''} ${!isOptionSelected && isCorrectAnswer ? 'bg-green-600 text-white' : ''}`}
                                    key={subIndex}
                                  >
                                    <div className="relative">
                                      <img
                                        src={buttonPng}
                                        className="max-h-[3rem] max-w-[3rem]"
                                      />
                                      <p className="left absolute left-1/2 top-1/2 z-50 translate-x-[-50%] translate-y-[-50%] text-lg font-bold text-white">
                                        {optionsLabel[subIndex]}
                                      </p>
                                    </div>
                                    <p className="text-sm leading-4 lg:text-base">
                                      {value}
                                    </p>
                                  </div>
                                );
                              },
                            )}
                          </div>
                        </FlexColumn>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex w-full items-center justify-center p-8">
                    <FlexColumn className="gap-8">
                      <FlexColumn className="gap-3">
                        <p className="text-xl font-medium">
                          Congrats! You made it till the end.
                        </p>
                        <FlexColumn className="gap-2">
                          <p className="text-base font-semibold">Your Stats:</p>
                          {endStats.map((stat, idx) => (
                            <FlexRow key={idx} className="items-center gap-2">
                              <Icon
                                name={stat.name}
                                className={`flex items-center justify-center ${stat.color}`}
                              />
                              <p className="text-base font-medium">{`${resultsRef.current[stat.keyName]} ${stat.text}`}</p>
                            </FlexRow>
                          ))}
                        </FlexColumn>
                      </FlexColumn>
                      {timeOut !== 0 && (
                        <p className="text-center text-base font-medium">
                          Redirecting to MCQs in{' '}
                          <span className="text-primary-500">{timeOut}</span>
                        </p>
                      )}
                    </FlexColumn>
                  </div>
                )}

                <FlexRow className="gap-4">
                  {selectedModeParams !== 'practice' && (
                    <Button
                      variant="secondary"
                      onClick={() => handleNextSkipClick('skip')}
                    >
                      SKIP
                    </Button>
                  )}
                  <Button
                    onClick={() => handleNextSkipClick('next')}
                    disabled={selectedOption[questionCount] === undefined}
                  >
                    NEXT
                  </Button>
                </FlexRow>
              </FlexColumn>
            )}
          </div>
        </div>
      </FlexColumn>
    </>
  );
};

export default MCQBox;
