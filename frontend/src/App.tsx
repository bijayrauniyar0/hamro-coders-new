import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';

import { setUserProfile } from '@Store/actions/common';
import { useTypedDispatch } from '@Store/hooks';
import { checkLogin, getUserProfile } from '@Services/common';

import Navbar from './components/common/Navbar';
import appRoutes from './routes/appRoutes';
import generateRoutes from './routes/generateRoutes';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { pathname } = useLocation();
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const routesWithoutNavbar = ['/login', '/signup'];
  const showNavbar = !routesWithoutNavbar.some(route =>
    pathname.includes(route),
  );

  const {
    isSuccess: isUserLoggedIn,
    isError: errorUserLogin,
    data: userId,
  } = useQuery({
    queryKey: ['checkLogin'],
    queryFn: () => checkLogin(),
    select: ({ data }) => data?.id,
    enabled: !!localStorage.getItem('token'),
  });

  const { isSuccess: userProfileIsFetched, data: userProfile } = useQuery({
    queryKey: ['user-profile', isUserLoggedIn, userId],
    queryFn: () => getUserProfile(),
    select: ({ data }) => data,
    enabled: isUserLoggedIn,
  });

  useEffect(() => {
    if (errorUserLogin) {
      localStorage.removeItem('token');
      navigate('/login');
    }
  }, [errorUserLogin]);

  useEffect(() => {
    if (userProfileIsFetched && userProfile) {
      dispatch(setUserProfile(userProfile));
    }
  }, [userProfileIsFetched, userProfile]);

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
