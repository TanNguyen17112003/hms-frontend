import React, { useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  TextField,
  Autocomplete,
  FormControl,
  FormHelperText
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { defaultStaff, departments } from 'src/constants/staff';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { ChipInput } from '@components';
import { useStaffContext } from 'src/contexts/staff/staff-context';
import StaffDetail from './staff-detail';
import { Staff } from 'src/types/staff';

interface StaffDialogProps {
  type: string;
  dialog: any;
  staffDetail?: Staff;
  refetch: any;
}

function StaffDialog({ type, dialog, staffDetail, refetch }: StaffDialogProps) {
  const { addStaff, editStaff } = useStaffContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue
  } = useForm({
    mode: 'onSubmit',
    defaultValues: type === 'edit' && staffDetail ? staffDetail : defaultStaff
  });

  useEffect(() => reset(staffDetail), [staffDetail, dialog.open]);

  const handleAddStaff = async (data: any) => {
    console.log(89, data);
    const { id, createdAt, lastLoginAt, ...staffForm } = data;
    if (type === 'edit' && staffDetail) {
      await editStaff.call({
        id: staffDetail.id,
        body: staffForm
      });
    } else {
      await addStaff.call(staffForm);
    }
    refetch();
    dialog.handleClose();
  };

  return (
    <Dialog open={dialog.open} onClose={dialog.handleClose} maxWidth='lg' fullWidth>
      <DialogTitle>{type === 'add' ? 'Add Staff' : 'Edit Staff'}</DialogTitle>
      <DialogContent className='grid grid-cols-3 gap-3'>
        <Controller
          control={control}
          name='role'
          rules={{ required: 'Required' }}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label='Role'
              size='small'
              fullWidth
              margin='normal'
              error={!!errors.role}
              helperText={errors.role?.message}
              required
              className='!m-0 !mt-1'
              disabled={type === 'edit'}
            >
              <MenuItem value='DOCTOR'>Doctor</MenuItem>
              <MenuItem value='NURSE'>Nurse</MenuItem>
            </TextField>
          )}
        />
        <Controller
          control={control}
          name='fullName'
          rules={{ required: 'Required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label='Full Name'
              size='small'
              fullWidth
              margin='normal'
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
              required
              className='!m-0 !mt-1'
            />
          )}
        />
        <Controller
          control={control}
          name='sex'
          rules={{ required: 'Required' }}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label='Sex'
              size='small'
              fullWidth
              margin='normal'
              error={!!errors.sex}
              helperText={errors.sex?.message}
              required
              className='!m-0 !mt-1'
            >
              <MenuItem value='MALE'>Male</MenuItem>
              <MenuItem value='FEMALE'>Female</MenuItem>
            </TextField>
          )}
        />
        <Controller
          control={control}
          name='ssn'
          rules={{ required: 'Required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label='SSN'
              size='small'
              fullWidth
              margin='normal'
              error={!!errors.ssn}
              helperText={errors.ssn?.message}
              required
              className='!m-0 !mt-1'
            />
          )}
        />
        <Controller
          name='dateOfBirth'
          control={control}
          rules={{ required: 'Required' }}
          render={({ field }) => (
            <DesktopDatePicker
              {...field}
              label='Date of Birth *'
              value={dayjs(field.value)}
              onChange={(date: any) => setValue('dateOfBirth', date.format('YYYY-MM-DD'))}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!errors.dateOfBirth,
                  helperText: errors.dateOfBirth?.message,
                  margin: 'normal'
                }
              }}
              className='!m-0 !mt-1'
            />
          )}
        />
        <Controller
          control={control}
          name='email'
          rules={{ required: 'Required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label='Email'
              size='small'
              fullWidth
              margin='normal'
              error={!!errors.email}
              helperText={errors.email?.message}
              required
              className='!m-0 !mt-1'
            />
          )}
        />
        <Controller
          control={control}
          name='phoneNumber'
          rules={{ required: 'Required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label='Phone Number'
              size='small'
              fullWidth
              margin='normal'
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
              required
              className='!m-0 !mt-1'
            />
          )}
        />
        <Controller
          control={control}
          name='address'
          rules={{ required: 'Required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label='Address'
              size='small'
              fullWidth
              margin='normal'
              error={!!errors.address}
              helperText={errors.address?.message}
              required
              className='!m-0 !mt-1'
            />
          )}
        />
        <Controller
          control={control}
          name='nationality'
          rules={{ required: 'Required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label='Nationality'
              size='small'
              fullWidth
              margin='normal'
              error={!!errors.nationality}
              helperText={errors.nationality?.message}
              required
              className='!m-0 !mt-1'
            />
          )}
        />
        <Controller
          name='startWorkingDate'
          control={control}
          rules={{ required: 'Required' }}
          render={({ field }) => (
            <DesktopDatePicker
              {...field}
              label='Start Working Date *'
              value={dayjs(field.value)}
              onChange={(date: any) => setValue('startWorkingDate', date.format('YYYY-MM-DD'))}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!errors.startWorkingDate,
                  helperText: errors.startWorkingDate?.message,
                  margin: 'normal'
                }
              }}
              className='!m-0 !mt-1'
            />
          )}
        />
        <Controller
          control={control}
          name='department'
          rules={{ required: 'Required' }}
          render={({ field }) => (
            <Autocomplete
              options={departments}
              value={field.value || ''}
              onChange={(_, newValue) => field.onChange(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Department'
                  size='small'
                  fullWidth
                  margin='normal'
                  error={!!errors.department}
                  helperText={errors.department?.message}
                  required
                  className='!m-0 !mt-1'
                />
              )}
            />
          )}
        />
        <Controller
          control={control}
          name='qualification'
          rules={{ required: 'Required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label='Qualification'
              size='small'
              fullWidth
              margin='normal'
              error={!!errors.qualification}
              helperText={errors.qualification?.message}
              required
              className='!m-0 !mt-1'
            />
          )}
        />
        <Controller
          control={control}
          name='licenseNumber'
          rules={{ required: 'Required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label='License Number'
              size='small'
              fullWidth
              margin='normal'
              error={!!errors.licenseNumber}
              helperText={errors.licenseNumber?.message}
              required
              className='!m-0 !mt-1'
            />
          )}
        />
        <Controller
          control={control}
          name='biography'
          render={({ field }) => (
            <TextField
              {...field}
              label='Biography'
              size='small'
              fullWidth
              margin='normal'
              className='!m-0 !mt-1 col-span-2'
            />
          )}
        />
        {watch('role') === 'DOCTOR' && (
          <>
            <ChipInput
              name='specializations'
              control={control}
              label='Specializations *'
              rules={{ required: 'Please add at least one specialization' }}
              chipListClass='col-span-2'
            />
            <ChipInput
              name='services'
              control={control}
              label='Services *'
              rules={{ required: 'Please add at least one service' }}
              chipListClass='col-span-2'
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            dialog.handleClose();
          }}
          color='secondary'
        >
          Cancel
        </Button>
        <Button onClick={handleSubmit(handleAddStaff)} color='primary'>
          {type === 'add' ? 'Add' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default StaffDialog;
