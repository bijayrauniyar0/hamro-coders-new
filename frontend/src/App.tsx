import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { setUserProfile } from '@Store/actions/common';
import { useTypedDispatch } from '@Store/hooks';
import useAuth from '@Hooks/useAuth';
import { checkLogin } from '@Services/common';

import Navbar from './components/common/Navbar';
import appRoutes from './routes/appRoutes';
import generateRoutes from './routes/generateRoutes';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { pathname } = useLocation();
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const routesWithoutNavbar = ['/login', '/signup', '/verify-email', '/mcq'];
  const showNavbar = !routesWithoutNavbar.some(route =>
    pathname.includes(route),
  );
  const {
    isSuccess: isUserLoggedIn,
    isError: errorUserLogin,
    error: loginError,
    data: loggedInUserDetails,
    refetch: checkLoggedInUser,
  } = useQuery({
    queryKey: ['checkLogin', isAuthenticated],
    queryFn: () => checkLogin(),
    select: ({ data }) => data?.user,
    enabled: true,
  });

  useEffect(() => {
    if (isAuthenticated) {
      checkLoggedInUser();
    }
  }, [isAuthenticated]);
  useEffect(() => {
    if (errorUserLogin) {
      const axiosError = loginError as AxiosError;
      if (axiosError?.response?.status === 401) {
        navigate('/login');
        dispatch(setUserProfile({}));
        return;
      }
    }
  }, [errorUserLogin]);

  useEffect(() => {
    if (isUserLoggedIn && loggedInUserDetails) {
      dispatch(setUserProfile(loggedInUserDetails));
    }
  }, [isUserLoggedIn, loggedInUserDetails, dispatch, setUserProfile]);

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
