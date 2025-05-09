import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { FlexRow } from '@Components/common/Layouts';
import singInImg from '@Assets/images/sign-in.jpg';
import { useTypedSelector } from '@Store/hooks';

import Login from './Login';
import Signup from './Signup';

const AuthenticationComponent = () => {
  const { pathname } = useLocation();
  const isAuthenticated = useTypedSelector(
    state => state.commonSlice.isAuthenticated,
  );
  const navigate = useNavigate();
  const getContent = () => {
    switch (pathname) {
      case '/login':
        return <Login />;
      case '/signup':
        return <Signup />;
      default:
        return <Login />;
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [pathname, navigate, isAuthenticated]);
  return (
    <div className="grid h-screen grid-cols-12 bg-primary-50">
      <div className="col-span-12 md:col-span-6 lg:col-span-5 xl:col-span-4">
        <FlexRow
          className="group absolute left-12 top-7 cursor-pointer items-center gap-2 text-primary-700"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-5 w-5 transition-transform duration-200 ease-in-out group-hover:-translate-x-2" />
          <p>Back To Home</p>
        </FlexRow>
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
