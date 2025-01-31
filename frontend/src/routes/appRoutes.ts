import AcademicsPage from '@Views/Academics';
import { IRoute } from './type';
import DashboardPage from '@Views/Dashboard';
import ModesPage from '@Views/Modes';
import MCQBox from '@Components/Academics/MCQSection';
import AuthenticationComponent from '@Components/UserAuthentication';
import MCQ from '@Components/Academics/MCQSection';

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
    name: 'Academics',
    path: '/academics/:courseName',
    component: AcademicsPage,
    authenticated: true,
  },
  {
    name: 'Academics',
    path: '/:courseName/:subjectCode',
    component: ModesPage,
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
];

export default appRoutes;
