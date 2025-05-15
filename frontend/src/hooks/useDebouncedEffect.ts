import { useEffect, useRef } from 'react';

export default function useDebouncedEffect(
  effect: () => void,
  deps: any[],
  delay: number,
) {
  const handlerRef = useRef<number | null>(null);

  useEffect(() => {
    if (handlerRef.current !== null) {
      clearTimeout(handlerRef.current);
    }

    handlerRef.current = window.setTimeout(() => {
      requestAnimationFrame(effect);
    }, delay);

    return () => {
      if (handlerRef.current !== null) {
        clearTimeout(handlerRef.current);
      }
    };
  }, [...deps, delay]);
}
