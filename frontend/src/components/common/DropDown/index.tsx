import React, { useEffect, useRef } from 'react';

import { Button } from '@Components/radix/Button';
import { Command, CommandGroup, CommandItem } from '@Components/radix/Command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@Components/radix/Popover';
import { cn } from '@Utils/index';
import { IComboBoxProps, IDropDownData } from '@Constants/interface';
import useDebouncedInput from '@Hooks/useDebouncedInput';

import hasErrorBoundary from '../hasErrorBoundary';
import Icon from '../Icon';
import Searchbar from '../SearchBar';

function Dropdown({
  options = [],
  multiple = false,
  choose = 'id',
  value,
  placeholder,
  onChange,
  onFocus,
  id,
  className,
  disabled,
  isLoading = false,
  dropDownSize = 'drop-lg',
  placeholderClassName,
  hasLeftIcon,
  leftIconName,
  lengthOfOptions = 0,
  style,
  // if checkBox is true then it will show checkbox in dropdown by default it is false
  checkBox = false,
  enableSearchbar = true,
}: IComboBoxProps) {
  const [open, setOpen] = React.useState(false);
  // const [limitError, setLimitError] = React.useState<boolean>(false);
  const [searchText, setSearchText] = React.useState('');
  const [filteredOptionsData, setFilteredOptionsData] = React.useState<any>([]);
  const [dropDownWidth, setDropDownWidth] = React.useState<number | undefined>(
    0,
  );

  const handleSelect = (currentValue: any) => {
    if (onFocus) onFocus();

    if (multiple) {
      const selectedValues = Array.isArray(value) ? [...value] : [];
      const selectedIndex = selectedValues.indexOf(currentValue);
      if (selectedIndex === -1) {
        selectedValues.push(currentValue);
      } else {
        selectedValues.splice(selectedIndex, 1);
      }
      if (onChange) {
        // if there is limit of selection

        if (lengthOfOptions !== 0) {
          if (selectedValues.length > lengthOfOptions) {
            return;
          }
        }
        onChange(selectedValues);
      }
      // setValue(selectedValues);
    } else {
      const selectedValue = currentValue === value ? '' : currentValue;
      // setValue(selectedValue);
      if (onChange) {
        onChange(selectedValue);
      }
      setOpen(false);
    }
  };

  // for search
  const [searchTextData, handleChangeData] = useDebouncedInput({
    ms: 400,
    init: searchText,
    onChange: debouncedEvent => setSearchText(debouncedEvent.target.value),
  });

  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setDropDownWidth(triggerRef.current?.clientWidth);
  }, [triggerRef.current?.clientWidth]);

  useEffect(() => {
    const filteredOptions = options?.filter(option =>
      option?.label?.toLowerCase()?.includes(searchText),
    );
    setFilteredOptionsData(filteredOptions);
  }, [searchText]);

  useEffect(() => {
    setFilteredOptionsData(options);
  }, [options]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild ref={triggerRef}>
        <Button
          id={id}
          variant="outline"
          size={dropDownSize}
          role="combobox"
          disabled={disabled}
          aria-expanded={open}
          className={cn(
            'group flex items-center justify-between gap-2 bg-white text-xs hover:border-primary-500 disabled:!cursor-not-allowed max-md:h-fit md:text-sm',
            className,
          )}
          onClick={() => setOpen(true)}
        >
          <>
            <div className="flex items-center justify-center gap-2">
              {hasLeftIcon && (
                <Icon
                  name={leftIconName ?? ''}
                  className="flex h-6 w-6 shrink-0 items-center justify-center text-[24px] font-light leading-6 text-matt-200 duration-200 group-hover:text-primary-500"
                />
              )}
              {multiple ? (
                <div className="flex flex-wrap">
                  {Array.isArray(value) && value.length > 0 ? (
                    value.length === 1 ? (
                      <span className="body-sm line-clamp-1 text-start text-matt-200">
                        {options?.find(
                          (option: IDropDownData) =>
                            option[choose as keyof IDropDownData] === value[0],
                        )?.label || '1 Selected'}
                      </span>
                    ) : (
                      <span className="line-clamp-1 text-start font-medium">
                        {value.length} Selected
                      </span>
                    )
                  ) : (
                    <p
                      className={cn(
                        'line-clamp-1 text-start text-sm text-[#667085]',
                        placeholderClassName,
                      )}
                    >
                      {placeholder || 'Choose'}
                    </p>
                  )}
                </div>
              ) : (
                <>
                  {value ? (
                    <p className="line-clamp-1 text-start text-sm font-medium text-matt-200">
                      {options.find(
                        (option: IDropDownData) =>
                          option[choose as keyof IDropDownData] === value,
                      )?.label || 'No Name Found'}
                    </p>
                  ) : (
                    <p
                      className={cn(
                        'body-sm line-clamp-1 text-start text-matt-200',
                        placeholderClassName,
                      )}
                    >
                      {placeholder || 'Choose'}
                    </p>
                  )}
                </>
              )}
            </div>
            <Icon
              name="expand_more"
              className="flex h-6 w-6 shrink-0 items-center justify-center text-[24px] font-light leading-6 text-matt-200 duration-200 group-hover:text-primary-500"
            />
          </>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="bg-white p-[0px]"
        style={{ width: `${dropDownWidth}px`, ...style }}
      >
        {enableSearchbar ? (
          <Searchbar
            value={searchTextData}
            onChange={handleChangeData}
            // isSmall
            className="searchbar-dropdown !py-3 focus:!border-grey-600 !rounded-t-sm"
            wrapperStyle="!h-auto"
          />
        ) : null}
        <div className="scrollbar search-scrollbar block max-h-[10rem] overflow-y-auto">
          <Command className="m-0 p-0">
            {isLoading && <p>Loading ...</p>}
            <CommandGroup className="">
              {filteredOptionsData.length ? (
                filteredOptionsData?.map((option: IDropDownData) => (
                  <CommandItem
                    key={option.value?.toString()}
                    onSelect={() =>
                      handleSelect(option[choose as keyof IDropDownData])
                    }
                    className="flex items-center gap-[0.15rem]"
                  >
                    {!checkBox ? (
                      <Icon
                        name="done"
                        className={`flex items-center justify-center text-base md:text-[20px] ${
                          !multiple
                            ? value === option[choose as keyof IDropDownData]
                              ? 'opacity-100'
                              : 'opacity-0'
                            : Array.isArray(value) &&
                                value.includes(
                                  option[choose as keyof IDropDownData],
                                )
                              ? 'opacity-100'
                              : 'opacity-0'
                        }`}
                      />
                    ) : (
                      <Icon
                        name={
                          !multiple
                            ? value === option[choose as keyof IDropDownData]
                              ? 'check_box'
                              : 'check_box_outline_blank'
                            : Array.isArray(value) &&
                                value.includes(
                                  option[choose as keyof IDropDownData],
                                )
                              ? 'check_box'
                              : 'check_box_outline_blank'
                        }
                        className="flex items-center justify-center text-base md:text-[20px]"
                      />
                    )}
                    <span className="text-sm md:text-md">
                      {option.label || '-'}
                    </span>
                  </CommandItem>
                ))
              ) : (
                <div className="body-sm line-clamp-1 flex h-[4.25rem] items-center justify-center text-start text-matt-200">
                  No Data Found.
                </div>
              )}
            </CommandGroup>
          </Command>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default hasErrorBoundary(Dropdown);
