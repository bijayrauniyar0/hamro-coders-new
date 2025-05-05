// import ModesPage from '@Views/Modes';
import PageNotFound from '@Components/common/PageNotFound';
import Streams from '@Components/Streams';
import Tests from '@Components/Streams/TestsComponent';
import AuthenticationComponent from '@Components/UserAuthentication';
import AboutUsPage from '@Views/AboutUs';
import HomePage from '@Views/HomePage';
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
    name: 'Verify Email',
    path: '/verify-email',
    component: AuthenticationComponent,
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
    name: 'Academics',
    path: '/',
    component: HomePage,
    authenticated: false,
  },
  {
    name: 'Streams',
    path: '/streams',
    component: Streams,
    authenticated: false,
  },
  {
    name: 'Tests',
    path: '/streams/tests/:stream_id',
    component: Tests,
    authenticated: false,
  },
  {
    name: 'MCQ',
    path: '/mcq/:stream_id/*',
    component: MCQPage,
    authenticated: true,
  },
  {
    name: 'Page Not Found',
    path: '*',
    component: PageNotFound,
  },
  {
    name: 'About Us',
    path: '/about-us',
    component: AboutUsPage,
    authenticated: false,
  },
];

export default appRoutes;
