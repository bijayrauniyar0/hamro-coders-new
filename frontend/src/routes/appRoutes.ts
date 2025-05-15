// import ModesPage from '@Views/Modes';
import PageNotFound from '@Components/common/PageNotFound';
import MockTestDetails from '@Components/MockTestDetails';
import Streams from '@Components/Streams';
import Tests from '@Components/Streams/MockTestsComponent';
import TestimonialForm from '@Components/Testimonial';
import AuthenticationComponent from '@Components/UserAuthentication';
import EmailVerification from '@Components/UserAuthentication/Verification';
import UserProfile from '@Components/UserProfile';
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
    name: 'Verify Forgot Password',
    path: '/verify-forgot-password',
    component: AuthenticationComponent,
  },
  {
    name: 'Forgot Password',
    path: '/forgot-password',
    component: AuthenticationComponent,
  },
  {
    name: 'Reset Password',
    path: '/reset-password/:token',
    component: AuthenticationComponent,
  },
  {
    name: 'Email Verified',
    path: '/email-verification/:token',
    component: EmailVerification,
    authenticated: false,
  },
  {
    name: 'Testimonial',
    path: '/testimonial',
    component: TestimonialForm,
    authenticated: false,
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
    name: 'Mock Test',
    path: '/streams/mock-test/:stream_id/',
    component: MockTestDetails,
  },
  {
    name: 'MCQ',
    path: '/mcq/:stream_id/',
    component: MCQPage,
    authenticated: true,
  },
  {
    name: 'About Us',
    path: '/about-us',
    component: AboutUsPage,
    authenticated: false,
  },
  {
    name: 'Page Not Found',
    path: '*',
    component: PageNotFound,
  },
  {
    name: 'User Profile',
    path: '/user-profile',
    component: UserProfile,
  },
  // {
  //   name: 'Modes',
  //   path: '/test',
  //   component: UserProfileEditor,
  // },
];

export default appRoutes;
