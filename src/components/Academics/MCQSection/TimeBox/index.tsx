import Icon from '@Components/common/Icon';
import { FlexRow } from '@Components/common/Layouts';
import useStopwatch from '@Components/common/StopWatch';
import React, { useEffect } from 'react';

type TimeBoxProps = {
  startTimer: boolean;
  stopTimer: boolean;
};
const TimeBox = ({ startTimer, stopTimer }: TimeBoxProps) => {
  const stopWatch = useStopwatch();
  useEffect(() => {
    if (!startTimer) return;
    stopWatch.start();
    // setTimeout(() => {
    //   stopWatch.stop();
    // }, 3000);
    // console.log(selectedMode);
    // if (selectedMode === 'practice') return () => {};
    // if (selectedMode === 'rapid') {
    //   const intervalId = setInterval(() => {
    //     handleNextSkipClick('skip');
    //   }, 15000);

    //   return () => clearInterval(intervalId);
    // }
    // const timeoutId = setTimeout(() => {
    //   stopWatch.stop();
    // }, 3000);
    // return () => clearInterval(timeoutId);
  }, [startTimer]);
  useEffect(() => {
    if (!stopTimer) return;
    stopWatch.stop();
  }, [stopTimer]);
  return (
    <FlexRow className="items-center gap-1">
      <Icon name="access_alarm" className="flex items-center justify-center" />
      <FlexRow className="items-center gap-1">
        <span>{stopWatch.time.minutes}:</span>
        <span>{stopWatch.time.seconds}:</span>
        <span className="text-primary-500">{stopWatch.time.milliseconds}</span>
      </FlexRow>
    </FlexRow>
  );
};

export default TimeBox;
