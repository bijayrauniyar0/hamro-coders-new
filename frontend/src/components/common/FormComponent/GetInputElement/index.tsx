import { Controller } from 'react-hook-form';
import { DatePicker, Input } from '@Components/common/FormUI';
import { FormFieldProps } from '@Constants/interface/FormInterface';
import { UseFormPropsType } from '@Constants/Types/type';
import DropDown from '@Components/common/DropDown';
import { IDropDownData } from '@Constants/interface';
import FileUpload from '@Components/common/FormUI/Upload';
import Textarea from '@Components/radix/TextArea';
import Checkbox from '@Components/common/FormUI/CheckBox';
import RadioButton from '@Components/common/FormUI/Radio';
import PasswordInput from '@Components/common/FormUI/PasswordInput';

export default function getInputElement(
  data: FormFieldProps,
  formProps: UseFormPropsType,
  dropdownOptions?: IDropDownData[],
) {
  const {
    id,
    type,
    placeholder,
    inputType,
    multiple,
    fileAccept,
    className,
    readOnly,
    choose,
    hasLeftIcon,
    leftIconName,
    disabledDays,
    maxSize,
    isValueNumber = false,
    checkBox,
    disabled,
    enableSearchbar,
  } = data;
  const { register, control } = formProps;

  switch (type) {
    case 'input':
      return (
        <Input
          type={inputType || 'text'}
          placeholder={placeholder}
          className={className}
          {...register(`${id}`, { valueAsNumber: isValueNumber })}
          readOnly={!!readOnly}
          disabled={disabled}
        />
      );
    case 'textArea':
      return (
        <Textarea
          placeholder={placeholder}
          className={className}
          readOnly={!!readOnly}
          {...register(`${id}`, {})}
        />
      );
    case 'select':
      return (
        <Controller
          control={control}
          name={id}
          defaultValue=""
          render={({ field: { value, onChange } }) => (
            <DropDown
              placeholder={placeholder}
              className="w-full"
              options={dropdownOptions || []}
              value={value}
              onChange={onChange}
              choose={choose}
              hasLeftIcon={hasLeftIcon}
              leftIconName={leftIconName}
              multiple={multiple}
              checkBox={checkBox}
              disabled={disabled}
              enableSearchbar={enableSearchbar}
            />
          )}
        />
      );

    case 'file-upload':
      return (
        <Controller
          control={control}
          name={id}
          render={({ field: { value, onChange } }) => {
            // Function to handle file changes
            const handleFileChange = (
              event: React.ChangeEvent<HTMLInputElement>,
            ) => {
              const { files } = event.target;
              // If multiple files can be selected, set files array; otherwise, set single file
              // onChange(multiple ? [...files] : files[0]);
              onChange(files?.[0]);
            };
            return (
              <FileUpload
                placeholder={placeholder}
                multiple={!!multiple}
                name={id}
                data={value}
                fileAccept={fileAccept}
                onChange={handleFileChange}
                maxSize={maxSize}
                {...formProps}
              />
            );
          }}
        />
      );

    case 'datePicker':
      return (
        <Controller
          control={control}
          name={id}
          defaultValue=""
          render={({ field: { value, onChange } }) => (
            <DatePicker
              date={value}
              onChange={onChange}
              disabledDays={disabledDays}
            />
          )}
        />
      );
    case 'checkBox':
      return (
        <Controller
          control={control}
          name={id}
          defaultValue=""
          render={({ field: { value, onChange } }) => (
            <Checkbox value={value} onChange={onChange} label={id} />
          )}
        />
      );
    case 'radio':
      return (
        <Controller
          control={control}
          name={id}
          defaultValue=""
          render={({ field: { value, onChange } }) => (
            <RadioButton
              onChangeData={onChange}
              options={dropdownOptions || []}
              value={value}
            />
          )}
        />
      );

    case 'password-input':
      return (
        <PasswordInput
          placeholder={placeholder}
          className={className}
          disabled={disabled}
          {...register(`${id}`, { valueAsNumber: isValueNumber })}
        />
      );

    default:
      return '';
  }
}
