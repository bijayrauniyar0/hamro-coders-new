// components/FeatureCard.tsx
import React from 'react';

import { FeatureCardProps } from '@Constants/Home';

const FeatureCard: React.FC<FeatureCardProps> = ({
  Icon,
  title,
  description,
}) => {
  return (
    <div className="rounded-lg bg-white p-4 shadow-md md:shadow-lg md:p-6 lg:p-8">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 p-2 text-primary-600 md:h-12 md:w-12">
        <Icon className="h-4 w-4 md:h-6 md:w-6" />
      </div>
      <p className="font-bold text-base md:text-lg">{title}</p>
      <p className="text-gray-600 text-md md:text-base">{description}</p>
    </div>
  );
};

export default FeatureCard;
