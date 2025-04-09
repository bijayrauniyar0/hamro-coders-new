import { IRoute } from './type';
import Subjects from '@Components/Courses/Subjects';
import Courses from '@Components/Courses';
import MCQBox from '@Components/Courses/MCQSection';

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
  {
    name: 'MCQ',
    path: '/:course_id/mcq/*',
    component: MCQBox,
    authenticated: true,
  },
];

export default courseRoutes;
