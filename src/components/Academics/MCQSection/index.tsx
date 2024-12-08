import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import { Button } from '@Components/radix/Button';
import { optionsLabel } from '@Constants/QuestionsBox';
import React, { useEffect, useState } from 'react';
import FromStepper from './FormStepper';
import Icon from '@Components/common/Icon';
import useStopwatch from '@Components/common/StopWatch';
import buttonPng from '@Assets/images/button.png';

const MCQBox = () => {
  const [currentQuestion, setCurrentQuestion] = useState<boolean[]>([]);
  const [questionCount, setQuestionCount] = useState(0);
  const data = [
    {
      id: 1,
      question: 'What is the capital of France?',
      options: [
        'Berlin',
        'Madrid',
        'Paris',
        'Lorem ipsum dolor sit amet consectetur adipisicing',
      ],
    },
    {
      id: 2,
      question: 'Which programming language is used for web development?',
      options: ['Python', 'JavaScript', 'C++', 'Ruby'],
    },
    {
      id: 3,
      question: 'What is the largest planet in the Solar System?',
      options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
    },
    {
      id: 4,
      question: 'Which country won the FIFA World Cup in 2018?',
      options: ['Germany', 'Brazil', 'France', 'Argentina'],
    },
    {
      id: 5,
      question: 'What is the boiling point of water at sea level?',
      options: ['90°C', '100°C', '110°C', '120°C'],
    },
    {
      id: 6,
      question: "Who wrote the play 'Romeo and Juliet'?",
      options: [
        'William Shakespeare',
        'Charles Dickens',
        'Mark Twain',
        'Jane Austen',
      ],
    },
    {
      id: 7,
      question: 'Which is the smallest continent by land area?',
      options: ['Australia', 'Europe', 'Antarctica', 'South America'],
    },
    {
      id: 8,
      question: 'What is the chemical symbol for gold?',
      options: ['Au', 'Ag', 'Go', 'Gd'],
    },
    {
      id: 9,
      question: 'Which animal is known as the King of the Jungle?',
      options: ['Lion', 'Tiger', 'Elephant', 'Cheetah'],
    },
    {
      id: 10,
      question: 'What is the square root of 64?',
      options: ['6', '7', '8', '9'],
    },
  ];
  const [selectedOption, setSelectedOption] = useState<string[]>([]);

  function handleNextSkipClick(clickType: string) {
    if (clickType === 'skip') {
      setCurrentQuestion((prevData: boolean[]) => [...prevData, false]);
    } else {
      setCurrentQuestion((prevData: boolean[]) => [...prevData, true]);
    }
    setQuestionCount(prevCount => prevCount + 1);
  }

  const stopWatch = useStopwatch();

  useEffect(() => {
    stopWatch.start();
    return () => stopWatch.stop(); // Clean up on unmount
  }, [stopWatch]);

  return (
    <>
      <FlexColumn className="w-full gap-8">
        <FromStepper
          currentQuestion={currentQuestion}
          questionCount={questionCount}
          questionData={data}
        />
        <div className="w-full">
          <div className="mx-auto w-full rounded-lg border bg-white p-4 shadow-lg md:w-4/5">
            <FlexColumn className="items-end gap-6 px-3 py-2 md:px-6 md:py-4">
              <FlexRow className="w-full justify-between">
                <FlexRow className="items-center gap-1">
                  <Icon
                    name="access_alarm"
                    className="flex items-center justify-center"
                  />
                  <FlexRow className="items-center gap-1">
                    <span>{stopWatch.time.minutes}:</span>
                    <span>{stopWatch.time.seconds}:</span>
                    <span className="text-primary-500">
                      {stopWatch.time.milliseconds}
                    </span>
                  </FlexRow>
                </FlexRow>
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
                {data.map((questionData, index) => {
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
