// import ModesPage from '@Views/Modes';
import AuthenticationComponent from '@Components/UserAuthentication';
import CoursesPage from '@Views/Courses';
import DashboardPage from '@Views/Dashboard';
import LeaderboardPage from '@Views/LeaderboardPage';

import { IRoute } from './type';

const appRoutes: IRoute[] = [
  {
    name: 'Dashboard',
    path: '/',
    component: DashboardPage,
  },
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
];

export default appRoutes;
