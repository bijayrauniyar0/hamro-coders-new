import CoursesPage from '@Views/Courses';
import { IRoute } from './type';
import DashboardPage from '@Views/Dashboard';
import ModesPage from '@Views/Modes';
import MCQBox from '@Components/Courses/MCQSection';
import AuthenticationComponent from '@Components/UserAuthentication';
import MCQ from '@Components/Courses/MCQSection';
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
    name: 'Coding',
    path: '/coding',
    component: MCQBox,
  },
  {
    name: 'MCQ',
    path: '/mcq',
    component: MCQ,
  },
  {
    name: 'Leaderboard',
    path: '/leaderboard',
    component: LeaderboardPage,
  },
];

export default appRoutes;
