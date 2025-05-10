import { BarChart3, BookOpen, Info, Trophy } from 'lucide-react';

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
  icon?: string;
  children?: IChildLinkData[];
}

export const navbarData = [
  { id: 1, name: 'Streams', link: '/streams', icon: BookOpen },
  { id: 3, name: 'Leaderboard', link: '/leaderboard', icon: Trophy },
  { id: 4, name: 'Analytics', link: '/analytics', icon: BarChart3 },
  { id: 5, name: 'About Us', link: '/about-us', icon: Info },
];
