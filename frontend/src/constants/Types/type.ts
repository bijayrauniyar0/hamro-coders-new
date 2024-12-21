import type {
  Control,
  FieldErrors,
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

export interface UseFormPropsType {
  register: UseFormRegister<FieldValues>;
  control: Control;
  errors?: FieldErrors<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  getValues?: UseFormGetValues<FieldValues>;
  watch?: UseFormWatch<FieldValues>;
  // resolver: Resolver;
  // onSubmit: (data: FieldValues) => void;
}
export interface IFormState {
  errors: FieldErrors<FieldValues>;
  isSubmitting: boolean;
  isValid: boolean;
  isSuccess: boolean;
  isSubmitted: boolean;
}

export type MultiStepType = {
  id: number;
  value: number;
  text: string;
};
