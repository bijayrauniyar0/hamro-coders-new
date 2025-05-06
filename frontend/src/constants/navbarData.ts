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
    name: 'Streams',
    link: '/streams',
  },

  {
    id: 3,
    name: 'Leaderboard',
    link: '/leaderboard',
  },
  {
    id: 4,
    name: 'Analytics',
    link: '/analytics',
  },
  {
    id: 5,
    name: 'About Us',
    link: '/about-us',
  },
];
