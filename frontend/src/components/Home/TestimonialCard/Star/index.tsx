// components/icons/HalfStar.tsx
import React from 'react';

const FullStar: React.FC<{ className?: string }> = ({
  className = 'w-5 h-5',
}) => (
  <svg
    className={`text-yellow-400 ${className}`}
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      d="M12 17.27L18.18 21l-1.63-7.03L22 9.24l-7.19-.61L12 2 9.19 
             8.63 2 9.24l5.45 4.73L5.82 21z"
    />
  </svg>
);

const HalfStar: React.FC<{ className?: string }> = ({
  className = 'w-5 h-5',
}) => (
  <svg
    className={`text-yellow-400 ${className}`}
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <defs>
      <linearGradient id="half-grad">
        <stop offset="50%" stopColor="currentColor" />
        <stop offset="50%" stopColor="transparent" stopOpacity="1" />
      </linearGradient>
    </defs>
    <path
      fill="url(#half-grad)"
      d="M12 17.27L18.18 21l-1.63-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 
         9.24l5.45 4.73L5.82 21z"
    />
  </svg>
);

export { HalfStar, FullStar };
