import React from 'react';
import Login from './Login';

const AuthenticationComponent = () => {
  return (
    <div className="grid grid-cols-2 h-screen items-center">
      <div>
        <Login />
      </div>
      <div className=""></div>
    </div>
  );
};

export default AuthenticationComponent;
