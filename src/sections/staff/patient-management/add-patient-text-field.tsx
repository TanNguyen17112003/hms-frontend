import React, { ChangeEventHandler, FC, PropsWithChildren } from 'react';
import { TextField } from '@mui/material';
import AutocompleteTextFieldMultiple from 'src/components/autocomplete-textfield-multiple';
import { PatientFormField } from './add-patient-form-field';

interface AddPatientTextFieldProps {
  type: 'text' | 'autoComplete' | 'dateTime' | 'number';
  title: string;
  lg: number;
  xs: number;
  options?: { value: string; label: string }[];
  onChange: (event: React.ChangeEvent<HTMLInputElement> | any) => void;
  value: string | { value: any; label: string }[] | number;
  name: string;
  placeholder?: string;
  select?: boolean;
  children?: React.ReactNode;
  isMultiple?: boolean;
}

export const AddPatientTextField: FC<AddPatientTextFieldProps> = ({
  type,
  title,
  lg,
  xs,
  options,
  onChange,
  value,
  name,
  placeholder,
  select,
  children,
  isMultiple
}) => {
  if (type === 'autoComplete' && options) {
    const formattedValue = isMultiple
      ? Array.isArray(value)
        ? value
        : typeof value === 'string'
          ? value.split(',').map((val) => ({ value: val.trim(), label: val.trim() }))
          : []
      : typeof value === 'string'
        ? { value, label: value }
        : value;

    return (
      <PatientFormField title={title} lg={lg} xs={xs}>
        <AutocompleteTextFieldMultiple
          onChange={(newValue) => {
            if (isMultiple) {
              onChange({
                target: {
                  name,
                  value: newValue.map((item: { value: any }) => item.value).join(', ')
                }
              });
            } else {
              onChange({
                target: { name, value: newValue?.value }
              });
            }
          }}
          value={formattedValue as any}
          options={options!}
          TextFieldProps={{
            variant: 'outlined',
            placeholder: placeholder
          }}
          freeSolo={true}
          isMultiple={isMultiple}
        />
      </PatientFormField>
    );
  }

  return (
    <PatientFormField title={title} lg={lg} xs={xs}>
      <TextField
        type={type === 'dateTime' ? 'date' : type === 'text' ? 'text' : 'number'}
        fullWidth
        variant='outlined'
        onChange={onChange}
        value={value}
        name={name}
        placeholder={placeholder}
        select={select}
      >
        {select && children}
      </TextField>
    </PatientFormField>
  );
};
