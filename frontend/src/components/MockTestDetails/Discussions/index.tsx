import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

import { useTypedSelector } from '@Store/hooks';
import { ChatMessage, ChatMessageUserType } from '@Constants/Types/academics';
import { getAllUsersInDiscussion } from '@Services/discussion';
import { apiURL } from '@Services/index';

import MessageInputBox from './MessageInputBox';
import MessageList from './MessagesList';

const socket = io(apiURL, { withCredentials: true });

const Discussions = () => {
  const [searchParams] = useSearchParams();
  const mock_test_id = searchParams.get('test_id');
  const [newMessages, setNewMessages] = useState<ChatMessage[]>([]);
  const userProfile = useTypedSelector(state => state.commonSlice.userProfile);
  const joinRoom = useRef(false);

  const { data: userInChatList, isLoading: userInChatListLoading } = useQuery<
    AxiosResponse<ChatMessageUserType[]>,
    Error,
    ChatMessageUserType[]
  >({
    queryKey: ['userInChatList', mock_test_id],
    queryFn: () => getAllUsersInDiscussion(mock_test_id || ''),
    select: res => res?.data,
    enabled: !!mock_test_id,
  });

  const handleReceiveMessage = useCallback((data: ChatMessage) => {
    setNewMessages(prev => {
      const index = prev.findIndex(msg => msg.messageId === data.messageId);
      if (index !== -1) {
        const updated = [...prev];
        updated[index] = { ...updated[index], status: 'delivered' };
        return updated;
      } else {
        return [...prev, data];
      }
    });
  }, []);

  useEffect(() => {
    if (!joinRoom.current && mock_test_id) {
      socket.emit('joinRoom', mock_test_id);
      joinRoom.current = true;
    }

    socket.on('receiveMessage', handleReceiveMessage);

    return () => {
      socket.off('receiveMessage', handleReceiveMessage);
    };
  }, [handleReceiveMessage, mock_test_id]);

  const sendMessage = (message: string) => {
    const messageId = uuidv4();
    const messagePayload = {
      mock_test_id,
      message,
      user: userProfile.id,
      status: 'sending',
      messageId,
    };

    socket.emit('sendMessage', messagePayload);

    setNewMessages(prev => [
      ...prev,
      {
        message,
        messageId,
        status: 'sent',
        user: {
          id: userProfile.id,
          name: userProfile.name,
          avatar: userProfile.avatar,
        },
      },
    ]);
  };

  useEffect(() => {
    if (userInChatList && userInChatList.length > 0) {
      const initialMessages = userInChatList.map(user => ({
        message: '',
        messageId: uuidv4(),
        status: 'sent',
        user,
      }));
      setNewMessages(initialMessages);
    }
  }, [userInChatList]);

  const memoizedMessages = useMemo(() => {
    return newMessages;
  }, [newMessages]);

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-md">
      <div className="px-4 py-4">
        <p className="text-md text-gray-700 lg:text-base">Discussions</p>
      </div>
      <div className="h-[calc(100vh-14rem)] overflow-y-auto">
        <MessageList messages={memoizedMessages} />
      </div>
      <MessageInputBox
        onSend={sendMessage}
        userList={userInChatList || []}
        userInChatListLoading={userInChatListLoading}
      />
    </div>
  );
};

export default Discussions;
