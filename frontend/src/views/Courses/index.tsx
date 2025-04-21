import BindContentContainer from '@Components/common/BindContentContainer';
import courseRoutes from '@Routes/courseRoutes';
import generateRoutes from '@Routes/generateRoutes';

const CoursesPage = () => {
  return (
    <BindContentContainer>
      {generateRoutes({ routes: courseRoutes })}
    </BindContentContainer>
  );
};

export default CoursesPage;
