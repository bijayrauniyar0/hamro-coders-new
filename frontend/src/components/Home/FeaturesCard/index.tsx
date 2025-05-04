// components/FeatureCard.tsx
import React from 'react';

import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import { FeatureCardProps } from '@Constants/Home';

const FeatureCard: React.FC<FeatureCardProps> = ({
  Icon,
  title,
  description,
  iconColor,
  bgColor,
  className,
}) => {
  return (
    <FlexColumn className={`${className} flex-1 gap-1 md:gap-2`}>
      <FlexRow className="items-center gap-2">
        <div
          className={`${bgColor} flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 p-2 text-primary-600 md:h-12 md:w-12`}
        >
          <Icon className={`h-4 w-4 md:h-6 md:w-6 ${iconColor}`} />
        </div>
        <p className="text-base font-bold md:text-lg">{title}</p>
      </FlexRow>
      <p className="text-md text-gray-600 md:text-base">{description}</p>
    </FlexColumn>
  );
};

export default FeatureCard;
