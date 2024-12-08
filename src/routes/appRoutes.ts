import AcademicsPage from '@Views/Academics';
import { IRoute } from './type';
import DashboardPage from '@Views/Dashbaord';
import ModesPage from '@Views/Modes';
import MCQBox from '@Components/Academics/MCQBox';

const appRoutes: IRoute[] = [
  {
    name: 'Dashboard',
    path: '/',
    component: DashboardPage,
  },
  {
    name: 'Academics',
    path: '/academics/:courseName',
    component: AcademicsPage,
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
    component: MCQBox,
  },
];

export default appRoutes;
