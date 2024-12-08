import { useRef, useState } from 'react';

const useStopwatch = () => {
  const [time, setTime] = useState(0); // Time in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const startTimeRef = useRef<number | null>(null); // Tracks when the stopwatch started
  const intervalRef = useRef<number | null>(null);

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      startTimeRef.current = Date.now() - time; // Account for the current elapsed time
      intervalRef.current = window.setInterval(() => {
        setTime(Date.now() - (startTimeRef.current ?? 0));
      }, 10);
    }
  };

  const stop = () => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(intervalRef.current as number);
      intervalRef.current = null;
    }
  };

  const reset = () => {
    stop();
    setTime(0);
    startTimeRef.current = null;
  };

  const getFormattedTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10); // Convert to 2 digits

    return {
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
      milliseconds: String(milliseconds).padStart(2, '0'),
    };
  };

  return { time: getFormattedTime(time), start, stop, reset, isRunning };
};

export default useStopwatch;
