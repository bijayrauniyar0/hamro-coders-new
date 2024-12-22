/* eslint-disable no-unused-vars */
import { IDivProps } from '@Constants/interface';
import { createPortal } from 'react-dom';
import { useEffect, useLayoutEffect } from 'react';
// import { motion } from 'framer-motion';
import hasErrorBoundary from '@Components/common/hasErrorBoundary';

/**
 * This is a functional component called `PortalTemplate` that takes in a prop called `children` of
 * type `IDivProps`. It creates two variables `backdropNode` and `portalNode` by getting the elements
 * with ids `backdrop-root` and `overlay-root` respectively. */

function PortalTemplate({ children }: IDivProps) {
  const backdropNode = document.getElementById('backdrop-root');
  const portalNode = document.getElementById('overlay-root');
  useLayoutEffect(() => {});

  useEffect(() => {
    const { body } = document;
    body.style.overflow = 'hidden';
    body.style.paddingRight = '0px';

    return () => {
      document.body.style.overflow = 'auto';
      body.style.paddingRight = '0px';
    };
  }, []);

  return (
    <>
      {backdropNode
        ? createPortal(
            <div className="fixed left-0 top-0 z-[50] h-screen w-screen bg-black bg-opacity-50" />,
            backdropNode,
          )
        : null}
      {portalNode
        ? createPortal(
            <div className="fixed left-0 top-0 z-[50] h-screen w-screen bg-opacity-0">
              <div className="overlay-container relative h-full w-full">
                {children}
              </div>
            </div>,
            portalNode,
          )
        : null}
    </>
  );
}
export default hasErrorBoundary(PortalTemplate);
