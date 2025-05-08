import { useEffect, useState } from 'react';

export default function useAuth() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = document.cookie
      .split(';')
      .find(cookie => cookie.trim().startsWith('token='));
    // If token exists, set isAuth to true
    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []); // Empty dependency array ensures it runs only once on mount

  return isAuth;
}
