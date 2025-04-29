/* eslint-disable @typescript-eslint/no-empty-object-type */
import { HTMLAttributes } from 'react';

export interface IDivProps extends HTMLAttributes<HTMLDivElement> {}

export interface IDropDownData {
  label: string;
  value: string | boolean;
  id?: string | number;
  code?: string;
  name?: string;
  [key: string]: any;
}

export interface IComboBoxProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'onFocus' | 'onAbort'
  > {
  options: IDropDownData[];
  choose?: string;
  multiple?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  lengthOfOptions?: number;
  dropDownSize?: 'drop-lg' | 'drop-sm' | 'drop-tiny';
  placeholderClassName?: string;
  hasLeftIcon?: boolean;
  leftIconName?: string;
  checkBox?: boolean;
  style?: any;
  // eslint-disable-next-line no-unused-vars
  onFocus?: (e?: any) => void;
  // eslint-disable-next-line no-unused-vars
  onChange?: (e: any) => void;
  enableSearchbar?: boolean;
}