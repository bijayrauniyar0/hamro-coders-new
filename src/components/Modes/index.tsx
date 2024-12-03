import React, { useEffect, useState } from 'react';
import ModesBox from './ModesBox';
import { modesData, reactSlickSettings } from '@Constants/modes';
import Portal from '@Components/common/Layouts/Portal';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import { motion } from 'framer-motion';
import { cardVariants, containerVariants } from '@Animations/index';
import Slider from 'react-slick';
import useScreenWidth from '@Hooks/useScreenWidth';
import { useTypedDispatch } from '@Store/hooks';
import { setIsModesOpen } from '@Store/actions/common';
import Icon from '@Components/common/Icon';
import { Button } from '@Components/radix/Button';

const Modes = () => {
  const dispatch = useTypedDispatch();
  const [clickedMode, setClickedMode] = useState<number>(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch(setIsModesOpen(false));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  const screenWidth = useScreenWidth();

  const handleModeClick = (id: number) => {
    setClickedMode(id);
  };

  function getComponentAccordingToWidth() {
    switch (true) {
      case screenWidth > 1024:
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="mx-auto flex flex-row items-center justify-center gap-8"
          >
            {modesData.map(mode => (
              <motion.div variants={cardVariants} key={mode.id}>
                <ModesBox
                  {...mode}
                  onClick={handleModeClick}
                  className={`${clickedMode === mode.id ? 'hover:ouline !outline-primary-600' : ''}`}
                />
              </motion.div>
            ))}
          </motion.div>
        );
      default:
        return (
          <Slider {...reactSlickSettings}>
            {modesData.map(mode => (
              <div className="h-full w-11/12" key={mode.id}>
                <ModesBox
                  key={mode.id}
                  {...mode}
                  onClick={handleModeClick}
                  className={`${clickedMode === mode.id ? 'outline-primary-600' : 'outline-none'}`}
                />
              </div>
            ))}
          </Slider>
        );
    }
  }
  return (
    <Portal>
      <Icon
        name="close"
        className="absolute right-8 top-6 z-50 cursor-pointer text-[2rem] text-white"
        onClick={() => dispatch(setIsModesOpen(false))}
      />
      <div className="absolute flex h-full w-full items-start justify-start bg-[#23043d66]">
        <FlexColumn className="mx-auto mt-[2rem] w-11/12 gap-[3rem] md:mt-0 md:gap-[5rem]">
          <FlexRow className="mt-[2rem] w-full items-center justify-center gap-4 overflow-hidden md:justify-normal lg:mt-[4rem]">
            <FlexRow className="!hidden w-full gap-8 sm:!flex">
              <motion.div
                className="h-1 w-[30%] bg-primary-400"
                initial={{ scaleX: 0, originX: 1 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                style={{ transformOrigin: '100% 50%' }}
              />
              <motion.div
                className="h-1 w-[60%] bg-primary-400"
                initial={{ scaleX: 0, originX: 1 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5 }}
                style={{ transformOrigin: '100% 50%' }}
              />
            </FlexRow>
            <p className="orbitron-regular has-dropshadow text-nowrap text-center text-[1.75rem] text-white md:text-[2.25rem]">
              Select Modes
            </p>
            <FlexRow className="!hidden w-full gap-8 overflow-hidden sm:!flex">
              <motion.div
                className="h-1 w-[60%] bg-primary-400"
                initial={{ scaleX: 0, originX: -1 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5 }}
                style={{ transformOrigin: '100% 50%' }}
              />
              <motion.div
                className="h-1 w-[30%] bg-primary-400"
                initial={{ scaleX: 0, originX: -1 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                style={{ transformOrigin: '100% 50%' }}
              />
            </FlexRow>
          </FlexRow>
          <FlexColumn className="gap-6">
            {getComponentAccordingToWidth()}
            <Button className="mx-auto w-[4rem] bg-[#8e1bedb5]">Next</Button>
          </FlexColumn>
        </FlexColumn>
      </div>
    </Portal>
  );
};

export default Modes;
