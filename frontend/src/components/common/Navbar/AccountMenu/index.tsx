import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

import Avatar from '@Components/common/Avatar';
import Icon from '@Components/common/Icon';
import { FlexRow } from '@Components/common/Layouts';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@Components/radix/DropDownMenu';
import { getInitialsFromName } from '@Utils/index';
import useAuthStore from '@Store/auth';
import { logoutUser } from '@Services/common';

const AccountMenu = () => {
  const navigate = useNavigate();
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const { setUserProfile, userProfile, setIsAuthenticated } = useAuthStore();

  const { mutate: logout, isPending: isLogoutLoading } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      toast.success('Logged Out Successfully');
      setUserProfile({});
      navigate('/login');
      setIsAuthenticated(false);
    },
  });
  const handleLogout = () => {
    logout();
  };
  const userAvatar = useMemo(() => {
    return (
      <Avatar
        src={userProfile.avatar}
        alt="User"
        fallback={getInitialsFromName(userProfile.name || '')}
        className="h-[2.2rem] w-[2.2rem] sm:h-[2.5rem] sm:w-[2.5rem]"
      />
    );
  }, [userProfile]);
  return (
    <>
      <DropdownMenu
        open={accountDropdownOpen}
        onOpenChange={(openStatus: any) => setAccountDropdownOpen(openStatus)}
      >
        <DropdownMenuTrigger className="outline-none">
          {userAvatar}
          {/* <Icon name="user" className="text-[#475467]" /> */}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-[15rem] !p-0 shadow-[0px_2px_20px_4px_rgba(0,0,0,0.12)] sm:w-[17.5rem]"
        >
          <FlexRow className="items-center gap-3 border-b-[1px] border-[#D7D7D7] px-3 py-2">
            {userAvatar}
            <p className="line-clamp-1 text-sm font-bold uppercase text-[#475467] sm:text-base">
              {userProfile?.name || ''}
            </p>
          </FlexRow>
          <DropdownMenuItem
            className="flex cursor-pointer items-center gap-2 p-3 hover:!bg-primary-100"
            onClick={() => navigate('/user-profile')}
          >
            <Icon name="settings" className="text-[#475467]" />
            <p className="pb-1 text-md text-[#475467]">My Profile</p>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex cursor-pointer items-center gap-2 p-3 hover:!bg-primary-100"
            onClick={handleLogout}
            disabled={isLogoutLoading}
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
