import React, { useEffect } from 'react';
import ModesBox from './ModesBox';
import { LeftCustomArrow, modesData, RightCustomArrow } from '@Constants/modes';
import Portal from '@Components/common/Layouts/Portal';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import { motion } from 'framer-motion';
import { cardVariants, containerVariants } from '@Animations/index';
import Slider, { Settings } from 'react-slick';
import useScreenWidth from '@Hooks/useScreenWidth';
import { useTypedDispatch, useTypedSelector } from '@Store/hooks';
import { setIsModesOpen, setSelectedMode } from '@Store/actions/common';
import Icon from '@Components/common/Icon';
import { Button } from '@Components/radix/Button';

type ModesProps = {
  handleNextClick: () => void;
};
const Modes = ({ handleNextClick }: ModesProps) => {
  const dispatch = useTypedDispatch();
  const selectedMode = useTypedSelector(
    state => state.commonSlice.selectedMode,
  );

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

  const handleModeClick = (value: string) => {
    dispatch(setSelectedMode(value));
  };

  const reactSlickSettings: Settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    centerPadding: '60px',
    className: 'center',
    adaptiveHeight: true,
    prevArrow: <LeftCustomArrow />,
    nextArrow: <RightCustomArrow />,
    afterChange: (currentSlide: number) => {
      dispatch(setSelectedMode(modesData[currentSlide].value));
    },
  };

  function getComponentAccordingToWidth() {
    switch (true) {
      case screenWidth > 1024:
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="mx-auto grid h-[80%] grid-cols-3 gap-8"
          >
            {modesData.map(mode => (
              <motion.div variants={cardVariants} key={mode.id}>
                <ModesBox
                  {...mode}
                  onClick={handleModeClick}
                  className={`${selectedMode === mode.value ? 'hover:ouline !outline-primary-600' : ''}`}
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
                  className={`${selectedMode === mode.value ? 'outline-primary-600' : 'outline-none'}`}
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
            <div
              className={`${!selectedMode ? 'cursor-not-allowed' : 'cursor-pointer'} mx-auto`}
            >
              <Button
                className="mx-auto w-[4rem] bg-[#8e1bedb5]"
                onClick={handleNextClick}
                disabled={!selectedMode}
              >
                Next
              </Button>
            </div>
          </FlexColumn>
        </FlexColumn>
      </div>
    </Portal>
  );
};

export default Modes;
