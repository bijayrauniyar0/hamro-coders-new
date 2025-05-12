import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { Virtuoso } from 'react-virtuoso';
import { useInfiniteQuery } from '@tanstack/react-query';

import Spinner from '@Components/common/Spinner';
import { useTypedSelector } from '@Store/hooks';
import { ChatMessage } from '@Constants/Types/academics';
import { getHistoryMessages } from '@Services/discussion';

import MessageItem from '../MessageItem';

const MessageList = ({ messages }: { messages: ChatMessage[] }) => {
  const userProfile = useTypedSelector(state => state.commonSlice.userProfile);
  const [searchParams] = useSearchParams();
  const mock_test_id = searchParams.get('test_id');

  const {
    data: historyMessagesResponse,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['historyMessages', mock_test_id],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getHistoryMessages({
        page: pageParam,
        page_size: 20,
        mock_test_id: mock_test_id,
      });
      return res?.data;
    },
    initialPageParam: 1,
    getNextPageParam: lastPage => lastPage?.next_page ?? undefined,
  });

  const historyMessages = useMemo(() => {
    if (!historyMessagesResponse?.pages) return [];
    return historyMessagesResponse.pages.flatMap(page => page.results || []);
  }, [historyMessagesResponse]);

  const updatedMessages = useMemo(
    () => [...historyMessages, ...messages],
    [historyMessages, messages],
  );

  const itemContent = useCallback(
    (_index: number, discussionData: ChatMessage) => (
      <div className="py-2" key={discussionData.messageId}>
        <MessageItem
          discussion={discussionData}
          isMe={discussionData.User.id === userProfile.id}
        />
      </div>
    ),
    [userProfile.id],
  );

  const lastMessage = updatedMessages[updatedMessages.length - 1];

  const onFollowOutputHandler = useCallback(
    (atBottom: boolean) => {
      if (atBottom || lastMessage?.User.id === userProfile.id) {
        return 'auto';
      }
      return false;
    },
    [lastMessage?.User.id, userProfile.id],
  );

  const virtuosoRef = useRef<any>(null);
  const [firstItemIndex, setFirstItemIndex] = useState(1000); // for preserving position

  useEffect(() => {
    setFirstItemIndex(1000 - updatedMessages.length);
  }, [updatedMessages.length]);
  return (
    <>
      {isLoading && <Spinner />}
      <div
        className={`${isLoading ? 'opacity-0' : 'opacity-100'} flex h-[calc(100vh-14rem)] flex-col space-y-4 p-4 transition-all duration-200 ease-in-out`}
      >
        <Virtuoso
          ref={virtuosoRef}
          data={updatedMessages}
          firstItemIndex={firstItemIndex}
          followOutput={onFollowOutputHandler}
          itemContent={itemContent}
          startReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          className="scrollbar"
          components={{
            Header: () =>
              isFetchingNextPage ? (
                <div className="flex justify-center py-2">
                  <Spinner />
                </div>
              ) : null,
          }}
        />
      </div>
    </>
  );
};

export default MessageList;
