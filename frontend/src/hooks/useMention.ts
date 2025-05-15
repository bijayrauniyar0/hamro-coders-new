import { useEffect, useState } from 'react';
import getCaretCoordinates from 'textarea-caret';

import { ChatMessageUserType } from '@Constants/Types/academics';

// useMention.ts
export function useMention({
  message,
  userInChatList,
  inputRef,
}: {
  message: string;
  userInChatList: ChatMessageUserType[];
  inputRef: React.RefObject<HTMLTextAreaElement>;
}) {
  const [filteredUsers, setFilteredUsers] = useState<ChatMessageUserType[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);

  useEffect(() => {
    const lastAt = message.lastIndexOf('@', cursorPosition - 1);
    const isMentioning =
      lastAt !== -1 &&
      (lastAt === 0 || /\s/.test(message[lastAt - 1])) &&
      cursorPosition > lastAt;

    if (isMentioning) {
      const query = message.slice(lastAt + 1, cursorPosition);
      const filtered = userInChatList.filter(u =>
        u.name?.toLowerCase().startsWith(query.toLowerCase()),
      );
      setFilteredUsers(filtered);
      setIsDropdownVisible(filtered.length > 0);
    } else {
      setIsDropdownVisible(false);
      setFilteredUsers([]);
    }
  }, [cursorPosition, message, userInChatList]);

  const updateCursor = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCursorPosition(e.target.selectionStart ?? e.target.value.length);
  };

  const getDropdownPosition = () => {
    if (!inputRef.current) return { top: 0, left: 0 };
    const lastAtIndex = message.lastIndexOf('@');
    if (lastAtIndex === -1) return { top: 0, left: 0 };
    const coords = getCaretCoordinates(inputRef.current, lastAtIndex);
    return { left: coords.left + 30 };
  };

  return {
    filteredUsers,
    isDropdownVisible,
    updateCursor,
    getDropdownPosition,
    setIsDropdownVisible,
    setFilteredUsers,
    setCursorPosition,
  };
}
