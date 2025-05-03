import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

import { Button } from '@Components/radix/Button';

export default function PageNotFound() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => (prev + 1) % 4);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="relative px-4 text-center">
        {/* Glitching 404 text */}
        <div className="relative inline-block">
          <h1 className="text-9xl font-mono font-bold tracking-tighter text-gray-800">
            4
            <span
              className={count % 2 === 0 ? 'text-primary-500' : 'text-gray-800'}
            >
              0
            </span>
            4
          </h1>

          {/* Glitch lines */}
          <div
            className={`absolute inset-0 ${count === 1 ? 'block' : 'hidden'}`}
          >
            <div className="absolute left-0 right-0 top-1/4 h-px -rotate-1 transform bg-primary-500"></div>
            <div className="absolute left-0 right-0 top-2/4 h-px rotate-1 transform bg-primary-500"></div>
            <div className="absolute left-0 right-0 top-3/4 h-px -rotate-2 transform bg-primary-500"></div>
          </div>
        </div>

        {/* Purple portal below the 404 */}
        <div className="relative mx-auto mt-2 h-1 w-40 rounded-full bg-primary-300">
          <div
            className={`absolute left-1/2 top-0 h-1 w-20 -translate-x-1/2 transform rounded-full bg-primary-500 transition-all duration-500 ease-in-out ${
              count % 4 === 0
                ? 'w-36'
                : count % 4 === 1
                  ? 'w-24'
                  : count % 4 === 2
                    ? 'w-16'
                    : 'w-32'
            }`}
          ></div>
        </div>

        {/* Simple message */}
        <p className="mx-auto mt-6 max-w-xs text-gray-600">
          This page has been pulled into another dimension.
        </p>

        {/* Simple home button */}
        <Button className="mt-8" onClick={() => navigate('/')}>
          <Home className="mr-2 h-4 w-4" />
          Return
        </Button>

        {/* Minimalist portal illustration */}
        <div className="relative mt-12">
          <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-full">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-300 to-primary-500">
              <div
                className={`absolute inset-0 transform bg-gradient-to-r from-transparent via-white to-transparent opacity-30 rotate-${count * 45} transition-transform duration-1000 ease-in-out`}
              ></div>
              <div
                className={`absolute inset-0 transform bg-gradient-to-b from-transparent via-white to-transparent opacity-30 -rotate-${count * 30} transition-transform duration-1000 ease-in-out`}
              ></div>
            </div>
          </div>
          <div
            className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white opacity-80"
            style={{
              boxShadow: '0 0 15px 5px rgba(170, 139, 211, 0.7)',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
