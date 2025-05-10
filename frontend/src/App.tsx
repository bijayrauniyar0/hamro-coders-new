import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';

import { setUserProfile } from '@Store/actions/common';
import { useTypedDispatch, useTypedSelector } from '@Store/hooks';
import { getUserProfile } from '@Services/common';

import Navbar from './components/common/Navbar';
import appRoutes from './routes/appRoutes';
import generateRoutes from './routes/generateRoutes';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { pathname } = useLocation();
  const dispatch = useTypedDispatch();
  const isAuthenticated = useTypedSelector(
    state => state.commonSlice.isAuthenticated,
  );
  const routesWithoutNavbar = [
    '/login',
    '/signup',
    '/verify-email',
    '/mcq',
    '/forgot-password',
    '/verify-forgot-password',
    '/reset-password',
  ];
  const showNavbar = !routesWithoutNavbar.some(route =>
    pathname.includes(route),
  );
  const { isSuccess: isUserDataFetched, data: loggedInUserDetails } = useQuery({
    queryKey: ['checkLogin', isAuthenticated],
    queryFn: () => getUserProfile(),
    select: ({ data }) => data,
    enabled: Boolean(isAuthenticated),
  });
  useEffect(() => {
    if (isUserDataFetched && loggedInUserDetails) {
      dispatch(setUserProfile(loggedInUserDetails));
    }
  }, [loggedInUserDetails, dispatch, isUserDataFetched]);
  return (
    <>
      {showNavbar && <Navbar />}
      <div className="absolute right-0 top-4 w-1/4">
        <ToastContainer />
      </div>
      {generateRoutes({ routes: appRoutes })}
    </>
  );
}

export default App;
