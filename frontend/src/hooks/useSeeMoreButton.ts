/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, RefObject, useRef } from 'react';

const useSeeMoreButton = (elementRef: RefObject<HTMLElement>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSeeMoreBtn, setShowSeeMoreBtn] = useState(false);

  // Ref to store the timeout ID
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateShowSeeMoreBtn = () => {
      if (elementRef.current) {
        const { scrollHeight, clientHeight } = elementRef.current;
        setShowSeeMoreBtn(scrollHeight > clientHeight);
      }
    };

    // Initial check
    updateShowSeeMoreBtn();

    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      resizeTimeoutRef.current = setTimeout(updateShowSeeMoreBtn, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [elementRef.current]);

  return { isOpen, setIsOpen, showSeeMoreBtn };
};

export default useSeeMoreButton;
