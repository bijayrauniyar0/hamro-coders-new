import React from 'react';

import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import { useTypedSelector } from '@Store/hooks';
import { ChatMessage } from '@Constants/Types/academics';

const MessageList = ({ messages }: { messages: ChatMessage[] }) => {
  const userProfile = useTypedSelector(state => state.commonSlice.userProfile);
  return (
    <FlexColumn className="items-start gap-3 px-4 py-4">
      {messages.map((discussion, index) => {
        const isMe = discussion.user.id === userProfile?.id;

        return (
          <FlexRow
            key={`discussion-${index}`}
            className={`w-full ${isMe ? 'justify-end' : 'justify-start'} ${discussion.status === 'sending' ? 'opacity-50' : ''}`}
          >
            <FlexRow className="items-end gap-4">
              {!isMe && (
                <img
                  src="https://randomuser.me/api/portraits/men/10.jpg"
                  alt=""
                  className="h-8 w-8 rounded-full"
                />
              )}
              <FlexColumn className="w-full items-start gap-1">
                {!isMe && (
                  <p className="pl-2 text-sm leading-3 text-gray-600 lg:text-md">
                    {discussion.user.name?.split(' ')[0]}
                  </p>
                )}
                <div
                  className={`rounded-full px-2 py-1 ${isMe ? 'bg-blue-100' : 'bg-gray-100'}`}
                >
                  <p className="text-sm lg:text-md">{discussion.message}</p>
                </div>
              </FlexColumn>
            </FlexRow>
          </FlexRow>
        );
      })}
    </FlexColumn>
  );
};

export default MessageList;
