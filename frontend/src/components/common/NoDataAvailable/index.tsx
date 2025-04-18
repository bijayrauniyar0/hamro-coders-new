import React from 'react';

import noDataFound from '@Assets/images/no-data-found.png';

import { FlexColumn } from '../Layouts';

type NoDataAvailableProps = {
  className?: string;
};
const NoDataAvailable = ({ className }: NoDataAvailableProps) => {
  return (
    <FlexColumn className="h-[calc(100vh-20rem)] items-center justify-center">
      <img
        src={noDataFound}
        alt=""
        className={`${className} aspect-square h-[14rem] w-[14rem] object-contain`}
      />
      <p className="text-xl font-medium">No Data Available</p>
    </FlexColumn>
  );
};

export default NoDataAvailable;
