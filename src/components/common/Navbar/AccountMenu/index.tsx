/* eslint-disable no-unused-vars */
import { useState } from 'react';
import avatarLogo from '@Assets/images/avatar-images.svg';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@Components/radix/DropDownMenu';
import Icon from '@Components/common/Icon';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import Flex from '@Components/common/Layouts/Flex';
import { Button } from 'react-day-picker'
// import { NavLink, useNavigate } from 'react-router-dom';
// import { useTypedSelector } from '@Store/hooks';
// import { useDispatch } from 'react-redux';

const AccountMenu = () => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const [accountSettingsOpen, setAccountSettingsOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const hasProfilePicture = false;
  const userProfile = {
    username: 'Loop Verse',
    group_name: 'Admin',
  };
  // const userProfile = useTypedSelector(state => state?.common?.userProfile);

  return (
    <>
      <DropdownMenu
        open={accountDropdownOpen}
        onOpenChange={(openStatus: any) => setAccountDropdownOpen(openStatus)}
      >
        <DropdownMenuTrigger className="outline-none">
          <div className="relative">
            <div className="h-8 w-8 rounded-full bg-[#417EC9] pt-1.5">
              <p className="text-base font-medium uppercase leading-5 text-white">
                {/* {getInitialsFromString(userProfile?.username || '')} */}
                LV
              </p>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-[15rem] py-2 shadow-[0px_2px_20px_4px_rgba(0,0,0,0.12)] sm:w-[17.5rem]"
        >
          <FlexRow className="gap-3 border-b-[1px] border-[#D7D7D7] px-3 py-4">
            <div>
              {hasProfilePicture ? (
                <div className="h-[2.8rem] w-[2.8rem] items-center justify-center rounded-full sm:h-[3.5rem] sm:w-[3.5rem]">
                  <img src={avatarLogo} alt="profile" className="w-full" />
                </div>
              ) : (
                <Flex className="h-[2.8rem] w-[2.8rem] items-center justify-center rounded-full bg-[#417EC9] sm:h-[3.5rem] sm:w-[3.5rem]">
                  <p className="text-[1.5rem] uppercase text-white sm:text-[1.727rem]">
                    {/* {getInitialsFromString(userProfile?.username || '')} */}
                    LV
                  </p>
                </Flex>
              )}
            </div>
            <div className="line-clamp-3 text-[0.875rem]">
              <p className="line-clamp-1 text-[1.063rem] font-bold uppercase text-[#475467]">
                {userProfile?.username || ''}
              </p>
              <p className="text-[0.875rem] text-[#667085]">
                {userProfile?.group_name || ''}
              </p>
            </div>
          </FlexRow>
          <FlexColumn className="mt-3">
            <Button
              onClick={() => {
                setAccountDropdownOpen(false);
                // setAccountSettingsOpen(true);
              }}
            >
              <FlexRow className="items-center gap-2 p-3 hover:bg-[#F5FAFF]">
                <Icon name="settings" className="text-[#475467]" />
                <p className="pb-1 text-[0.938rem] text-[#475467]">
                  Account settings
                </p>
              </FlexRow>
            </Button>
          </FlexColumn>
          <FlexRow
            className="cursor-pointer items-center gap-2 p-3 hover:bg-[#F5FAFF]"
            // onClick={handleLogout}
          >
            <Icon name="logout" className="text-[#475467]" />
            <p className="pb-1 text-[0.938rem] text-[#475467]">Logout</p>
          </FlexRow>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default AccountMenu;
