/* eslint-disable no-unused-vars */
import { useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

import { cn } from '@Utils/index';
import useDebouncedInput from '@Hooks/useDebouncedInput';

import { Input } from '../FormUI';

interface ISearchbarProps {
  className?: string;
  placeholder?: string;
  value: string | number;
  onChange: (value: any) => void;
  isSmall?: boolean;
  isFocus?: boolean;
  onClick?: () => void;
  onBlur?: () => void;
  onFocus?: () => void;
  required?: boolean;
  wrapperStyle?: string;
}

export default function Searchbar({
  className,
  placeholder = 'Search',
  value,
  onChange,
  isSmall,
  isFocus,
  onClick,
  onBlur,
  onFocus,
  wrapperStyle = '',
  required = false,
}: ISearchbarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [inputValue, handleDebouncedChange, setInputValue] = useDebouncedInput({
    init: value,
    onChange,
    ms: 300, // adjust debounce delay if needed
  });

  useEffect(() => {
    if (!isFocus) return;
    inputRef?.current?.focus();
  }, [isFocus]);

  useEffect(() => {
    setInputValue(value);
  }, [setInputValue, value]);

  const handleClearSearch = () => {
    const fakeEvent = {
      target: { value: '' },
    } as React.ChangeEvent<HTMLInputElement>;
    setInputValue('');
    handleDebouncedChange(fakeEvent);
    inputRef?.current?.focus();
  };

  return (
    <div
      className={`searchbar-wrapper flex w-full items-center ${wrapperStyle}`}
    >
      <div className="relative w-full">
        {/* ------ search-icon ------- */}
        <div className="pointer-events-none absolute left-3 top-1/2 mr-2 h-6 w-6 -translate-y-1/2 transform gap-2">
          <Search
            className="absolute left-0 top-1/2 -translate-y-1/2 text-grey-600"
            name="search"
            size={18}
          />
        </div>

        {/* ------ close-icon ------- */}
        {value && (
          <button
            className="absolute right-3 top-1/2 flex -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full p-1 transition-colors duration-200 ease-in hover:bg-grey-100"
            onClick={handleClearSearch}
          >
            <X size={16} className="text-grey-800" />
          </button>
        )}

        {/* ------ search-input ------- */}
        <Input
          ref={inputRef}
          type="text"
          className={cn(
            className,
            `text-grey-700 w-full rounded-md border border-grey-300 py-2 pl-[2.5rem] pr-[2.5rem] transition duration-300 ease-in-out focus:shadow-none focus:outline-none focus-visible:!ring-[1px] ${
              isSmall ? 'h-9 py-2' : 'h-9 py-3'
            }`,
          )}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleDebouncedChange}
          onClick={onClick}
          onBlur={onBlur}
          onFocus={onFocus}
          required={required}
        />
      </div>
    </div>
  );
}
