import React from 'react';

import BindContentContainer from '@Components/common/BindContentContainer';
import { FlexColumn } from '@Components/common/Layouts';
import { testInfo } from '@Constants/MockTests';

import Discussions from './Discussions';
import Reviews from './Reviews';
import TestInfo from './TestInfo';

const MockTestDetails = () => {
  return (
    <BindContentContainer className="max-w-full lg:px-6">
      <FlexColumn className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_30%] gap-4">
          <FlexColumn className="gap-6">
            <TestInfo {...testInfo} />
            <Reviews />
          </FlexColumn>
          <Discussions />
        </div>
      </FlexColumn>
    </BindContentContainer>
  );
};

export default MockTestDetails;
