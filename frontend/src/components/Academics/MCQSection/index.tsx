import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import { Button } from '@Components/radix/Button';
import {
  endStats,
  modesDescription,
  optionsLabel,
  questions,
} from '@Constants/QuestionsBox';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import FromStepper from './FormStepper';
import buttonPng from '@Assets/images/button.png';
import { useNavigate, useSearchParams } from 'react-router-dom';
import TimeBox from './TimeBox';
import { useTypedSelector } from '@Store/hooks';
import { toast } from 'react-toastify';
import Modal from '@Components/common/Modal';
import Icon from '@Components/common/Icon';

const MCQBox = () => {
  const [currentQuestion, setCurrentQuestion] = useState<boolean[]>([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(true);
  const [timeOut, setTimeOut] = useState(5);
  const selectedMode = useTypedSelector(
    state => state.commonSlice.selectedMode,
  );
  const [gameOver, setGameOver] = useState(false);
  const [showQuestions, setShowQuestions] = useState(true);

  const [searchParams] = useSearchParams();
  const selectedModeParams = searchParams.get('selectedMode');
  const navigate = useNavigate();
  const resultsRef = useRef<{
    right: number;
    wrong: number;
    [key: string]: number;
  }>({
    right: 0,
    wrong: 0,
  });

  // const questions = useMemo(() => {
  //   return defaultQuestions;
  // }, [defaultQuestions, gameOver]);

  function handleNextSkipClick(clickType: string) {
    if (!gameOver) {
      if (clickType === 'skip') {
        setCurrentQuestion((prevData: boolean[]) => [...prevData, false]);
      } else {
        setCurrentQuestion((prevData: boolean[]) => [...prevData, true]);
      }
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
        // handleNextSkipClick('skip');
      }, 10000);

      return () => clearInterval(intervalId);
    }
    const timeoutId = setTimeout(() => {
      // console.log("object");
    }, 3000);
    return () => clearInterval(timeoutId);
  }, [selectedModeParams]);

  useEffect(() => {
    if (questionCount === questions.length) {
      if (gameOver) {
        setShowQuestions(false);
        startCountdown(5);
        setTimeout(() => {
          navigate('/academics/bca');
        }, 6000);
        return;
      }
      const rightAnswers = questions.filter(
        (questionx, index) => questionx.answer === selectedOption[index],
      ).length;
      const wrongAnswers = questions.length - rightAnswers;
      resultsRef.current = {
        right: rightAnswers,
        wrong: wrongAnswers,
      };
      setQuestionCount(0);
      setGameOver(true);
    }
  }, [questionCount]);

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
      <FlexColumn className="w-full gap-8">
        <FromStepper
          currentQuestion={currentQuestion}
          questionCount={questionCount}
          questionData={questions}
        />
        <div className="w-full">
          <div className="mx-auto w-full rounded-lg border bg-white p-4 shadow-lg md:w-4/5">
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
                        {currentQuestion.filter(item => item === false).length}
                      </span>
                    </p>
                  )}
                </FlexRow>
              </FlexRow>
              {showQuestions ? (
                <div className="w-full">
                  {questions.map((questionData, index) => {
                    if (index !== questionCount) return null;
                    return (
                      <FlexColumn className="gap-5" key={questionData.id}>
                        <p className="text-lg font-medium leading-5">
                          {questionData.question}
                        </p>
                        <div
                          className="grid select-none grid-cols-1 gap-4 md:grid-cols-2"
                          role="button"
                        >
                          {questionData.options.map((option, subIndex) => {
                            const isCorrectAnswer =
                              gameOver && option === questionData.answer;
                            const isSelectedWrongAnswer =
                              gameOver &&
                              selectedOption[questionCount] === option &&
                              option !== questionData.answer;
                            const isSelected =
                              selectedOption[questionCount] === option;
                            return (
                              <div
                                className={`flex cursor-pointer items-center ${isCorrectAnswer ? 'bg-[#e2ffe4]' : ''} ${isSelectedWrongAnswer ? 'bg-[#ffdbdb]' : ''} ${isSelected ? 'border-2 border-primary-400' : 'border-secondary-100'} justify-start gap-4 rounded-lg border bg-white p-2 shadow-sm transition-all duration-200 ease-in-out hover:border-primary-400 md:p-4`}
                                onClick={() => {
                                  setSelectedOption((prevData: string[]) => {
                                    // Check if the option is already selected
                                    if (prevData[questionCount] === option) {
                                      // If selected, deselect it (remove it from the array)
                                      return prevData.filter(
                                        (_, index) => index !== questionCount,
                                      );
                                    } else {
                                      // If not selected, add it to the array at the specific index
                                      const updatedData = [...prevData];
                                      updatedData[questionCount] = option;
                                      return updatedData;
                                    }
                                  });
                                }}
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
                                  {option}
                                </p>
                              </div>
                            );
                          })}
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
          </div>
        </div>
      </FlexColumn>
    </>
  );
};

export default MCQBox;
