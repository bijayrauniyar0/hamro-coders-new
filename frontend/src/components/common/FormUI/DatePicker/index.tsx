/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';
import { CalendarIcon } from '@radix-ui/react-icons';
// import { format } from 'date-fns';
import { cn } from '@Utils/index';
import { Button } from '@Components/radix/Button';
import { Calendar } from '@Components/radix/Calendar';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@Components/radix/Popover';
import Icon from '@Components/common/Icon';

interface IDatePickerProps {
  date: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (date: Date) => void;
  disabledDays?: string;
  placeHolder?: string;
}

export function DatePicker({
  date,
  onChange,
  disabledDays,
  placeHolder = 'Select Date',
}: IDatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="dropDown"
          size="drop-lg"
          className={cn(
            'group flex w-full items-center justify-between gap-2 font-normal duration-200 hover:border-primary-500',
            !date && 'text-muted-foreground',
          )}
        >
          <div className="flex items-center justify-start">
            <CalendarIcon className="mr-2 h-4 w-4 duration-200 group-hover:text-primary-500" />
            {date || <span className="text-[#667085]">{placeHolder}</span>}
          </div>
          <Icon
            name="expand_more"
            className="flex h-6 w-6 shrink-0 items-center justify-center text-[24px] font-light leading-6 text-matt-200 group-hover:text-primary-500"
          />
          {/* {date ? format(date, 'PPP') : <span>Pick a date</span>} */}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[17.3rem] bg-white p-0" align="start">
        <Calendar
          mode="single"
          selected={new Date(date)}
          defaultMonth={date || new Date()}
          disabled={{ before: new Date(`${disabledDays}`) }}
          onSelect={(date: Date) => {
            setIsOpen(false);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            // Pad the month and day with leading zeros if necessary and construct the formatted date string
            const formattedDateString = `${year}-${String(month).padStart(
              2,
              '0',
            )}-${String(day).padStart(2, '0')}`;
            if (onChange) {
              // @ts-expect-error
              onChange(formattedDateString);
            }
          }}
          initialFocus
          className="bg-white"
        />
      </PopoverContent>
    </Popover>
  );
}
