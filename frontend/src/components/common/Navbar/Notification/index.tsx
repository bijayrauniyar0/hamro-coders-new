import Icon from '@Components/common/Icon';
import { FlexRow } from '@Components/common/Layouts';
// import { getInitialsFromString } from '@Utils/index';
import Flex from '@Components/common/Layouts/Flex';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@Components/radix/DropDownMenu';

const notificationData = [
  {
    id: 1,
    profileImg: null,
    username: 'Loop Verse',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus aliquid odit, deserunt asperiores aliquam hic praesentium facilis voluptates eveniet omnis.',
  },
  {
    id: 2,
    profileImg: null,
    username: 'Loop Verse',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus aliquid odit, deserunt asperiores aliquam hic praesentium facilis voluptates eveniet omnis.',
  },
  {
    id: 3,
    profileImg: null,
    username: 'Loop Verse',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus aliquid odit, deserunt asperiores aliquam hic praesentium facilis voluptates eveniet omnis.',
  },
  {
    id: 4,
    profileImg: null,
    username: 'Loop Verse',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus aliquid odit, deserunt asperiores aliquam hic praesentium facilis voluptates eveniet omnis.',
  },
  {
    id: 5,
    profileImg: null,
    username: 'Loop Verse',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus aliquid odit, deserunt asperiores aliquam hic praesentium facilis voluptates eveniet omnis.',
  },
];

const Notification = () => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <div className="relative">
            <div className="absolute right-0 top-0 h-3 w-3 animate-pulse rounded-full border-[1px] border-white bg-[#EC5B44]" />
            <Icon name="notifications" className="!text-icon-md" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="shadow-[0px_2px_20px_4px_rgba(0,0,0,0.12)]"
        >
          <div className="scrollbar w-[18rem] sm:w-[22.5rem]">
            <FlexRow className="items-center justify-between border-b-[1px] border-[#EAECF0] px-7 py-2">
              <FlexRow className="items-center gap-1">
                <p className="text-[0.875rem]">All Notification</p>
                <Icon name="arrow_drop_down" className="mt-1" />
              </FlexRow>
              <p className="text-[0.875rem] text-[#417EC9]">Mark All as Read</p>
            </FlexRow>
            <div className="scrollbar max-h-[25.5rem] overflow-y-scroll">
              {notificationData?.map(notification => (
                <div key={notification.id} className="px-3 py-3 sm:py-5">
                  <FlexRow className="gap-3">
                    <div>
                      {notification?.profileImg ? (
                        <img src={notification?.profileImg} alt="profile" />
                      ) : (
                        <Flex className="h-[2.8rem] w-[2.8rem] items-center justify-center rounded-full bg-[#417EC9] sm:h-[3.5rem] sm:w-[3.5rem]">
                          <p className="text-[1.5rem] text-white sm:text-[1.727rem]">
                            {/* {getInitialsFromString(notification.username)} */}
                            LV
                          </p>
                        </Flex>
                      )}
                    </div>
                    <div className="line-clamp-3 text-[0.875rem]">
                      <span className="font-bold">{notification.username}</span>{' '}
                      <span>{notification.message}</span>
                    </div>
                  </FlexRow>
                </div>
              ))}
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Notification;
