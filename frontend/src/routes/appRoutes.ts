// import ModesPage from '@Views/Modes';
import AuthenticationComponent from '@Components/UserAuthentication';
import VerificationFailed from '@Components/UserAuthentication/VerificationFailed';
import CoursesPage from '@Views/Courses';
import DashboardPage from '@Views/Dashboard';
import LeaderboardPage from '@Views/LeaderboardPage';
import MyStatsPage from '@Views/MyStatsPage';

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
    name: 'Verification Failed',
    path: '/verification-failed',
    component: VerificationFailed,
  },

  {
    name: 'Courses',
    path: '/courses/*',
    component: CoursesPage,
  },
  {
    name: 'Leaderboard',
    path: '/leaderboard',
    component: LeaderboardPage,
    authenticated: true,
  },
  {
    name: 'Analytics',
    path: '/analytics',
    component: MyStatsPage,
    authenticated: true,
  },
  {
    name: 'Verify Email',
    path: '/verify-email',
    component: AuthenticationComponent,
    authenticated: true,
  },
];

export default appRoutes;
