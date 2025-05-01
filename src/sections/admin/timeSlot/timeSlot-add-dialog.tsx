import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import { useCallback } from 'react';
import useFunction from 'src/hooks/use-function';
import { useTimeSlotContext } from 'src/contexts/timeSlot/timeSlot-context';

interface AddTimeSlotFormProps {
  week: number;
  date: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY';
  startTime: string;
  endTime: string;
  maxAppointmentPerTimeSlot: number;
}

interface TimeSlotAddDialoggProps extends DialogProps {
  type?: 'add' | 'edit';
}

function TimeSlotAddDialogg({ type = 'add', ...DialogProps }: TimeSlotAddDialoggProps) {
  const { createTimeSlot } = useTimeSlotContext();
  const handleAddTimeSlot = useCallback(async (values: AddTimeSlotFormProps) => {
    const { week, date, startTime, endTime, maxAppointmentPerTimeSlot } = values;
    await createTimeSlot({
      week,
      date,
      startTime,
      endTime,
      maxAppointmentPerTimeSLot: maxAppointmentPerTimeSlot
    });
  }, []);

  const handleAddTimeSlotHelper = useFunction(handleAddTimeSlot, {
    successMessage: 'Time slot added successfully!'
  });

  const formik = useFormik<AddTimeSlotFormProps>({
    initialValues: {
      week: 1,
      date: 'MONDAY',
      startTime: '',
      endTime: '',
      maxAppointmentPerTimeSlot: 1
    },
    onSubmit: async (values) => {
      await handleAddTimeSlotHelper.call(values);
    }
  });

  return (
    <Dialog fullWidth maxWidth='sm' {...DialogProps}>
      <DialogTitle>
        <Typography variant='h6'>Add Time Slot</Typography>
        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <TextField
              type='number'
              label='Week'
              fullWidth
              name='week'
              value={formik.values.week}
              onChange={formik.handleChange}
              placeholder='Enter week number'
            />
          </Grid>

          <Grid item xs={12} lg={6}>
            <FormControl fullWidth variant='outlined'>
              <Select
                labelId='select-date-label'
                value={formik.values.date}
                onChange={(e) => formik.setFieldValue('date', e.target.value)}
                displayEmpty
              >
                <MenuItem value='MONDAY'>MONDAY</MenuItem>
                <MenuItem value='TUESDAY'>TUESDAY</MenuItem>
                <MenuItem value='WEDNESDAY'>WEDNESDAY</MenuItem>
                <MenuItem value='THURSDAY'>THURSDAY</MenuItem>
                <MenuItem value='FRIDAY'>FRIDAY</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} lg={6}>
            <TextField
              type='time'
              label='Start Time'
              fullWidth
              variant='outlined'
              name='startTime'
              value={formik.values.startTime}
              onChange={formik.handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} lg={6}>
            <TextField
              type='time'
              label='End Time'
              fullWidth
              variant='outlined'
              name='endTime'
              value={formik.values.endTime}
              onChange={formik.handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} lg={12}>
            <TextField
              type='number'
              label='Max Appointments'
              fullWidth
              variant='outlined'
              name='maxAppointmentPerTimeSlot'
              value={formik.values.maxAppointmentPerTimeSlot}
              onChange={formik.handleChange}
              placeholder='Enter max appointments'
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className='flex justify-center'>
        <Button
          variant='contained'
          color='inherit'
          onClick={(e) => {
            DialogProps.onClose?.(e, 'escapeKeyDown');
          }}
        >
          Cancel
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={(e) => {
            DialogProps.onClose?.(e, 'escapeKeyDown');
            formik.handleSubmit();
          }}
        >
          {type === 'add' ? 'Add' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TimeSlotAddDialogg;
