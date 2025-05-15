import { memo } from 'react';

import Avatar from '@Components/common/Avatar';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import { getInitialsFromName } from '@Utils/index';
import { ChatMessage } from '@Constants/Types/academics';

type MessageItemProps = {
  discussion: ChatMessage;
  isMe: boolean;
};
const MessageItem = memo(({ discussion, isMe }: MessageItemProps) => {
  function renderMessageWithMentions(message: string = '') {
    const parts = [];
    let lastIndex = 0;
    let match;

    const mentionRegex = /@\[([^\]]+)\]\((\d+)\)/g;

    while ((match = mentionRegex.exec(message)) !== null) {
      const [, name, id] = match;
      const start = match.index;

      if (start > lastIndex) {
        parts.push(message.slice(lastIndex, start));
      }
      parts.push(
        <a
          key={id}
          href={`/profile/${id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-blue-600"
        >
          @{name}
        </a>,
      );

      lastIndex = mentionRegex.lastIndex;
    }

    // Push any remaining text after the last mention
    if (lastIndex < message?.length) {
      parts.push(message.slice(lastIndex));
    }

    return parts;
  }
  return (
    <FlexRow
      className={`w-full ${isMe ? 'justify-end' : 'justify-start'} ${discussion.status === 'sending' ? 'opacity-50' : ''}`}
    >
      <FlexRow className="items-end gap-4">
        {!isMe && (
          <Avatar
            src={discussion.User?.avatar || ''}
            alt="User Avatar"
            className="h-8 w-8 rounded-full"
            fallback={getInitialsFromName(discussion.User?.name || '')}
          />
        )}
        <FlexColumn className="w-full items-start gap-1">
          {!isMe && (
            <p className="pl-2 text-sm leading-3 text-gray-600 lg:text-md">
              {discussion.User?.name?.split(' ')[0]}
            </p>
          )}
          <div
            className={`rounded-full px-2 py-1 ${isMe ? 'bg-blue-100' : 'bg-gray-100'}`}
          >
            <p className="text-sm lg:text-md">
              {renderMessageWithMentions(discussion.message)}
            </p>
          </div>
        </FlexColumn>
        {/* <p className="text-sm">{formatDate(discussion.created_at)}</p> */}
      </FlexRow>
    </FlexRow>
  );
});

export default MessageItem;
MessageItem.displayName = 'MessageItem';
