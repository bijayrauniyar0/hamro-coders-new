// components/StreamsCard.tsx
import React from 'react';
import type { LucideIcon } from 'lucide-react';

import { FlexColumn, FlexRow } from '@Components/common/Layouts';

export interface StreamsCardProps {
  Icon: LucideIcon;
  title: string;
  description: string;
}

const StreamsCard: React.FC<StreamsCardProps> = ({
  Icon,
  title,
  description,
}) => {
  return (
    <FlexRow className="items-center rounded-lg bg-white p-4 md:shadow-lg md:p-6 shadow-md transition hover:shadow-lg lg:p-8">
      <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-600 md:h-10 md:w-10 lg:h-12 lg:w-12">
        <Icon className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />
      </div>
      <FlexColumn className="gap-1">
        <p className="text-base font-bold md:text-lg max-md:leading-3">{title}</p>
        <p className="text-sm text-gray-600 md:text-base">{description}</p>
      </FlexColumn>
    </FlexRow>
  );
};

export default StreamsCard;
