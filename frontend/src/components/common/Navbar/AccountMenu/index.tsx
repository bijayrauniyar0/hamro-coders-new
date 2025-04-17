import { useState } from 'react';
import avatarLogo from '@Assets/images/avatar-images.svg';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@Components/radix/DropDownMenu';
import Icon from '@Components/common/Icon';
import { FlexRow } from '@Components/common/Layouts';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';

const AccountMenu = () => {
  const navigate = useNavigate();
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const userProfile = {
    username: 'Loop Verse',
    group_name: 'Admin',
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    toast.success('Logout');
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
            <div className="h-8 w-8 rounded-full bg-primary-500 pt-1.5">
              <p className="text-base font-medium uppercase leading-5 text-white">
                {/* {getInitialsFromString(userProfile?.username || '')} */}
                LV
              </p>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-[15rem] !p-0 shadow-[0px_2px_20px_4px_rgba(0,0,0,0.12)] sm:w-[17.5rem]"
        >
          <FlexRow className="items-center gap-3 border-b-[1px] border-[#D7D7D7] px-3 py-2">
            <div className="h-[2.2rem] w-[2.2rem] items-center justify-center rounded-full sm:h-[2.5rem] sm:w-[2.5rem]">
              <img src={avatarLogo} alt="profile" className="w-full" />
            </div>
            <p className="line-clamp-1 text-sm font-bold uppercase text-[#475467] sm:text-base">
              {userProfile?.username || ''}
            </p>
          </FlexRow>
          <DropdownMenuItem
            className="flex cursor-pointer items-center gap-2 p-3 hover:bg-primary-100"
            onClick={() => {
              setAccountDropdownOpen(false);
              // setAccountSettingsOpen(true);
            }}
          >
            <Icon name="settings" className="text-[#475467]" />
            <p className="pb-1 text-md text-[#475467]">Account settings</p>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex cursor-pointer items-center gap-2 p-3 hover:bg-primary-100"
            onClick={handleLogout}
          >
            <Icon name="logout" className="text-[#475467]" />
            <p className="pb-1 text-md text-[#475467]">Logout</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default AccountMenu;
