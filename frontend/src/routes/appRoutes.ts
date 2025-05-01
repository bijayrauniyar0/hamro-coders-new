// import ModesPage from '@Views/Modes';
import Courses from '@Components/Courses';
import Subjects from '@Components/Courses/Subjects';
import AuthenticationComponent from '@Components/UserAuthentication';
import CoursesPage from '@Views/Courses';
import LeaderboardPage from '@Views/LeaderboardPage';
import MCQPage from '@Views/MCQPage';
import MyStatsPage from '@Views/MyStatsPage';

import { IRoute } from './type';

const appRoutes: IRoute[] = [
  {
    name: 'Login',
    path: '/login',
    component: AuthenticationComponent,
  },
  {
    name: 'Login',
    path: '/signup',
    component: AuthenticationComponent,
  },
  {
    name: 'Courses',
    path: '/courses/*',
    component: CoursesPage,
    authenticated: true,
  },
  {
    name: 'Leaderboard',
    path: '/leaderboard',
    component: LeaderboardPage,
  },
  {
    name: 'Analytics',
    path: '/analytics',
    component: MyStatsPage,
  },
  {
    name: 'Verify Email',
    path: '/verify-email',
    component: AuthenticationComponent,
  },
  {
    name: 'Academics',
    path: '/',
    component: Courses,
    authenticated: true,
  },
  {
    name: 'Subjects',
    path: '/courses/subjects/:course_id',
    component: Subjects,
    authenticated: true,
  },
  {
    name: 'MCQ',
    path: '/mcq/:course_id/*',
    component: MCQPage,
    authenticated: true,
  },
];

export default appRoutes;
