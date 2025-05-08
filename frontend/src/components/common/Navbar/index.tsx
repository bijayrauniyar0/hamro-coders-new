import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import AccountMenu from '@Components/common/Navbar/AccountMenu';
import { Button } from '@Components/radix/Button';
import { navbarData } from '@Constants/navbarData';
import useAuth from '@Hooks/useAuth';

import Icon from '../Icon';

import Notification from './Notification';

const Navbar = () => {
  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);
  const isAuthenticated = useAuth();

  const closeBurgerMenu = () => {
    setBurgerMenuOpen(false);
  };

  const menuVariants = {
    hidden: { x: '100%' },
    visible: { x: 0 },
  };
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setBurgerMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <>
      <header className="sticky right-0 top-0 z-[10] flex w-full items-center justify-between bg-white px-4 py-1 shadow-custom xl:px-7">
        <div
          tabIndex={0}
          role="button"
          className="logo-container min-w-[9rem] cursor-pointer"
          onClick={() => navigate('/')}
        >
          <p className="text-xl font-bold text-primary-700">MockSewa</p>
        </div>
        {width > 768 && (
          <div className="flex items-center gap-x-9">
            {navbarData.map(navbarItem => (
              <NavLink
                key={navbarItem.id}
                className={({ isActive }) =>
                  `border-b-2 border-transparent px-3 py-2 text-base font-medium tracking-[-0.5px] text-matt-100 ${
                    isActive
                      ? 'border-b-primary-600 duration-200'
                      : 'duration-200 hover:text-primary-600'
                  }`
                }
                to={navbarItem.link}
              >
                {navbarItem.name}
              </NavLink>
            ))}
          </div>
        )}
        <FlexRow className="flex items-center gap-3 max-sm:gap-2">
          {isAuthenticated ? (
            <>
              <Notification />
              <AccountMenu />
            </>
          ) : (
            <Button
              className="!h-fit !rounded-full py-3 max-md:hidden"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          )}
          {width <= 768 && (
            <Icon
              name="menu"
              className="flex cursor-pointer items-center justify-center !text-2xl"
              onClick={() => setBurgerMenuOpen(true)}
            />
          )}
        </FlexRow>
      </header>
      <AnimatePresence>
        {burgerMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 z-[100] h-screen w-full bg-white"
          >
            <FlexColumn className="h-full">
              <FlexRow className="items-center justify-between px-6 py-4">
                <div tabIndex={0} role="button" onClick={() => navigate('/')}>
                  <p className="text-xl font-bold text-primary-700">MockSewa</p>
                </div>
                <Icon
                  name="close"
                  className="!text-2xl"
                  onClick={closeBurgerMenu}
                />
              </FlexRow>
              <FlexColumn className="w-full gap-1 p-4">
                {navbarData.map((navbarItem): React.ReactNode | null => {
                  return (
                    <NavLink
                      key={navbarItem.id}
                      onClick={closeBurgerMenu}
                      className={({ isActive }) =>
                        `rounded-lg px-3 py-4 text-md transition-all duration-300 ease-in-out hover:bg-primary-200 ${
                          isActive
                            ? 'bg-primary-200 font-medium text-primary-700'
                            : 'font-normal text-black hover:no-underline'
                        }`
                      }
                      to={navbarItem.link}
                    >
                      <FlexRow className="items-center gap-2">
                        <navbarItem.icon className="!h-5 !w-5 text-primary-700" />
                        {navbarItem.name}
                      </FlexRow>
                    </NavLink>
                  );
                })}
              </FlexColumn>
              {!isAuthenticated && (
                <FlexColumn className="w-full gap-6 px-6">
                  <Button
                    className="!h-fit w-full !rounded-full py-3"
                    onClick={() => {
                      navigate('/login');
                      closeBurgerMenu();
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    variant="secondary"
                    className="!h-fit w-full !rounded-full py-3"
                    onClick={() => {
                      navigate('/sign-up');
                      closeBurgerMenu();
                    }}
                  >
                    Sign Up
                  </Button>
                </FlexColumn>
              )}
            </FlexColumn>
          </motion.div>
        )}
      </AnimatePresence>
      {/* </div> */}
    </>
  );
};

export default Navbar;
