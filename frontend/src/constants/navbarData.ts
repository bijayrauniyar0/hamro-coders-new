export interface IChildLinkData {
  id: number;
  name: string;
  icon: string;
  shortDescription: string;
  link: string;
}

export interface INavbarLinkData {
  id: number;
  name: string;
  link: string;
  children?: IChildLinkData[];
}

export const navbarData: INavbarLinkData[] = [
  {
    id: 1,
    name: 'Courses',
    link: '/courses',
  },
  // {
  //   id: 2,
  //   name: 'Coding',
  //   link: '/coding',
  // },

  // {
  //   id: 3,
  //   name: 'Gaming Zone',
  //   link: '/gaming-zone',
  // },
  {
    id: 4,
    name: 'Leaderboard',
    link: '/leaderboard',
  },
  {
    id: 4,
    name: 'Analytics',
    link: '/analytics',
  },
];
