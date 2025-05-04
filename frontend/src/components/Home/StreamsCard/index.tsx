// components/StreamsCard.tsx
import React from 'react';

import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import { StreamsCardProps } from '@Constants/Home';

const StreamsCard: React.FC<StreamsCardProps> = ({
  Icon,
  title,
  description,
  iconColor,
  bgColor,
}) => {
  return (
    <FlexRow className="items-center rounded-lg bg-white p-4 gap-4 md:gap-6 shadow-md transition hover:shadow-lg md:p-6 md:shadow-lg lg:p-8">
      <div
        className={`${bgColor} flex h-8 w-8 items-center justify-center rounded-full md:h-10 md:w-10 lg:h-12 lg:w-12`}
      >
        <Icon className={`${iconColor} h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6`} />
      </div>
      <FlexColumn className="gap-1">
        <p className="text-base font-bold max-md:leading-3 md:text-lg">
          {title}
        </p>
        <p className="text-sm text-gray-600 md:text-base">{description}</p>
      </FlexColumn>
    </FlexRow>
  );
};

export default StreamsCard;
