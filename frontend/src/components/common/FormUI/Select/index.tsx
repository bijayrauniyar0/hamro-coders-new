 
/* eslint-disable no-unused-vars */

import { useEffect, useRef, useState } from 'react';

import Icon from '@Components/common/Icon';

interface ISelectProps {
  className?: string;
  options: Record<string, any>[];
  selectedOption?: string | number;
  placeholder?: string;
  onChange?: (selectedOption: string) => any;
  labelKey?: string;
  valueKey?: string;
}

export default function Select({
  className,
  options,
  selectedOption,
  onChange,
  placeholder = 'Select',
  labelKey = 'label',
  valueKey = 'value',
}: ISelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(selectedOption);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (value: string) => {
    setSelected(value);
    // @ts-ignore
    onChange(value);
  };

  const getPlaceholderText = () => {
    if (selected)
      // @ts-ignore
      return options.find(item => item[valueKey] === selected)?.[labelKey];
    return placeholder;
  };

  return (
    <div className="relative">
      <div
        ref={dropdownRef}
        className={`${className} group flex h-11 w-full cursor-pointer items-center justify-between border-b-2 border-grey-300 bg-white hover:border-primary-500`}
        onClick={toggleDropdown}
      >
        <span
          className={`${
            !selected && 'text-grey-400'
          } flex-1 px-1 pl-3 text-[0.7rem] font-bold text-grey-800`}
        >
          {getPlaceholderText()}
        </span>
        <span className="group pr-2 text-grey-800">
          <Icon
            name={isOpen ? 'expand_less' : 'expand_more'}
            className="flex items-center group-hover:text-primary-500"
          />
        </span>
      </div>

      {isOpen && (
        <ul className="scrollbar absolute top-[44px] z-40 flex max-h-[150px] w-full flex-col overflow-auto border bg-white shadow-lg">
          {options?.length ? (
            // @ts-ignore
            options.map(option => (
              <li
                className="hover:bg-primary-50 flex cursor-pointer list-none items-start px-4 py-2.5 text-xs text-grey-800 hover:bg-grey-200"
                key={option[valueKey]}
                onClick={() => handleOptionClick(option[valueKey])}
              >
                <div>{option[labelKey]}</div>
              </li>
            ))
          ) : (
            <li className="cursor-default px-2 text-sm text-grey-800">
              No data
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
