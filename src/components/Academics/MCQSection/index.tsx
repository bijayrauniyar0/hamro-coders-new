import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import { Button } from '@Components/radix/Button';
import {
  modesDescription,
  optionsLabel,
  questions,
} from '@Constants/QuestionsBox';
import React, { useCallback, useEffect, useState } from 'react';
import FromStepper from './FormStepper';
import buttonPng from '@Assets/images/button.png';
import { useNavigate, useSearchParams } from 'react-router-dom';
import TimeBox from './TimeBox';
import { useTypedSelector } from '@Store/hooks';
import { toast } from 'react-toastify';
import Modal from '@Components/common/Modal';

const MCQBox = () => {
  const [currentQuestion, setCurrentQuestion] = useState<boolean[]>([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(true);
  const [timeOut, setTimeOut] = useState(5);
  const selectedMode = useTypedSelector(
    state => state.commonSlice.selectedMode,
  );

  const [searchParams] = useSearchParams();
  const selectedModeParams = searchParams.get('selectedMode');
  const navigate = useNavigate();

  function handleNextSkipClick(clickType: string) {
    // if (questionCount === 9) {
    // }
    if (clickType === 'skip') {
      setCurrentQuestion((prevData: boolean[]) => [...prevData, false]);
    } else {
      setCurrentQuestion((prevData: boolean[]) => [...prevData, true]);
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
                <TimeBox startTimer={!showModal || timeOut < 1} />
                <FlexRow className="gap-4">
                  <p className="text-base">
                    <span className="font-medium">Solved: </span>
                    <span className="text-yellow-500">
                      {currentQuestion.filter(item => item === true).length}
                    </span>
                  </p>
                  <p className="text-base">
                    <span className="font-medium">Skipped: </span>
                    <span className="text-red-500">
                      {currentQuestion.filter(item => item === false).length}
                    </span>
                  </p>
                </FlexRow>
              </FlexRow>
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
                        {questionData.options.map((option, subIndex) => (
                          <div
                            className={`flex cursor-pointer items-center justify-start gap-4 rounded-lg border bg-white p-2 shadow-sm transition-all duration-200 ease-in-out hover:border-primary-400 md:p-4 ${selectedOption[questionCount] === option ? 'border-2 border-primary-400' : 'border-secondary-100'}`}
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
                        ))}
                      </div>
                    </FlexColumn>
                  );
                })}
              </div>

              <FlexRow className="gap-4">
                <Button
                  variant="secondary"
                  onClick={() => handleNextSkipClick('skip')}
                >
                  SKIP
                </Button>
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
