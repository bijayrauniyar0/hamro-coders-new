import { useRef, useState } from 'react';

const useStopwatch = () => {
  const [time, setTime] = useState<{
    minutes: number;
    seconds: number;
  }>({ minutes: 0, seconds: 0 });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const totalSecondsRef = useRef(0);

  const start = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      totalSecondsRef.current += 1;
      const minutes = Math.floor(totalSecondsRef.current / 60);
      const seconds = totalSecondsRef.current % 60;
      setTime({
        minutes,
        seconds,
      });
    }, 1000); // update once per second
  };

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const reset = () => {
    stop();
    totalSecondsRef.current = 0;
    setTime({ minutes: 0, seconds: 0 });
  };

  return { time, start, stop, reset };
};

export default useStopwatch;
