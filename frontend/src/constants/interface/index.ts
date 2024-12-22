/* eslint-disable @typescript-eslint/no-empty-object-type */
import { HTMLAttributes } from 'react';

export interface IDivProps extends HTMLAttributes<HTMLDivElement> {}
export interface IOverlayComponentProps {
  onClose: () => any;
  text?: string;
}

export interface IDropDownData {
  label: string;
  value: string | boolean;
  id?: string | number;
  code?: string;
  name?: string;
  [key: string]: any;
}
export interface IAccordianSubCategoriesData {
  id: string | number;
  label: string;
}
export interface IAccordianDropDownData {
  label: string;
  // value: string | boolean;
  id?: string | number;
  subCategories: IAccordianSubCategoriesData[];
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
export interface IAccordianDropDownProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'onFocus' | 'onAbort'
  > {
  options: IAccordianDropDownData[];
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
  // eslint-disable-next-line no-unused-vars
  subCategoriesOnChange?: (e: any) => void;
  subCategoriesValue?: any[];
  enableSearchbar?: boolean;
  popoverClassName?: string;
}

export interface IDropdownAccordionProps {
  options: Record<string, any>[];
  choose?: string;
  multiple?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  lengthOfOptions?: number;
  dropDownSize?: 'drop-lg' | 'drop-sm' | 'drop-tiny';
  placeholderClassName?: string;
  checkedItems: any;
  onCheckboxChange: any;
  enableSearchBar?: boolean;
  placeholder?: string;
  id?: any;
  className?: string;
  hasLeftIcon?: boolean;
  leftIconName?: string;
  subGroupName?: string;
  enableSingleParent?: boolean;
}

export interface MultipleDatePickerProps {
  placeHolder?: string;
  dateIcon?: string;
  startDate: string;
  endDate: string;
  setStartDate: any;
  setEndDate: any;
  enableButton?: boolean;
  clearDateRange: any;
  contentAlign?: 'end' | 'center' | 'start';
  contentSideOffset?: number;
  showContentArrow?: boolean;
  datePickerColor?: string;
  iconStyles?: string;
}
