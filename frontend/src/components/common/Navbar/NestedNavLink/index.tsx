/* eslint-disable no-unused-vars */
import { NavLink } from 'react-router-dom';

import Icon from '@Components/common/Icon';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@Components/radix/DropDownMenu';
import { INavbarLinkData } from '@Constants/navbarData';

type nestedNavLinkProps = {
  navbarItem: INavbarLinkData;
  setDropdownOpen: (openStatus: boolean) => void;
};

const NestedNavLink = ({ navbarItem, setDropdownOpen }: nestedNavLinkProps) => {
  // const { pathname } = useLocation();
  return (
    <DropdownMenu onOpenChange={openStatus => setDropdownOpen(openStatus)}>
      <DropdownMenuTrigger className="group border-b-2 border-transparent px-3 py-2 !leading-[initial] outline-none duration-200 hover:border-b-[#417EC9]">
        <FlexRow className={`items-center`}>
          <p className="text-matt-100 text-base font-medium tracking-[0.00625rem] group-hover:text-[#417EC9]">
            {navbarItem.name}
          </p>
          <Icon
            name="arrow_drop_down"
            className="mt-1 group-hover:text-[#417EC9]"
          />
        </FlexRow>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="z-[60] w-[19.825rem] overflow-hidden rounded-lg bg-white p-0 !py-0 !shadow-[0px_0px_25px_0px_rgba(0,0,0,0.1)]"
        align="start"
      >
        <FlexColumn gap={6} className="p-6">
          {navbarItem.children?.map(navbarChildItem => (
            <NavLink key={navbarChildItem.id} to={navbarChildItem.link}>
              <DropdownMenuItem className="group flex cursor-pointer gap-4 !p-0 hover:text-[#06367D] focus:!bg-transparent">
                <Icon name={navbarChildItem.icon} />
                <FlexColumn>
                  <p className="text-matt-100 text-[1.125rem] font-medium leading-6 tracking-[-0.0225rem] group-hover:text-[#06367D]">
                    {navbarChildItem.name}
                  </p>
                  <p className="text-matt-200 text-base tracking-[-0.02rem]">
                    {navbarChildItem.shortDescription}
                  </p>
                </FlexColumn>
              </DropdownMenuItem>
            </NavLink>
          ))}
        </FlexColumn>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NestedNavLink;
