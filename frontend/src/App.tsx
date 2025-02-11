import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import appRoutes from './routes/appRoutes';
import generateRoutes from './routes/generateRoutes';
import Navbar from './components/common/Navbar';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { checkLogin, getUserById } from '@Services/common';
import { useEffect } from 'react';
import { useTypedDispatch } from '@Store/hooks';
import { setUserProfile } from '@Store/actions/common';

function App() {
  const { pathname } = useLocation();
  const dispatch = useTypedDispatch();

  const routesWithoutNavbar = ['/login', '/signup'];
  const showNavbar = !routesWithoutNavbar.some(route =>
    pathname.includes(route),
  );

  const { isSuccess: isUserLoggedIn, data: userId } = useQuery({
    queryKey: ['user-profile'],
    queryFn: () => checkLogin(),
    select: ({ data }) => data?.id,
  });

  const { isSuccess: userProfileIsFetched, data: userProfile } = useQuery({
    queryKey: ['user-profile'],
    queryFn: () => getUserById(userId),
    select: ({ data }) => data,
    enabled: isUserLoggedIn && !!userId,
  });

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
