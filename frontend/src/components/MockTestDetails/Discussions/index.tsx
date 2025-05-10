import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SendHorizonal as SendHorizontal } from 'lucide-react';
import { io } from 'socket.io-client';

import { Input } from '@Components/common/FormUI';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import { useTypedSelector } from '@Store/hooks';
import { apiURL } from '@Services/index';

const Discussions = () => {
  const [message, setMessage] = useState<string>('');
  const socket = io(apiURL, { withCredentials: true });
  const [searchParams] = useSearchParams();
  const mock_test_id = searchParams.get('test_id');
  const [historyMessages, setHistoryMessages] = useState<any[]>([]);
  const [newMessages, setNewMessages] = useState<any[]>([]);
  const userProfile = useTypedSelector(state => state.commonSlice.userProfile);

  useEffect(() => {
    socket.emit('joinRoom', mock_test_id);

    socket.on('receiveMessage', data => {
      setNewMessages(prevMessages => [
        ...prevMessages,
        {
          isMe: data.user === 'User1',
          image: 'https://via.placeholder.com/150',
          message: data.message,
        },
      ]);
    });
    socket.on('historyMessages', data => {
      setHistoryMessages(data);
    });
    return () => {
      socket.disconnect();
    };
  }, [socket, mock_test_id]);

  const sendMessage = (message: string) => {
    socket.emit('sendMessage', {
      mock_test_id,
      message: message,
      user: 'User1',
    });
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-md">
      <div className="px-4 py-4">
        <p className="text-md text-gray-700 lg:text-base">Discussions</p>
      </div>
      <div className="h-[calc(100vh-14rem)] overflow-y-auto">
        <FlexColumn className="items-start gap-3 px-4 py-4">
          {[...historyMessages, ...newMessages].map((discussion: any, index) => {
            const isMe = discussion.user_id === userProfile.id;
            return (
              <FlexRow
                key={`discussion-${index}`}
                className={`w-full ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                <FlexRow className="items-center gap-4">
                  {!isMe && (
                    <img
                      src="https://randomuser.me/api/portraits/men/10.jpg"
                      alt=""
                      className="h-8 w-8 rounded-full"
                    />
                  )}
                  <div
                    className={`rounded-full px-2 py-1 ${isMe ? 'bg-blue-100' : 'bg-gray-100'}`}
                  >
                    <p className="text-sm lg:text-md">{discussion.message}</p>
                  </div>
                </FlexRow>
              </FlexRow>
            );
          })}
        </FlexColumn>
      </div>
      <FlexRow className="items-center gap-2 px-4 py-4">
        <Input
          className="!h-fit rounded-full !p-0 !px-4 !py-1 text-md"
          placeholder="Aa"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <SendHorizontal
          className="text-primary-600"
          onClick={() => sendMessage(message)}
        />
      </FlexRow>
    </div>
  );
};

export default Discussions;
