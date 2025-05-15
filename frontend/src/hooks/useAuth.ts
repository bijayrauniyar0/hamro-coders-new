import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import useAuthStore from '@Store/auth';
import { checkLogin } from '@Services/common';

export default function useAuth() {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const { setIsAuthenticated } = useAuthStore();

  const {
    isSuccess: isUserLoggedIn,
    error,
    data: loggedInUserDetails,
  } = useQuery({
    queryKey: ['checkLogin'],
    queryFn: () => checkLogin(),
    select: ({ data }) => data?.isAuthenticated,
    retry: false,
  });
  useEffect(() => {
    const checkLoginError = error as AxiosError;
    if (isUserLoggedIn && loggedInUserDetails) {
      setIsAuth(true);
      setIsAuthenticated(true);
    } else if (checkLoginError?.response?.status === 401) {
      setIsAuth(false);
      setIsAuthenticated(false);
    }
  }, [error, isUserLoggedIn, loggedInUserDetails, setIsAuthenticated]);

  return isAuth;
}
