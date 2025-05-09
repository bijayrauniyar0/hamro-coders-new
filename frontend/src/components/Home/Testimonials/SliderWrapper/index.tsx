import React from 'react';
import Slider from 'react-slick';

import { testimonialSliderSettings } from '@Constants/Home';

type TestimonialSliderWrapperProps = {
  children: React.ReactNode;
  childrenLength: number;
};
const TestimonialSliderWrapper = ({
  children,
  childrenLength,
}: TestimonialSliderWrapperProps) => {
  return (
    <>
      {childrenLength > 1 ? (
        <Slider {...testimonialSliderSettings} className="w-full">
          {children}
        </Slider>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2">{children}</div>
      )}
    </>
  );
};

export default TestimonialSliderWrapper;
