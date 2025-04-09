import BindContentContainer from '@Components/common/BindContentContainer';
import courseRoutes from '@Routes/courseRoutes';
import generateRoutes from '@Routes/generateRoutes';

const CoursesPage = () => {
  return (
    <BindContentContainer>
      <div className="mt-7">
        {generateRoutes({routes: courseRoutes})}
      </div>
    </BindContentContainer>
  );
};

export default CoursesPage;
