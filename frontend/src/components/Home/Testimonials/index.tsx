import React from 'react';
import Slider from 'react-slick';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import Skeleton from '@Components/radix/Skeleton';
import { testimonialSliderSettings, TestimonialType } from '@Constants/Home';
import { getTestimonials } from '@Services/testimonial';

import Section from '../Section';

import TestimonialSliderWrapper from './SliderWrapper';
import TestimonialCard from './TestimonialCard';

const Testimonials = () => {
  const { data: testimonialsList, isLoading: testimonialsIsLoading } = useQuery<
    AxiosResponse<TestimonialType[]>,
    Error,
    TestimonialType[]
  >({
    queryKey: ['testimonials'],
    queryFn: () => getTestimonials({}),
    select: ({ data }) => data,
  });

  return (
    <div className="z-[9] rounded-lg bg-gradient-to-tl from-primary-50 to-primary-100 px-1 pt-8 shadow-sm">
      <Section
        header="What Our Students Say"
        description="Hear from students who improved their scores and achieved their goals with MockSewa."
      >
        {testimonialsIsLoading ? (
          <Slider {...testimonialSliderSettings} className="w-full">
            {Array.from({ length: 6 }).map((_, i) => (
              <div className="w-full px-2" key={`skeleton-${i}`}>
                <Skeleton className="!h-[15rem] bg-white max-sm:w-[calc(100vw-7rem)] sm:w-[12rem] md:w-[15rem] lg:w-[20rem]" />
              </div>
            ))}
          </Slider>
        ) : (
          <TestimonialSliderWrapper
            childrenLength={testimonialsList?.length || 0}
          >
            {testimonialsList?.map((testimonial, i) => (
              <div className="px-2" key={(testimonial.id, i)}>
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </TestimonialSliderWrapper>
        )}
      </Section>
    </div>
  );
};

export default Testimonials;
