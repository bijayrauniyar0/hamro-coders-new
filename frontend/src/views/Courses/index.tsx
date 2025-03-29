import Courses from '@Components/Courses';
import BindContentContainer from '@Components/common/BindContentContainer';
import React from 'react';

const CoursesPage = () => {
  return (
    <BindContentContainer>
      <div className="mt-7">
        <Courses />
      </div>
    </BindContentContainer>
  );
};

export default CoursesPage;
