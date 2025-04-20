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
import { AppointmentDetailConfig } from './appointment-management-table-config';
import { TimeSlotApi } from 'src/api/timeSlot';
import { useAppointmentContext } from 'src/contexts/appointment/appointment-context';

function AppointmentAssignDialog({
  appointment,
  onConfirm,
  ...dialogProps
}: DialogProps & {
  appointment: AppointmentDetailConfig;
  onConfirm?: () => Promise<void>;
}) {
  const onConfirmHelper = useFunction(onConfirm!, {
    successMessage: `You have approved the appointment ${appointment?.patient?.fullName}!`
  });

  const { assignAppointment, approveAppointment } = useAppointmentContext();
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const getListStaffs = useFunction(TimeSlotApi.getDoctorBasedOnTimeSlot);
  const staffs = useMemo(() => {
    return getListStaffs.data || [];
  }, [getListStaffs.data]);

  const handleDoctorChange = (event: SelectChangeEvent<string>) => {
    setSelectedDoctor(event.target.value);
  };

  const handleApprove = useCallback(async () => {
    try {
      await assignAppointment({
        appointmentId: appointment?.id,
        doctorId: selectedDoctor || ''
      });
      await approveAppointment(appointment?.id);
    } catch (error) {
      throw error;
    }
  }, []);

  useEffect(() => {
    getListStaffs.call(appointment?.timeSlot?.id);
  }, [appointment?.timeSlot?.id]);

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
          <Typography variant='h6'>Choose a doctor for this appointment</Typography>
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
            <InputLabel id='doctor-select-label'>Select Doctor</InputLabel>
            <Select
              labelId='doctor-select-label'
              value={selectedDoctor || ''}
              onChange={handleDoctorChange}
              label='Select Doctor'
            >
              {staffs.map((staff) => (
                <MenuItem key={staff.id} value={staff.id}>
                  {staff.fullName}
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
          }}
        >
          Cancel
        </Button>
        <Button
          variant='contained'
          color='success'
          onClick={async (e) => {
            dialogProps.onClose?.(e, 'escapeKeyDown');
            handleApprove();
          }}
        >
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AppointmentAssignDialog;
