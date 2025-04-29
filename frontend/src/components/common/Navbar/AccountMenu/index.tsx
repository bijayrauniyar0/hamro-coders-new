import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Icon from '@Components/common/Icon';
import { FlexRow } from '@Components/common/Layouts';
import Modal from '@Components/common/Modal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@Components/radix/DropDownMenu';
import { useTypedSelector } from '@Store/hooks';
import { avatars } from '@Constants/UserProfile';

import AccountSettings from './AccountSettings';

const AccountMenu = () => {
  const navigate = useNavigate();
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [isAccountSettingsOpen, setAccountSettingsOpen] = useState(false);
  const userProfile = useTypedSelector(state => state.commonSlice.userProfile);

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
          <div className="h-[2.2rem] w-[2.2rem] items-center justify-center rounded-full sm:h-[2.5rem] sm:w-[2.5rem]">
            <img
              src={avatars[userProfile?.avatar || 'bear']}
              alt="profile"
              className="w-full"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-[15rem] !p-0 shadow-[0px_2px_20px_4px_rgba(0,0,0,0.12)] sm:w-[17.5rem]"
        >
          <FlexRow className="items-center gap-3 border-b-[1px] border-[#D7D7D7] px-3 py-2">
            <div className="h-[2.2rem] w-[2.2rem] items-center justify-center rounded-full sm:h-[2.5rem] sm:w-[2.5rem]">
              <img
                src={avatars[userProfile?.avatar || 'bear']}
                alt="profile"
                className="w-full"
              />
            </div>
            <p className="line-clamp-1 text-sm font-bold uppercase text-[#475467] sm:text-base">
              {userProfile?.name || ''}
            </p>
          </FlexRow>
          <DropdownMenuItem
            className="flex cursor-pointer items-center gap-2 p-3 hover:!bg-primary-100"
            onClick={() => setAccountSettingsOpen(true)}
          >
            <Icon name="settings" className="text-[#475467]" />
            <p className="pb-1 text-md text-[#475467]">Account settings</p>
          </DropdownMenuItem>
          {/* <DropdownMenuItem
            className="flex cursor-pointer items-center gap-2 p-3 hover:!bg-primary-100"
            onClick={() => navigate('/stats')}
          >
            <Icon name="monitoring" className="text-[#475467]" />
            <p className="pb-1 text-md text-[#475467]">My Stats</p>
          </DropdownMenuItem> */}
          <DropdownMenuItem
            className="flex cursor-pointer items-center gap-2 p-3 hover:!bg-primary-100"
            onClick={handleLogout}
          >
            <Icon name="logout" className="text-[#475467]" />
            <p className="pb-1 text-md text-[#475467]">Logout</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isAccountSettingsOpen && (
        <Modal
          show={isAccountSettingsOpen}
          onClose={() => setAccountSettingsOpen(false)}
          title="Account Settings"
          className="!overflow-x-hidden"
        >
          <AccountSettings handleClose={() => setAccountSettingsOpen(false)} />
        </Modal>
      )}
    </>
  );
};

export default AccountMenu;
