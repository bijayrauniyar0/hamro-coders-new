import React, { useEffect } from 'react';
import { Clock } from 'lucide-react';

import { FlexRow } from '@Components/common/Layouts';
import useStopwatch from '@Components/common/StopWatch';

type TimeBoxProps = {
  startTimer: boolean;
  stopTimer: boolean;
};
const TimeBox = ({ startTimer, stopTimer }: TimeBoxProps) => {
  const stopWatch = useStopwatch();
  useEffect(() => {
    if (!startTimer) return;
    stopWatch.start();
  }, [startTimer]);
  useEffect(() => {
    if (!stopTimer) return;
    stopWatch.stop();
  }, [stopTimer]);
  return (
    <FlexRow className="items-center gap-1">
      <Clock size={20} className='items-center' />
      <FlexRow className="items-center justify-end gap-1 text-sm md:text-md">
        <span className="w-4">{stopWatch.time.minutes}:</span>
        <span className="w-4">{stopWatch.time.seconds}</span>
      </FlexRow>
    </FlexRow>
  );
};

export default TimeBox;
