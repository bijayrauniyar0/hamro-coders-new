import React from 'react';
import ModesBox from './ModesBox';
import { modesData } from '@Constants/modes';
import Portal from '@Components/common/Layouts/Portal';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import { motion } from 'framer-motion';
import { cardVariants, containerVariants } from '@Animations/index';
import Slider from 'react-slick';
import useScreenWidth from '@Hooks/useScreenWidth';

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Modes = () => {
  const screenWidth = useScreenWidth();

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
                <ModesBox {...mode} />
              </motion.div>
            ))}
          </motion.div>
        );
      default:
        return (
          <Slider {...settings} className="!h-auto">
            {modesData.map(mode => (
              <ModesBox key={mode.id} {...mode} />
            ))}
          </Slider>
        );
    }
  }
  return (
    <Portal>
      <div className="absolute flex h-full w-full items-center justify-center bg-[#23043d66]">
        <FlexColumn className="mx-auto w-11/12 gap-8">
          <FlexRow className="w-full items-center justify-center gap-4 overflow-hidden md:justify-normal">
            {screenWidth > 768 && (
              <FlexRow className="w-full gap-8">
                <motion.div
                  className="h-1 w-[30%] bg-primary-400"
                  initial={{ scaleX: 0, originX: 1 }} // Start from the center, scale to the left
                  animate={{ scaleX: 1 }} // Grow to the left
                  transition={{ duration: 0.3 }}
                  style={{ transformOrigin: '100% 50%' }} // Set the transform origin to the right side
                />
                <motion.div
                  className="h-1 w-[60%] bg-primary-400"
                  initial={{ scaleX: 0, originX: 1 }} // Start from the center, scale to the left
                  animate={{ scaleX: 1 }} // Grow to the left
                  transition={{ duration: 0.5 }}
                  style={{ transformOrigin: '100% 50%' }} // Set the transform origin to the right side
                />
              </FlexRow>
            )}

            <p className="orbitron-regular has-dropshadow text-nowrap text-center text-[2.25rem] text-white md:text-[3rem]">
              Select Modes
            </p>
            {screenWidth > 768 && (
              <FlexRow className="w-full gap-8 overflow-hidden">
                <motion.div
                  className="h-1 w-[60%] bg-primary-400"
                  initial={{ scaleX: 0, originX: -1 }} // Start from the center, scale to the left
                  animate={{ scaleX: 1 }} // Grow to the left
                  transition={{ duration: 0.5 }}
                  // style={{ transformOrigin: '100% 50%' }} // Set the transform origin to the right side
                />
                <motion.div
                  className="h-1 w-[30%] bg-primary-400"
                  initial={{ scaleX: 0, originX: -1 }} // Start from the center, scale to the left
                  animate={{ scaleX: 1 }} // Grow to the left
                  transition={{ duration: 0.3 }}
                  style={{ transformOrigin: '100% 50%' }} // Set the transform origin to the right side
                />
              </FlexRow>
            )}
          </FlexRow>
          {getComponentAccordingToWidth()}
        </FlexColumn>
      </div>
    </Portal>
  );
};

export default Modes;
