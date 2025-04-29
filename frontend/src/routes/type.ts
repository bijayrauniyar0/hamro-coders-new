 
export interface IRoute {
  id?: number;
  path: string;
  name?: string;
  component:
    | React.ComponentType<any>
    | React.LazyExoticComponent<React.ComponentType<any>>;
  children?: IRoute[];
  icon?: string;
  authenticated?:boolean;
}
