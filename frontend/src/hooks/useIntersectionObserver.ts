import { useEffect, useMemo, useRef, useState } from 'react';

type useIntersectionObserverProps = {
  threshold?: number;
};
function useIntersectionObserver({
  threshold = 0,
}: useIntersectionObserverProps): [boolean, any, any] {
  const rootRef = useRef(null);
  const viewRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const options = useMemo(
    () => ({
      root: rootRef?.current,
      rootMargin: '0px',
      threshold: threshold,
    }),
    [threshold],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      options,
    );

    if (viewRef?.current) {
      observer.observe(viewRef?.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [options, viewRef]);

  return [isIntersecting, rootRef, viewRef];
}

export default useIntersectionObserver;
