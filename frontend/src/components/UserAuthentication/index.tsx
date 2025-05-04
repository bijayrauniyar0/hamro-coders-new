import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { FlexRow } from '@Components/common/Layouts';
import singInImg from '@Assets/images/sign-in.jpg';
import useAuth from '@Hooks/useAuth';

import Login from './Login';
import Signup from './Signup';
import EmailVerified from './VerifyEmail';

const AuthenticationComponent = () => {
  const { pathname } = useLocation();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const getContent = () => {
    switch (pathname) {
      case '/login':
        return <Login />;
      case '/signup':
        return <Signup />;
      case '/verify-email':
        return <EmailVerified />;
      default:
        return <Login />;
    }
  };

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/streams');
    }
  }, []);
  return (
    <div className="grid h-screen grid-cols-12 bg-primary-50">
      <div className="col-span-12 md:col-span-6 lg:col-span-5 xl:col-span-4">
        {getContent()}
      </div>
      <div className="col-span-12 hidden md:col-span-6 md:block lg:col-span-7 xl:col-span-8">
        <FlexRow className="hidden h-screen w-full overflow-hidden md:block">
          <img
            src={singInImg}
            className="h-full w-full object-cover"
            alt="sidebar-banner"
          />
        </FlexRow>
      </div>
    </div>
  );
};

export default AuthenticationComponent;
