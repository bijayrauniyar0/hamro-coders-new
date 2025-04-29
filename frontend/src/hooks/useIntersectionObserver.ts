import { useEffect, useRef, useState } from 'react';

function useIntersectionObserver(): [boolean, any, any] {
  const rootRef = useRef(null);
  const viewRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const options = {
    root: rootRef?.current,
    rootMargin: '0px',
    threshold: 0,
  };
  const observer = new IntersectionObserver(
    ([entry]) => setIsIntersecting(entry.isIntersecting),
    options,
  );

  useEffect(() => {
    if (viewRef?.current) {
      observer.observe(viewRef?.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [observer, rootRef, viewRef]);

  return [isIntersecting, rootRef, viewRef];
}

export default useIntersectionObserver;
