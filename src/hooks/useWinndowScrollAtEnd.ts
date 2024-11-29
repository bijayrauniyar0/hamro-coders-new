import { useEffect, useState, useRef, useCallback } from 'react';

const useWindowScrollAtEnd = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [scrollAfterBottomCount, setScrollAfterBottomCount] = useState(0);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null); // Reference to store the timeout

  useEffect(() => {
    const handleScroll = (e: any) => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 1;

      setIsAtBottom(atBottom);

      if (atBottom && e.deltaY > 0) {
        // Clear the existing timeout if the user scrolls again
        if (debounceTimeout.current) {
          clearTimeout(debounceTimeout.current);
        }

        // Set a new timeout to increase the count after 500ms
        debounceTimeout.current = setTimeout(() => {
          setScrollAfterBottomCount(prevCount => prevCount + 1);
        }, 100);
      }
    };

    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current); // Cleanup timeout on unmount
      }
    };
  }, []);

  // Function to reset the scroll count
  const resetScrollCount = useCallback(() => {
    setScrollAfterBottomCount(0);
  }, []);

  return { isAtBottom, scrollAfterBottomCount, resetScrollCount };
};

export default useWindowScrollAtEnd;
