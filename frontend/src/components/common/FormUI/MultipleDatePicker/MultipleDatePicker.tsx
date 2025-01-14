import { FC, useEffect, useState } from 'react';
import { cn } from '@Utils/index';
import { Button } from '@Components/radix/Button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverArrow,
} from '@Components/radix/Popover';
import Icon from '@Components/common/Icon';
import { Calendar } from '@Components/radix/Calendar';
import hasErrorBoundary from '@Components/common/hasErrorBoundary';
import { MultipleDatePickerProps } from '@Constants/interface';
import { datePickerStyles } from '@Constants/datepicker';

// hadle selected date change
const handleDateChange = (date: any, onDateChange: any) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const formattedDateString = `${year}-${String(month).padStart(
    2,
    '0',
  )}-${String(day).padStart(2, '0')}`;
  if (onDateChange) {
    onDateChange(formattedDateString);
  }
};

const DateRangeIcon = ({ icon, styles }: { icon: string; styles: string }) => {
  return (
    <Icon
      name={icon}
      className={`flex h-6 w-6 shrink-0 items-center justify-center text-[24px] font-light leading-6 text-matt-200 group-hover:text-primary-500 ${styles}`}
    />
  );
};

const MultipleDatePicker: FC<MultipleDatePickerProps> = ({
  placeHolder = 'Select Date Range',
  enableButton = false,
  dateIcon = 'event',
  contentAlign = 'end',
  contentSideOffset = 0,
  showContentArrow = false,
  datePickerColor = 'bg-[#833177] hover:bg-[#833177]',
  iconStyles = '',
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  clearDateRange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | string>(
    startDate,
  );
  const [selectedEndDate, setSelectedEndDate] = useState<Date | string>(
    endDate,
  );

  useEffect(() => {
    if (!startDate) {
      setSelectedStartDate('');
    }
    if (!endDate) {
      setSelectedEndDate('');
    }
  }, [startDate, endDate]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        {enableButton ? (
          <Button
            variant="dropDown"
            size="drop-lg"
            className={cn(
              'group flex w-full items-center justify-between gap-2 font-normal hover:border-primary-500',
            )}
          >
            <div className="flex items-center gap-2">
              <span className="text-[0.875rem] text-matt-200">
                {startDate && endDate
                  ? `${startDate} - ${endDate}`
                  : startDate || endDate || placeHolder}
              </span>
            </div>
            <DateRangeIcon icon="arrow_drop_down" styles={iconStyles} />
          </Button>
        ) : (
          <div className="date-range-container">
            <DateRangeIcon icon={dateIcon} styles={iconStyles} />
          </div>
        )}
      </PopoverTrigger>
      <PopoverContent
        className="popover-content !w-fit !items-start bg-white !p-2 !px-3"
        align={contentAlign}
        sideOffset={contentSideOffset}
        // style={{ width: 'var(--radix-popover-trigger-width)' }}
      >
        <div className="flex !w-fit gap-8 bg-white">
          {/* start month */}
          <div className="start-month-container w-full">
            <p className="mb-2 text-[14px] font-semibold text-matt-100">
              Start Date
            </p>
            <Calendar
              selected={new Date(selectedStartDate)}
              onSelect={(date: Date) => {
                setSelectedStartDate(date);
              }}
              defaultMonth={startDate || new Date()}
              classNames={{
                ...datePickerStyles,
                selected: `rounded-md ${datePickerColor} !text-white hover:!text-white`,
              }}
            />
          </div>

          {/* end  month */}
          <div className="end-month-container w-full">
            <p className="mb-2 text-[14px] font-semibold text-matt-100">
              End Date
            </p>
            <Calendar
              selected={new Date(selectedEndDate)}
              disabled={{ before: new Date(`${selectedStartDate}`) }}
              onSelect={(date: Date) => {
                setSelectedEndDate(date);
              }}
              defaultMonth={endDate || new Date()}
              classNames={{
                ...datePickerStyles,
                selected: `rounded-md ${datePickerColor} !text-white  hover:!text-white hover:!${datePickerColor}`,
              }}
            />
          </div>
        </div>
        <div className="btns mb-2 mt-4 flex items-center justify-end gap-5">
          <span
            role="button"
            tabIndex={0}
            onKeyDown={() => {}}
            className="cursor-pointer text-[0.875rem] font-semibold text-primary-500"
            onClick={() => {
              clearDateRange();
              setSelectedEndDate('');
              setSelectedStartDate('');
            }}
          >
            Clear
          </span>
          <Button
            className="!h-8 !bg-primary-500 !px-4 !py-2"
            onClick={() => {
              if (selectedStartDate) {
                handleDateChange(selectedStartDate, setStartDate);
              }
              if (selectedEndDate) {
                handleDateChange(selectedEndDate, setEndDate);
              }
              setIsOpen(false);
            }}
          >
            Apply
          </Button>
        </div>
        {showContentArrow ? <PopoverArrow /> : null}
      </PopoverContent>
    </Popover>
  );
};

export default hasErrorBoundary(MultipleDatePicker);
