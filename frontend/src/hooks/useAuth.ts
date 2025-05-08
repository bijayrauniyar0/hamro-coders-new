import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { checkLogin } from '@Services/common';

export default function useAuth() {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

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
    } else if (checkLoginError?.response?.status === 401) {
      setIsAuth(false);
    }
  }, [error, isUserLoggedIn, loggedInUserDetails]);

  return isAuth;
}
