import React from 'react';

import Icon from '@Components/common/Icon';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import ToolTip from '@Components/radix/ToolTip';
import { StatsCardProps } from '@Constants/Types/myStats';

const StatsCard = ({ icon, title, value, tooltipMessage }: StatsCardProps) => {
  return (
    <FlexRow className="relative w-full items-center gap-4 rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm md:p-4">
      <div className="flex min-h-[2.5rem] min-w-[2.5rem] lg:min-h-[3.5rem] lg:min-w-[3.5rem] items-center justify-center rounded-full border-primary-600 bg-primary-100">
        <Icon
          name={icon}
          className="flex items-center justify-center !text-xl text-purple-700 md:!text-2xl lg:!text-4xl"
        />
      </div>
      <FlexColumn>
        <p className="text-lg font-semibold text-matt-100 lg:text-xl">
          {value}
        </p>
        <p className="text-sm font-medium tracking-tight text-gray-600 lg:text-md">
          {title}
        </p>
      </FlexColumn>
      {tooltipMessage && (
        <ToolTip
          name="info"
          className="absolute right-2 top-2"
          message={tooltipMessage}
        />
      )}
    </FlexRow>
  );
};

export default StatsCard;
