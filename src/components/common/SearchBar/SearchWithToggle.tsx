import SearchIcon from '@Assets/icons/searchIcon.svg';
import { useRef, useState } from 'react';

interface iSearchWithToggle {
  className?: string;
  placeholder?: string;
  value: string | number;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: any) => void;
  onClick?: () => void;
  onSearchBarClose?: () => void;
}

const SearchWithToggle = ({
  className,
  placeholder = 'Search...',
  value,
  onChange,
  onClick,
  onSearchBarClose,
}: iSearchWithToggle) => {
  const inputRef = useRef<any>(null);
  const [activeSearch, setActiveSearch] = useState(false);

  const handleClearSearch = () => {
    onChange({ target: { value: '' } });
    inputRef?.current?.focus();
  };

  const handleSearchToggle = (e: any) => {
    e.stopPropagation();
    if (!activeSearch) {
      inputRef.current.focus();
    } else {
      onSearchBarClose?.();
    }
    setActiveSearch(prev => !prev);
  };
  return (
    <div className="group relative">
      <input
        ref={inputRef}
        type="text"
        className={`block h-[36px] rounded-2xl border border-grey-600 py-2 pl-[34px] text-[13px] font-normal text-gray-500 placeholder:font-normal placeholder:text-gray-500 focus:border-[#484848] focus:outline-none ${activeSearch ? 'w-full pr-[10px]' : 'w-0 pr-0 opacity-0'} transition-all duration-300 ease-in-out ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onClick={onClick}
      />
      {value && (
        <button
          type="button"
          className="absolute right-1 top-2 z-20 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full hover:bg-gray-200"
          onClick={handleClearSearch}
        >
          <span className="material-symbols-outlined text-[16px] text-grey-800">
            close
          </span>
        </button>
      )}
      <button
        type="button"
        className={`absolute top-1 flex items-center justify-center bg-[#f4f7fd] hover:border ${activeSearch ? 'left-0.5 h-7 w-7 rounded-full' : 'left-0 top-1 h-8 w-8 rounded-lg'}`}
        onClick={e => handleSearchToggle(e)}
      >
        <img
          src={SearchIcon}
          alt="Search Icon"
          className="h-4 w-4 !text-matt-200 transition-all duration-300 ease-in-out"
        />
      </button>
    </div>
  );
};

export default SearchWithToggle;
