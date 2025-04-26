'use client';

import * as React from 'react';
import { DateRange } from 'react-day-picker';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@Components/radix/Button';
import { Calendar } from '@Components/radix/calendar';
import { cn } from '@Utils/index';

interface IDatePickerWithRangeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  date: DateRange | undefined;
  // eslint-disable-next-line no-unused-vars
  handleDate: (date: DateRange | undefined) => void;
}
export function DatePickerWithRange({
  className,
  date,
  handleDate,
}: IDatePickerWithRangeProps) {
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[15rem] justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="z-[111] w-auto !bg-white p-0 border border-gray-300 shadow-sm rounded-lg mt-2" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.to}
            selected={date}
            onSelect={handleDate}
            numberOfMonths={2}
            disabled={{ after: new Date() }}
            // month={date?.from}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
