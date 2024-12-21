/* eslint-disable no-unused-vars */
import React from 'react';
import { FlexRow } from '@Components/common/Layouts';
import Flex from '@Components/common/Layouts/Flex';

type OptionsType = {
  value: any;
  label: string;
  name?: string;
};

type RadioButtonPropType = {
  options: OptionsType[];
  direction?: 'row' | 'column';
  onChangeData: (value: string) => void;
  value: string;
  errorMsg?: string;
  className?: string;
  required?: boolean;
};

const RadioButton: React.FC<RadioButtonPropType> = ({
  options,
  direction = 'column',
  onChangeData,
  value,
  className,
}) => (
  <div>
    <Flex
      className={`${
        direction === 'column' ? 'flex-col gap-y-2' : 'flex-wrap gap-x-16'
      }`}
    >
      {options.map(option => {
        return (
          <FlexRow key={option.value} className="group flex gap-2">
            <input
              type="radio"
              id={option.value}
              name={option?.name}
              value={option.value}
              className="cursor-pointer accent-primary-600"
              onChange={e => {
                onChangeData(e.target.value);
              }}
              checked={option.value === value}
            />
            <label
              htmlFor={option.value}
              className={`label text-body-sm cursor-pointer bg-white font-normal !text-matt-200 duration-200 group-hover:!text-gray-800 ${className}`}
            >
              <p>{option.label}</p>
            </label>
          </FlexRow>
        );
      })}
    </Flex>
  </div>
);

export default RadioButton;
