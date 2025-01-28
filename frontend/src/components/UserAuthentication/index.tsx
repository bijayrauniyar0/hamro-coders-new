import React from 'react';
import Login from './Login';
import { FlexRow } from '@Components/common/Layouts';
import singInImg from '@Assets/images/sign-in.jpg';
import { useLocation } from 'react-router-dom';
import Signup from './Signup';

const AuthenticationComponent = () => {
  const { pathname } = useLocation();
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
  return (
    <div className="grid h-screen grid-cols-12">
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
