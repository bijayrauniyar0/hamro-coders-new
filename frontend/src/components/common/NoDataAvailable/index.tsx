import React from 'react';
import { FlexColumn } from '../Layouts';
import noDataFound from '@Assets/images/no-data-found.png';

type NoDataAvailableProps = {
  className?: string;
};
const NoDataAvailable = ({ className }: NoDataAvailableProps) => {
  return (
    <FlexColumn className="items-center justify-center">
      <img
        src={noDataFound}
        alt=""
        className={`${className} aspect-square h-[18rem] w-[18rem] object-contain`}
      />
      <p className='text-xl font-medium'>No Data Available</p>
    </FlexColumn>
  );
};

export default NoDataAvailable;
