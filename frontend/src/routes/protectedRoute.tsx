import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import Spinner from '@Components/common/Spinner';

interface IProtectedRoute {
  isAuthenticated: boolean | null;
  redirectPath?: string;
  children?: ReactElement;
}
export default function ProtectedRoute({
  isAuthenticated,
  redirectPath = '/login',
  children,
}: IProtectedRoute): ReactElement {
  if (isAuthenticated === null) {
    return <Spinner />;
  }
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  return children || <Outlet />;
}
