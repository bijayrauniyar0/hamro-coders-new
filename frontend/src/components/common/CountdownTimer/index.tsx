/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

interface CountdownTimerProps {
  initialSeconds: number; // Initial time in seconds
  onTimeUpdate: (newTime: number) => void; // Callback to send updated time to the parent
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  initialSeconds,
  onTimeUpdate,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft(prev => {
        const newTime = prev - 1;
        onTimeUpdate(newTime); // Call the callback with the updated time
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount or when secondsLeft changes
  }, [secondsLeft, onTimeUpdate]);

  // Convert total seconds into minutes:seconds format
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60); // Calculate minutes
    const secsRemain = secs % 60; // Get remaining seconds
    return `${mins.toString().padStart(2, '0')}:${secsRemain.toString().padStart(2, '0')}`;
  };

  return (
    <span className="text-sm ml-1 text-primary-700 font-semibold">
      {formatTime(secondsLeft)}
    </span>
  );
};

export default CountdownTimer;
