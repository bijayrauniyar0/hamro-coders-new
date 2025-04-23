import React from 'react';

import Icon from '@Components/common/Icon';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import { StatsCardProps } from '@Constants/Types/myStats';

const StatsCard = ({ icon, title, value }: StatsCardProps) => {
  return (
    <FlexRow className="w-[18rem] flex-1 items-center gap-4 rounded-lg border border-gray-300 bg-white py-2 px-4 md:p-4 shadow-sm">
      <div className="flex min-h-[3.5rem] min-w-[3.5rem] items-center justify-center rounded-full border-primary-600 bg-primary-100">
        <Icon name={icon} className="!text-xl md:!text-4xl text-purple-700 flex justify-center items-center" />
      </div>
      <FlexColumn>
        <p className="text-lg md:text-2xl font-semibold text-matt-100">{value}</p>
        <p className="text-sm md:text-md font-medium tracking-tight text-gray-600">{title}</p>
      </FlexColumn>
    </FlexRow>
  );
};

export default StatsCard;
