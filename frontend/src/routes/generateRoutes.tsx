import { ReactNode, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Fallback from '@Components/common/Fallback';
import useAuth from '@Hooks/useAuth';

import ProtectedRoute from './protectedRoute';
import { IRoute } from './type';

interface IGenerateRouteProps {
  routes: IRoute[];
  fallback?: ReactNode;
}

const generateRoutes = ({
  routes,
  fallback = <Fallback />,
}: IGenerateRouteProps) => {
  const { isAuthenticated } = useAuth();
  return (
    <Suspense fallback={fallback}>
      <Routes>
        {routes.map(route => {
          if (route.authenticated) {
            return (
              <Route
                key={route.path}
                element={<ProtectedRoute isAuthenticated={isAuthenticated()} />}
              >
                {route?.children ? (
                  <Route key={route.name} path={route.path}>
                    {route?.children?.map(child => (
                      <Route
                        key={child.name}
                        path={child.path}
                        element={<child.component />}
                      />
                    ))}
                  </Route>
                ) : (
                  <Route
                    key={route.name}
                    path={route.path}
                    element={<route.component />}
                  />
                )}
              </Route>
            );
          }
          return route?.children ? (
            <Route key={route.name} path={route.path}>
              {route?.children?.map(child => (
                <Route
                  key={child.name}
                  path={child.path}
                  element={<child.component />}
                />
              ))}
            </Route>
          ) : (
            <Route
              key={route.name}
              path={route.path}
              element={<route.component />}
            />
          );
        })}
      </Routes>
    </Suspense>
  );
};

export default generateRoutes;
