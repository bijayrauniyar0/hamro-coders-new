// components/TestimonialCard.tsx
import React from 'react';

import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import { Testimonial } from '@Constants/Home';

import { FullStar, HalfStar } from './Star';

interface Props {
  testimonial: Testimonial;
}

const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;
  return (
    <>
      {Array.from({ length: fullStars }, (_, i) => (
        <FullStar key={i} className="h-4 w-4 md:h-5 md:w-5" />
      ))}
      {hasHalf && <HalfStar className="h-4 w-4 md:h-5 md:w-5" />}
    </>
  );
};

const TestimonialCard: React.FC<Props> = ({ testimonial }) => {
  return (
    <FlexColumn className="gap-4 rounded-lg bg-white p-4 shadow-md md:shadow-lg md:p-8">
      <FlexRow className="items-center gap-4">
        <img
          src={testimonial.imageUrl}
          alt={testimonial.name}
          className="h-8 w-8 rounded-full md:h-12 md:w-12"
        />
        <div>
          <p className="text-md font-bold leading-4 md:text-base md:leading-normal">
            {testimonial.name}
          </p>
          <p className="text-sm text-gray-600 md:text-md">{testimonial.role}</p>
        </div>
      </FlexRow>
      <p className="text-gray-700 text-sm md:text-md md:h-[5rem]">&quot;{testimonial.message}&quot;</p>
      <div className="flex">{renderStars(testimonial.rating)}</div>
    </FlexColumn>
  );
};

export default TestimonialCard;
