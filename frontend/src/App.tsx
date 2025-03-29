import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import appRoutes from './routes/appRoutes';
import generateRoutes from './routes/generateRoutes';
import Navbar from './components/common/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { checkLogin, getUserById } from '@Services/common';
import { useEffect } from 'react';
import { useTypedDispatch } from '@Store/hooks';
import { setUserProfile } from '@Store/actions/common';

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
    queryKey: ['user-profile'],
    queryFn: () => checkLogin(),
    select: ({ data }) => data?.id,
    enabled: !localStorage.getItem('token'),
  });

  const { isSuccess: userProfileIsFetched, data: userProfile } = useQuery({
    queryKey: ['user-profile', isUserLoggedIn, userId],
    queryFn: () => getUserById(userId),
    select: ({ data }) => data,
    enabled: isUserLoggedIn && !!userId,
  });

  useEffect(() => {
    if (errorUserLogin) {
      localStorage.removeItem('token');
      navigate('/login');
    }
  }, [errorUserLogin]);

  useEffect(() => {
    if (userProfileIsFetched) {
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
