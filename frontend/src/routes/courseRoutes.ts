import { IRoute } from './type';
import Subjects from '@Components/Courses/Subjects';
import Courses from '@Components/Courses';

const courseRoutes: IRoute[] = [
  {
    name: 'Academics',
    path: '/',
    component: Courses,
    authenticated: true,
  },
  {
    name: 'Subjects',
    path: '/:course_id',
    component: Subjects,
    authenticated: true,
  },
];

export default courseRoutes;
