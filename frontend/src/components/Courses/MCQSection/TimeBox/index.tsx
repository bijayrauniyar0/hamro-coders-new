import React, { useEffect } from 'react';

import Icon from '@Components/common/Icon';
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
      <Icon name="access_alarm" className="flex items-center justify-center !text-xl !font-light" />
      <p className='font-medium text-sm md:text-md'>Time: </p>
      <FlexRow className="items-center gap-1 text-primary-600 text-sm md:text-md">
        <span>{stopWatch.time.minutes}:</span>
        <span>{stopWatch.time.seconds}:</span>
        <span>{stopWatch.time.milliseconds}</span>
      </FlexRow>
    </FlexRow>
  );
};

export default TimeBox;
