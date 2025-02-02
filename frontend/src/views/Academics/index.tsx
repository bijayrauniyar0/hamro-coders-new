import Academics from '@Components/Academics';
import BindContentContainer from '@Components/common/BindContentContainer';
import React from 'react';

const AcademicsPage = () => {
  return (
    <BindContentContainer>
      <div className="mt-7">
        <Academics />
      </div>
    </BindContentContainer>
  );
};

export default AcademicsPage;
