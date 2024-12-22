import { useEffect, useRef } from 'react';

function useDebouncedEffect(effect: () => void, deps: any[], delay: number) {
  const handlerRef = useRef<number | null>(null);

  useEffect(() => {
    // Clear the existing timeout
    if (handlerRef.current !== null) {
      clearTimeout(handlerRef.current);
    }

    // Set a new timeout for the effect
    handlerRef.current = window.setTimeout(() => {
      effect();
    }, delay);

    // Cleanup function to clear the timeout
    return () => {
      if (handlerRef.current !== null) {
        clearTimeout(handlerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, delay]);
}

export default useDebouncedEffect;
