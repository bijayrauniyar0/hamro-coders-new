import { Route, Routes } from 'react-router-dom';
import { ReactNode, Suspense } from 'react';
import Fallback from '@Components/common/Fallback';
import { IRoute } from './type';

interface IGenerateRouteProps {
  routes: IRoute[];
  fallback?: ReactNode;
}

const generateRoutes = ({
  routes,
  fallback = <Fallback />,
}: IGenerateRouteProps) => {
  return (
    <Suspense fallback={fallback}>
      <Routes>
        {routes.map(route => {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            >
              {route.children?.map(child => (
                <Route
                  key={child.path}
                  path={child.path}
                  element={<child.component />}
                />
              ))}
            </Route>
          );
        })}
      </Routes>
    </Suspense>
  );
};

export default generateRoutes;
