/* eslint-disable no-unused-vars */
import { useEffect,useRef } from 'react';

import SearchIcon from '@Assets/images/icons/searchIcon.svg';

interface ISearchbarProps {
  className?: string;
  placeholder?: string;
  value: string | number;
  onChange: (value: any) => void;
  isSmall?: boolean;
  isFocus?: boolean;
  onClick?: () => void;
  onBlur?: () => void;
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
  wrapperStyle,
  required = true, // in default required is true
}: ISearchbarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClearSearch = () => {
    onChange({ target: { value: '' } });
    inputRef?.current?.focus();
  };

  useEffect(() => {
    if (!isFocus) return;
    inputRef?.current?.focus();
  }, [isFocus]);

  return (
    <div
      className={`flex w-full items-center ${
        isSmall ? 'h-10' : 'h-12'
      } ${wrapperStyle} `}
    >
      <label htmlFor="simple-search" className="sr-only">
        {placeholder}
      </label>
      <div className="relative w-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <img src={SearchIcon} alt="Search Icon" className="h-5 w-5" />
        </div>
        {value && (
          <div
            className={`absolute right-2 ${
              isSmall ? 'top-1.5' : 'top-[0.563rem]'
            } flex cursor-pointer items-center justify-center rounded-full bg-gray-200 p-1 duration-200 hover:bg-gray-300`}
            onClick={handleClearSearch}
          >
            <span className="material-symbols-outlined text-[14px] text-grey-800">
              close
            </span>
          </div>
        )}

        <input
          ref={inputRef}
          type="text"
          className={`block w-full rounded-lg border border-grey-600 pl-[35px] pr-[28px] text-[13px] font-normal text-gray-500 placeholder:font-normal placeholder:text-gray-500 focus:border-[#484848] focus:outline-none ${
            isSmall ? 'h-[36px] py-2' : 'h-[40px] py-3'
          } ${className}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onClick={onClick}
          onBlur={onBlur}
          required={required}
        />
      </div>
    </div>
  );
}
