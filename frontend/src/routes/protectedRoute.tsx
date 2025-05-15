import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

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
    toast.error('Please login to access this page');  
    return <Navigate to={redirectPath} replace />;
  }
  return children || <Outlet />;
}
