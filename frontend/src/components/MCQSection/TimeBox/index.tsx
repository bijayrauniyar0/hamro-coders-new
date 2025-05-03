import React, { useEffect } from 'react';
import { Clock } from 'lucide-react';

import { FlexRow } from '@Components/common/Layouts';
import useStopwatch from '@Hooks/useStopWatch';

import { useMCQContext } from '../Context/MCQContext';

const TimeBox = () => {
  const { viewMode, mcqData } = useMCQContext();
  const stopWatch = useStopwatch();
  useEffect(() => {
    if (viewMode !== 'questions') return;
    stopWatch.start();
  }, [viewMode]);
  useEffect(() => {
    if (stopWatch.time.minutes >= mcqData.time_limit) {
      stopWatch.stop();
    }
  }, [mcqData]);
  return (
    <FlexRow className="items-center gap-1">
      <Clock className="items-center h-4 w-4 md:h-5 md:w-5" />
      <FlexRow className="items-center justify-end gap-[1px] text-sm md:text-md">
        <span className="min-w-4">
          {stopWatch.time.minutes.toString().length < 2
            ? `0${stopWatch.time.minutes}`
            : stopWatch.time.minutes}
        </span>
        <span>:</span>
        <span className="min-w-4">
          {stopWatch.time.seconds.toString().length < 2
            ? `0${stopWatch.time.seconds}`
            : stopWatch.time.seconds}
        </span>
      </FlexRow>
    </FlexRow>
  );
};

export default TimeBox;
