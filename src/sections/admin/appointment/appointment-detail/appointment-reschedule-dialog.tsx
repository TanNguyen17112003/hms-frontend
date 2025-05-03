import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogProps,
  Typography,
  DialogContent,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useFunction from 'src/hooks/use-function';
import { TimeSlotApi } from 'src/api/timeSlot';
import { useAppointmentContext } from 'src/contexts/appointment/appointment-context';
import { LoadingProcess } from '@components';
import { useAuth } from '@hooks';
import { getDateFromWeekandDate } from 'src/utils/format-time-currency';
import { useRouter } from 'next/router';

function AppointmentRescheduleDIalog({
  onConfirm,
  ...dialogProps
}: DialogProps & {
  onConfirm?: () => Promise<void>;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const getOwnedTimeSlots = useFunction(TimeSlotApi.getDoctorTimeSlots);

  const { rescheduleAppointment } = useAppointmentContext();

  const timeSlots = useMemo(() => {
    return getOwnedTimeSlots.data || [];
  }, [getOwnedTimeSlots.data]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const handleTimeSlotChange = (event: SelectChangeEvent<string>) => {
    setSelectedTimeSlot(event.target.value);
  };

  const handleApprove = useCallback(async () => {
    try {
      await rescheduleAppointment(router.query.appointmentId as string, selectedTimeSlot as string);
    } catch (error) {
      throw error;
    }
  }, [router.query.appointmentId, selectedTimeSlot, rescheduleAppointment]);

  const handleApproveHelper = useFunction(handleApprove, {
    successMessage: `You have successfully rescheduled the appointment`
  });

  useEffect(() => {
    if (dialogProps.open) {
      getOwnedTimeSlots.call(user?.id as string);
    }
  }, [dialogProps.open, user?.id]);

  return (
    <Dialog fullWidth maxWidth='xs' {...dialogProps}>
      <DialogTitle>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Typography variant='h6'>Choose your timeslot to reschedule</Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            flexDirection: 'column'
          }}
        >
          <FormControl fullWidth variant='outlined'>
            <InputLabel id='doctor-select-label'>Select TimeSlot</InputLabel>
            <Select
              labelId='doctor-select-label'
              value={selectedTimeSlot || ''}
              onChange={handleTimeSlotChange}
              label='Select TimeSlot'
            >
              {timeSlots.map((timeSlot) => (
                <MenuItem
                  key={timeSlot.timeSlot.id}
                  value={timeSlot.timeSlot.id}
                  className='flex flex-col'
                >
                  <Typography>
                    {timeSlot.timeSlot.startTime} - {timeSlot.timeSlot.endTime}
                  </Typography>
                  <Typography>
                    {getDateFromWeekandDate(timeSlot.timeSlot.week, timeSlot.timeSlot.date)}
                  </Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>

      <DialogActions className='flex justify-center'>
        <Button
          variant='contained'
          color={'inherit'}
          onClick={(e) => {
            dialogProps.onClose?.(e, 'escapeKeyDown');
            handleApproveHelper.call({});
          }}
        >
          Cancel
        </Button>
        <Button variant='contained' color='success' onClick={() => handleApproveHelper.call({})}>
          Accept
        </Button>
      </DialogActions>
      {getOwnedTimeSlots.loading && <LoadingProcess />}
    </Dialog>
  );
}

export default AppointmentRescheduleDIalog;
