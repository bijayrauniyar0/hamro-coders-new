import React, { useCallback, useEffect, useState } from 'react';

import { FlexColumn } from '@Components/common/Layouts';
import Skeleton from '@Components/radix/Skeleton';

import { useMCQContext } from '../Context/MCQContext';

const InstructionsView = () => {
  const { questionsIsLoading } = useMCQContext();
  const [timeOut, setTimeOut] = useState(5);

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
    <div className="mx-auto min-h-[15rem] md:w-1/2">
      {questionsIsLoading ? (
        <Skeleton className="h-[10rem] w-full" />
      ) : (
        <FlexColumn className="items-center gap-4 pt-8">
          <p className="text-center">
            {/* {modesDescription[selectedMode || 'practice']} */}
          </p>
          <p className="text-center text-base font-medium">
            Game starting in <span className="text-primary-500">{timeOut}</span>
          </p>
        </FlexColumn>
      )}
    </div>
  );
};

export default InstructionsView;
