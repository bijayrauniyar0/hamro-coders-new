import React from 'react';
import { DayPicker } from 'react-day-picker';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

/**
 * This is a TypeScript React component that renders a calendar using DayPicker library with
 * customizable styling.
 * @param {any}  - - `selected`: the currently selected date(s)
 * @returns A React functional component named "Calendar" is being returned. It takes in several props
 * including "selected", "className", " ", "onSelect", and "props". It renders a DayPicker
 * component with various classNames and props passed down as well.
 */

function Calendar({
  selected,
  className,
  classNames,
  onSelect,
  disabledDays,
  customStyles,
  ...props
}: any) {
  const datePickerStyles = {
    months: 'flex relative justify-center',
    month: 'space-y-4 !ml-0 w-full',
    weekdays: 'flex justify-around w-full',
    caption_label: 'hidden',
    nav: 'space-x-1 flex items-center absolute right-[10px] top-[2px]',
    month_grid: 'w-full p-2 bg-white rounded-lg mt-4',
    day: 'rounded-lg hover:bg-primary-600 hover:text-white overflow-hidden  p-1 text-[16px] text-center w-full cursor-pointer',
    day_button:
      'w-full px-[4px] py-[2px] font-semibold disabled:text-grey-500 ',
    today:
      'bg-white text-red-500 font-bold rounded-lg hover:bg-primary-600 hover:text-white',
    selected: 'rounded-lg !bg-primary-600 !text-white !bg-clip-content',
    outside: 'text-gray-400 !font-light pointer-events-none opacity-0',
    week: '!bg-transparent flex',
    dropdowns: 'flex align-center gap-4 !accent-matt-100',
    dropdown: 'text-sm font-semibold text-matt-100',
    chevron: 'fill-matt-100 h-[20px] w-[20px]',
  };

  return (
    <DayPicker
      mode="single"
      selected={selected}
      captionLayout="dropdown"
      fromYear={new Date().getFullYear() - 13}
      toYear={new Date().getFullYear() + 11}
      onSelect={onSelect}
      className="w-full rounded-lg !bg-white"
      classNames={{ ...datePickerStyles, ...classNames }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
