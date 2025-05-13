import React, { useState } from 'react';

import BindContentContainer from '@Components/common/BindContentContainer';
import HeaderSwitchTab from '@Components/common/HeaderSwitchTab';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';

import ProfileTopBox from './ProfileTopBox';

const headerSwitchTab = [
  {
    id: 1,
    label: 'Profile',
    value: 'my-profile',
  },
  {
    id: 2,
    label: 'Password',
    value: 'password',
  },
  {
    id: 3,
    label: 'Settings',
    value: 'settings',
  },
];
const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('my-profile');
  return (
    <BindContentContainer>
      <FlexColumn className="gap-4">
        <ProfileTopBox />
        <div className="rounded-lg border border-gray-200 bg-white px-4 pt-4 shadow-sm">
          <div className="border-b border-gray-300">
            <HeaderSwitchTab
              headerOptions={headerSwitchTab}
              activeTab={activeTab}
              onChange={val => {
                setActiveTab(val);
              }}
            />
          </div>
        </div>
      </FlexColumn>
    </BindContentContainer>
  );
};

export default UserProfile;
