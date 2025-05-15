/* eslint-disable no-unused-vars */
import React from 'react';

import { ChatMessageUserType } from '@Constants/Types/academics';

const MentionDropdown = ({
  users,
  onSelect,
  position,
}: {
  users: ChatMessageUserType[];
  onSelect: (user: any) => void;
  position: { left: number };
}) => {
  return (
    <div
      className="absolute bottom-[5rem] rounded-lg border border-gray-300 bg-white shadow-md"
      style={{ left: `${position.left}px` }}
    >
      {users.map(user => (
        <div
          key={user.id}
          className="mention-item"
          onClick={() => onSelect(user)}
          style={{ padding: '5px', cursor: 'pointer' }}
        >
          @{user.name}
        </div>
      ))}
    </div>
  );
};

export default MentionDropdown;
