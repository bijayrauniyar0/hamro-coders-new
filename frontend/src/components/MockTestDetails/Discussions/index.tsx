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

import useAuthStore from '@Store/auth';
import { ChatMessage, ChatMessageUserType } from '@Constants/Types/academics';
import { getAllUsersInDiscussion } from '@Services/discussion';
import { apiURL } from '@Services/index';

import MessageInputBox from './MessageInputBox';
import MessageList from './MessageList';

const Discussions = () => {
  const [searchParams] = useSearchParams();
  const mock_test_id = searchParams.get('test_id');
  const [newMessages, setNewMessages] = useState<ChatMessage[]>([]);
  const userProfile = useAuthStore(state => state.userProfile);
  const joinRoom = useRef(false);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(apiURL, { withCredentials: true });
    }
  }, []);

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
    setNewMessages(prev => [...prev, data]);
  }, []);

  const handleMessageDelivered = useCallback((messageId: string) => {
    setNewMessages(prev => {
      const index = prev.findIndex(msg => msg.messageId === messageId);
      if (index !== -1) {
        const updated = [...prev];
        updated[index] = { ...updated[index], status: 'delivered' };
        return updated;
      }
      return prev;
    });
  }, []);

  const handleMessageError = useCallback((messageId: string) => {
    setNewMessages(prev => {
      const index = prev.findIndex(msg => msg.messageId === messageId);
      if (index !== -1) {
        const updated = [...prev];
        updated[index] = { ...updated[index], status: 'error' };
        return updated;
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    if (!joinRoom.current && mock_test_id) {
      socketRef.current.emit('joinRoom', mock_test_id);
      joinRoom.current = true;
    }

    socketRef.current.on('receiveMessage', handleReceiveMessage);
    socketRef.current.on('messageError', handleMessageError);
    socketRef.current.on('messageDelivered', handleMessageDelivered);

    return () => {
      socketRef.current.off('receiveMessage', handleReceiveMessage);
    };
  }, [
    handleMessageDelivered,
    handleMessageError,
    handleReceiveMessage,
    mock_test_id,
  ]);

  const sendMessage = (message: string) => {
    const messageId = uuidv4();
    const messagePayload = {
      mock_test_id,
      message,
      messageId,
    };
    socketRef.current.emit('sendMessage', messagePayload);

    setNewMessages(prev => [
      ...prev,
      {
        message,
        messageId,
        status: 'sending',
        User: {
          id: userProfile.id,
        },
        created_at: new Date().toISOString(),
      },
    ]);
  };

  const memoizedMessages = useMemo(() => {
    return newMessages;
  }, [newMessages]);

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-md">
      <div className="px-4 py-4">
        <p className="text-md text-gray-700 lg:text-base">Discussions</p>
      </div>
      <MessageList messages={memoizedMessages} />
      <MessageInputBox
        onSend={sendMessage}
        userList={userInChatList || []}
        userInChatListLoading={userInChatListLoading}
      />
    </div>
  );
};

export default Discussions;
