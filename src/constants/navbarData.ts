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
  link?: string;
  children?: IChildLinkData[];
}

export const navbarData: INavbarLinkData[] = [
  {
    id: 1,
    name: 'Academics',
    link: '/academics',
  },
  {
    id: 2,
    name: 'Coding',
    link: '/coding',
  },

  {
    id: 3,
    name: 'Gaming Zone',
    link: '/gaming-zone',
  },
  {
    id: 4,
    name: 'Data Bank',
    link: '/data-bank/report',
  },
  // {
  //   id: 5,
  //   name: 'Tutorial',
  //   link: '/dvs-tutorial',
  // },
];
