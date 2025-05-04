import React from 'react';

import Icon from '@Components/common/Icon';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import { StatsCardProps } from '@Constants/Types/myStats';

const StatsCard = ({ icon, title, value }: StatsCardProps) => {
  return (
    <FlexRow className="relative w-full items-center rounded-lg border border-gray-300 bg-white px-2 py-2 shadow-sm lg:gap-4 lg:p-3">
      <div className="border-primary-600bg-primary-600flex min-h-[2.5rem] min-w-[2.5rem] items-center justify-center rounded-full lg:min-h-[3.5rem] lg:min-w-[3.5rem]">
        <Icon
          name={icon}
          className="flex items-center justify-center !text-xl text-primary-700 md:!text-2xl lg:!text-4xl"
        />
      </div>
      <FlexColumn>
        <p className="text-sm font-semibold leading-4 text-matt-100 md:text-base md:leading-4 lg:text-lg lg:leading-normal">
          {value}
        </p>
        <p className="text-xs font-medium leading-4 tracking-tight text-gray-600 md:text-sm md:leading-4 lg:text-md lg:leading-normal">
          {title}
        </p>
      </FlexColumn>
    </FlexRow>
  );
};

export default StatsCard;
