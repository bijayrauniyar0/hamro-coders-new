import CoursesPage from '@Views/Courses';
import { IRoute } from './type';
import DashboardPage from '@Views/Dashboard';
// import ModesPage from '@Views/Modes';
import AuthenticationComponent from '@Components/UserAuthentication';
import LeaderboardPage from '@Views/LeaderboardPage';

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
