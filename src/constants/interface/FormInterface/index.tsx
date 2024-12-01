import { HTMLInputTypeAttribute } from 'react';

type formUIType =
  | 'select'
  | 'multi-select'
  | 'input'
  | 'file-upload'
  | 'switch'
  | 'text'
  | 'textArea'
  | 'datePicker'
  | 'checkBox'
  | 'radio'
  | 'accordion-select'
  | 'tiptap-editor'
  | 'password-input';

export interface FormFieldProps {
  name: string;
  id: string;
  label?: string;
  type: formUIType | 'custom';
  inputType?: HTMLInputTypeAttribute;
  placeholder?: string;
  className?: string;
  required?: boolean;
  default?: string | number;
  readOnly?: boolean;
  multiple?: boolean;
  fileAccept?: string;
  group?: string | undefined | null; // Used for radio buttons and checkbox
  hasLeftIcon?: boolean;
  leftIconName?: string;
  choose?: string;
  disabledDays?: string;
  isVisible?: boolean;
  maxSize?: number;
  isValueNumber?: boolean;
  checkBox?: boolean;
  disabled?: boolean;
  subGroupName?: string;
  enableSearchBar?: boolean;
  enableSingleParent?: boolean;
  enableSearchbar?: boolean;
  editable?: boolean;
  // eslint-disable-next-line no-unused-vars
  isEditorEmpty?: (value: any) => boolean;
}

export interface PartnerFormProps {
  onClose: () => void;
  setPartner?: any;
}

export interface ProgrammeFormProps {
  onClose: () => void;
  setProgramme?: any;
}
