import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Icon from '@Components/common/Icon';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import { Button } from '@Components/radix/Button';
import { endStats } from '@Constants/QuestionsBox';

import { useMCQContext } from '../Context/MCQContext';

const ResultsView = () => {
  const { results } = useMCQContext();
  const timeOutRef = useRef<NodeJS.Timeout | null>();
  const intervalRef = useRef<NodeJS.Timeout | null>();
  const [timeOut, setTimeOut] = useState(5);
  const navigate = useNavigate();

  const startCountdown = useCallback((initialTime: number) => {
    let time = initialTime;

    intervalRef.current = setInterval(() => {
      setTimeOut(time);
      time -= 1;
      if (time < 0 && intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, 1000);
  }, []);

  useEffect(() => {
    startCountdown(timeOut);

    timeOutRef.current = setTimeout(() => {
      // navigate(`/leaderboard`);
    }, 10000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
        timeOutRef.current = null;
      }
    };
  }, [startCountdown]);

  const cancelTimeout = () => {
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current);
    }
  };

  return (
    <>
      <FlexColumn className="flex w-full items-center gap-6 p-2 md:p-4">
        <FlexColumn className="w-full items-center gap-1">
          <p className="text-base font-semibold leading-4 md:text-lg md:leading-normal">
            Challenge Completed
          </p>
          <p className="text-center text-sm leading-4 md:text-base">
            You&apos;ve finished all the problems! Here&apos;s your performance
            summary
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
                <p className="text-md font-medium leading-4 tracking-tight md:text-base md:tracking-normal">{`${results[stat.keyName as keyof typeof results]} ${stat.text}`}</p>
              </FlexRow>
            ))}
          </FlexColumn>
        </FlexColumn>
        {/* <FlexColumn className="w-full gap-4 rounded-lg bg-purple-50 px-2 py-4 md:px-6 md:py-6 md:pt-4">
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
        </FlexColumn> */}
        {timeOut !== 0 && (
          <FlexColumn className="items-center gap-1">
            <p className="text-center text-sm font-medium leading-4 md:text-md">
              Redirecting to Courses in{' '}
              <span className="text-primary-500">{timeOut}</span>
            </p>
            <Button
              variant="link"
              onClick={() => {
                cancelTimeout();
                navigate(`/leaderboard`);
              }}
              className="h-fit !py-0"
            >
              Redirect Now
            </Button>
          </FlexColumn>
        )}
      </FlexColumn>
    </>
  );
};

export default ResultsView;
