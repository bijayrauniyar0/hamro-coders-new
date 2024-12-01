import React, { useEffect, useState } from 'react';
import { navbarData } from '@Constants/navbarData';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import NestedNavLink from '@Components/common/Navbar/NestedNavLink';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import AccountMenu from '@Components/common/Navbar/AccountMenu';
import Icon from '../Icon';
import Portal from '../Layouts/Portal';

const Navbar = () => {
  const { pathname } = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const navigate = useNavigate();
  const splittedPathname = pathname?.split('/');
  const [width, setWidth] = useState(window.innerWidth);
  // const token = localStorage.getItem('token');

  // useEffect(() => {
  //   if (!token) return;
  //   setCheckUser(true);
  // }, [token]);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className="mx-auto w-11/12">
        <div className="} flex h-[4.25rem] w-full items-center justify-between px-6">
          {dropdownOpen && (
            <div className="absolute left-0 top-0 z-50 h-screen w-screen bg-[#417EC9] opacity-10" />
          )}
          <div
            tabIndex={0}
            role="button"
            className="logo-container min-w-[9rem] cursor-pointer"
            onClick={() => navigate('/')}
          >
            <p className="text-xl font-semibold text-primary-700">
              Hamro Coders
            </p>
          </div>
          {width > 1120 && (
            <div className="flex items-center gap-x-9">
              {navbarData.map((navbarItem): React.ReactNode | null => {
                if (
                  (pathname.includes('admin') &&
                    navbarItem.name !== 'Admin Panel') ||
                  !pathname.includes('admin')
                ) {
                  return (
                    <div key={navbarItem.id} className="navbar-items h-full">
                      {!navbarItem.children && navbarItem.link ? (
                        <NavLink
                          className={() =>
                            splittedPathname?.length > 0 &&
                            navbarItem?.link?.split('/')?.[1] ===
                              splittedPathname[1]
                              ? 'border-b-2 border-transparent border-b-[#417EC9] p-3 text-base font-medium tracking-[-0.5px] text-matt-100 duration-200'
                              : 'border-b-2 border-transparent p-3 text-base font-medium tracking-[-0.5px] text-matt-100 duration-200 hover:text-[#417EC9]'
                          }
                          to={navbarItem.link}
                        >
                          {navbarItem.name}
                        </NavLink>
                      ) : (
                        <NestedNavLink
                          navbarItem={navbarItem}
                          setDropdownOpen={setDropdownOpen}
                        />
                      )}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          )}
          {pathname !== '/fsadfhsadh' && (
            <FlexRow className="items-center gap-6">
              <FlexRow className="items-center gap-4">
                {/* <Notification /> */}
                <AccountMenu />
              </FlexRow>
              {width <= 1120 && (
                <Icon
                  name="menu"
                  className="cursor-pointer"
                  onClick={() => setBurgerMenuOpen(true)}
                />
              )}
            </FlexRow>
          )}
        </div>
      </div>
      {burgerMenuOpen && (
        <Portal>
          <div className="absolute right-0 top-0 z-[100] h-screen w-[45%] overflow-hidden bg-white">
            <FlexColumn>
              <FlexRow className="items-center justify-between px-6 py-4">
                {/* <img src={dvsLogoNew} alt="logo" /> */}
                <Icon name="close" onClick={() => setBurgerMenuOpen(false)} />
              </FlexRow>
              <div className="h-[1px] w-full bg-primary-200" />
              <FlexColumn className="p-3">
                {navbarData.map((navbarItem): React.ReactNode | null => {
                  if (
                    (pathname.includes('admin') &&
                      navbarItem.name !== 'Admin Panel') ||
                    (!pathname.includes('admin') && pathname !== '/')
                  ) {
                    return (
                      <div
                        key={navbarItem.id}
                        className={`navbar-items flex h-[4rem] w-full items-center rounded-lg p-3 ${
                          splittedPathname?.length > 0 &&
                          navbarItem?.link?.split('/')?.[1] ===
                            splittedPathname[1]
                            ? 'bg-secondary-100'
                            : 'bg-transparent hover:bg-secondary-100'
                        }`}
                      >
                        {!navbarItem.children && navbarItem.link ? (
                          <NavLink
                            onClick={() => setBurgerMenuOpen(false)}
                            className={() =>
                              splittedPathname?.length > 0 &&
                              navbarItem?.link?.split('/')?.[1] ===
                                splittedPathname[1]
                                ? 'p-3 text-base font-medium tracking-[-0.5px] text-primary-600 duration-200'
                                : 'w-full p-3 text-base font-medium tracking-[-0.5px] text-matt-100 duration-200'
                            }
                            to={navbarItem.link}
                          >
                            {navbarItem.name}
                          </NavLink>
                        ) : (
                          <NestedNavLink
                            navbarItem={navbarItem}
                            setDropdownOpen={setDropdownOpen}
                          />
                        )}
                      </div>
                    );
                  }
                  return null;
                })}
              </FlexColumn>
            </FlexColumn>
          </div>
        </Portal>
      )}
      {/* </div> */}
    </>
  );
};

export default Navbar;
