/* eslint-disable react-hooks/exhaustive-deps */
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
import { ArrowDown } from 'lucide-react';

import Spinner from '@Components/common/Spinner';
import { Button } from '@Components/radix/Button';
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
    return historyMessagesResponse.pages
      .flatMap(page => page.results || [])
      .reverse();
  }, [historyMessagesResponse]);

  const updatedMessages = useMemo(
    () => [...historyMessages, ...messages],
    [historyMessages, messages],
  );

  const itemContent = useCallback(
    (_index: number, discussionData: ChatMessage) => (
      <div className="px-4 py-2" key={discussionData.messageId}>
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
  const [newMessagesIndicatorVisible, setNewMessagesIndicatorVisible] =
    useState(false);
  const previousMessagesLength = useRef(messages.length);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const isAtBottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 5;
    if (isAtBottom) {
      setIsAtBottom(true);
    } else {
      setIsAtBottom(false);
    }
  };
  useEffect(() => {
    if (messages.length > previousMessagesLength.current && !isAtBottom) {
      setNewMessagesIndicatorVisible(true);
      return;
    }
    setNewMessagesIndicatorVisible(false);
  }, [messages.length]);

  return (
    <>
      {isLoading && <Spinner />}
      <div
        className={`${isLoading ? 'opacity-0' : 'opacity-100'} relative flex h-[calc(100vh-14rem)] flex-col space-y-4 py-4 transition-all duration-200 ease-in-out`}
      >
        {newMessagesIndicatorVisible && (
          <Button
            className="absolute bottom-5 left-1/2 z-10 flex !h-fit -translate-x-1/2 cursor-pointer space-x-2 !rounded-full !px-3 !py-2"
            onClick={() => {
              setNewMessagesIndicatorVisible(false);
              virtuosoRef.current?.scrollToIndex({
                index: updatedMessages.length - 1,
              });
            }}
          >
            New Messages
            <ArrowDown className="h-4 w-4 animate-slide-y" strokeWidth={2} />
          </Button>
        )}
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
          onScroll={handleScroll}
          className="scrollbar"
          components={{
            Header: () =>
              isFetchingNextPage ? (
                <div className="relative flex justify-center py-2">
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
