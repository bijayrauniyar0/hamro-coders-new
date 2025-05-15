/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { SendHorizonal as SendHorizontal } from 'lucide-react';
import getCaretCoordinates from 'textarea-caret';

import { FlexRow } from '@Components/common/Layouts';
import Textarea from '@Components/radix/TextArea';
import { UserMention } from '@Constants/Types/academics';

import MentionDropdown from '../MentionDropdown';

const MessageInputBox = ({
  onSend,
  userList,
  userInChatListLoading,
}: {
  onSend: (msg: string) => void;
  userList: any[];
  userInChatListLoading: boolean;
}) => {
  const [message, setMessage] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleCursorUpdate = (e: any) => {
    const newInput = e.target.value;
    setCursorPosition(e.target?.selectionStart ?? newInput?.length);
  };

  // const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   const newInput = e.target.value;
  //   const caretPos = e.target.selectionStart ?? newInput.length;

  //   setMessage(newInput);
  //   setCursorPosition(caretPos);
  // };
  function getMatchedUsers(newInput: string) {
    const mentionRegex = /@([\w\s]+)/g; // supports spaces like @john doe
    const matches = Array.from(newInput.matchAll(mentionRegex)).map(m =>
      m[1].toLowerCase().trim(),
    );

    if (!userList || userInChatListLoading) return [];

    return userList
      .filter(user => {
        if (!user.name) return false;
        return matches.includes(user.name?.toLowerCase().trim());
      })
      .map(user => ({
        id: user.id,
        name: user.name,
      }));
  }

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newInput = e.target.value;
    const caretPos = e.target.selectionStart ?? newInput.length;

    setMessage(newInput);
    setCursorPosition(caretPos);
  };

  useEffect(() => {
    if (!userList || userInChatListLoading) return;

    const lastAt = message.lastIndexOf('@', cursorPosition - 1);
    const isMentioning =
      lastAt !== -1 &&
      (lastAt === 0 || /\s/.test(message[lastAt - 1])) &&
      cursorPosition > lastAt;

    if (isMentioning) {
      const query = message.slice(lastAt + 1, cursorPosition);
      const filtered = userList.filter(u =>
        u.name?.toLowerCase().startsWith(query.toLowerCase()),
      );
      setFilteredUsers(filtered);
      setIsDropdownVisible(filtered.length > 0);
    } else {
      setIsDropdownVisible(false);
      setFilteredUsers([]);
    }
  }, [cursorPosition, message, userList, userInChatListLoading]);

  const getDropdownPosition = () => {
    if (!inputRef.current) return { top: 0, left: 0 };
    const lastAtIndex = message.lastIndexOf('@');
    if (lastAtIndex === -1) return { top: 0, left: 0 };
    const coords = getCaretCoordinates(inputRef.current, lastAtIndex);
    return { left: coords.left + 30 };
  };

  const handleUserSelect = (user: any) => {
    const mentionStartIndex = message.lastIndexOf('@');
    const beforeMention = message.slice(0, mentionStartIndex);
    const newInput = `${beforeMention}@[${user.name}](${user.id}) `;
    setMessage(newInput);
    setIsDropdownVisible(false);

    setTimeout(() => {
      if (!inputRef.current) return;
      const newPos = newInput.length;
      inputRef.current.setSelectionRange(newPos, newPos);
      inputRef.current.focus();
      setCursorPosition(newPos);
    }, 0);
  };
  const updatedMessage = useMemo(() => {
    const mentionRegex = /@\[(.*?)\]\((.*?)\)/g;
    return message.replace(mentionRegex, (_, __, id) => {
      const user = userList.find(u => u.id === Number(id));
      return user ? `@${user.name}` : '';
    });
  }, [message, userList]);

  return (
    <>
      {isDropdownVisible && (
        <MentionDropdown
          users={filteredUsers}
          onSelect={handleUserSelect}
          position={getDropdownPosition()}
        />
      )}
      <FlexRow className="items-center gap-2 px-4 py-4">
        <Textarea
          className="!h-[2rem] resize-none rounded-full !p-0 !px-4 !py-1 text-md"
          placeholder="Aa"
          value={updatedMessage}
          onChange={handleMessageChange}
          ref={inputRef}
          onClick={handleCursorUpdate}
          onKeyUp={handleCursorUpdate}
        />
        <button
          disabled={!message}
          className="group"
          onClick={() => {
            onSend(message);
            setMessage('');
          }}
        >
          <SendHorizontal className="text-primary-600 group-disabled:text-gray-300" />
        </button>
      </FlexRow>
    </>
  );
};

export default MessageInputBox;
