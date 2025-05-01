import { Controller } from 'react-hook-form';
import { Box, Chip, IconButton, TextField } from '@mui/material';
import { useState } from 'react';

interface ChipInputProps {
  name: string;
  control: any;
  label: string;
  placeholder?: string;
  rules?: any;
  chipListClass?: string;
}

export const ChipInput = ({
  name,
  control,
  label,
  placeholder,
  rules,
  chipListClass
}: ChipInputProps) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={[]}
      render={({ field, fieldState }) => (
        <>
          <TextField
            label={label}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && inputValue.trim()) {
                e.preventDefault();
                if (!field.value.includes(inputValue.trim())) {
                  field.onChange([...field.value, inputValue.trim()]);
                }
                setInputValue('');
              }
            }}
            placeholder={placeholder || 'Press Enter to add'}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            fullWidth
            size='small'
            margin='normal'
            className='!m-0 !mt-1'
          />
          <div className={chipListClass}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
              {field.value.map((item: string, idx: number) => (
                <Chip
                  key={idx}
                  label={item}
                  onDelete={() => {
                    const newValues = field.value.filter((v: string) => v !== item);
                    field.onChange(newValues);
                  }}
                />
              ))}
            </Box>
          </div>
        </>
      )}
    />
  );
};
