import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Bell } from 'lucide-react';

import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import NoDataAvailable from '@Components/common/NoDataAvailable';
import { Button } from '@Components/radix/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@Components/radix/DropDownMenu';
import Skeleton from '@Components/radix/Skeleton';
import isEmpty from '@Utils/isEmpty';
import {
  getNotificationCount,
  getNotifications,
  markAllNotificationsAsRead,
} from '@Services/common';

const Notification = () => {
  const navigate = useNavigate();
  const [notificationDropdownOpen, setNotificationDropdownOpen] =
    useState(false);
  const queryClient = useQueryClient();

  const { data: notificationCount, refetch } = useQuery({
    queryKey: ['unread-notification-count'],
    queryFn: () => {
      return getNotificationCount();
    },
    select: ({ data }) => data?.count,
  });

  const { data: notificationsData, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => {
      return getNotifications();
    },
    select: ({ data }) => data,
  });

  const hasUnreadNotifications = notificationsData?.some(
    (notification: any) => !notification?.viewed,
  );

  const { mutate, isPending: notificationsIsUpdating } = useMutation({
    mutationFn: () => {
      return markAllNotificationsAsRead();
    },
    onSuccess: () => {
      toast.success('All notifications marked as read');
      queryClient.invalidateQueries({
        queryKey: ['notifications'],
      });
      queryClient.invalidateQueries({
        queryKey: ['unread-notification-count'],
      });
    },
    onError: response => {
      toast.error(
        response.message || 'Failed to mark all notifications as read',
      );
    },
  });

  useEffect(() => {
    setInterval(() => {
      refetch();
    }, 300000);
  }, [refetch]);

  return (
    <DropdownMenu
      open={notificationDropdownOpen}
      onOpenChange={openStatus => setNotificationDropdownOpen(openStatus)}
    >
      <DropdownMenuTrigger className="!flex !outline-none">
        <div className="relative">
          <Bell
            size={24}
            name="notifications"
            className="text-black-600"
            onClick={() => {
              setNotificationDropdownOpen(false);
              navigate('/notifications');
            }}
          />
          {notificationCount > 0 && (
            <div className="absolute right-0 top-0 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 p-1 outline outline-white">
              <p className="text-[0.5rem] font-medium text-white">
                {notificationCount}
              </p>
            </div>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="!z-50 h-fit w-full overflow-hidden !rounded-lg bg-white shadow-[0px_2px_20px_4px_rgba(0,0,0,0.12)] max-sm:!ml-3 max-sm:w-[18.5rem] sm:w-[22.5rem]"
      >
        <FlexRow className="text-neutral-gray items-center justify-between border-[#D7D7D7] px-3 py-3 shadow-sm">
          <p className="text-[1.125rem] font-bold">Notifications</p>
          <Button
            variant="ghost"
            disabled={!hasUnreadNotifications || notificationsIsUpdating}
            // isLoading={notificationsIsUpdating}
            onClick={() => mutate()}
          >
            Mark all as Read
          </Button>
        </FlexRow>
        {isLoading ? (
          <FlexColumn className="gap-1 px-2 py-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton className="h-10 w-full rounded-lg py-2" key={index} />
            ))}
          </FlexColumn>
        ) : isEmpty(notificationsData) ? (
          <NoDataAvailable className="h-[8rem]" titleClassName="!text-base" />
        ) : (
          notificationsData?.map((notification: any) => (
            <FlexColumn
              className={`w-full items-start gap-1 border-b px-3 py-5 ${notification?.viewed ? '' : 'bg-black-50'}`}
              key={notification?.id}
            >
              <p className="text-neutral-gray text-md font-medium leading-5">
                {notification?.message}
              </p>
              <p className="text-black-600 text-sm font-normal leading-normal tracking-[-0.015rem]">
                {new Date(notification?.created_at).toLocaleDateString(
                  'en-US',
                  {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                  },
                )}
              </p>
            </FlexColumn>
          ))
        )}
        <div className="flex w-full items-center justify-center py-2">
          <Button
            variant="ghost"
            disabled={isEmpty(notificationsData)}
            onClick={() => {
              setNotificationDropdownOpen(false);
              navigate('/notifications');
            }}
          >
            View All
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notification;
