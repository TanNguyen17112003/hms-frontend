import { Dialog, DialogTitle, DialogActions, Button, DialogProps, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import useFunction from 'src/hooks/use-function';
import { AppointmentDetailConfig } from './appointment-management-table-config';

function DeclineAppointmentDialog({
  appointment,
  onConfirm,
  ...dialogProps
}: DialogProps & {
  appointment: AppointmentDetailConfig;
  onConfirm?: () => Promise<void>;
}) {
  const onConfirmHelper = useFunction(onConfirm!, {
    successMessage: `You have recently rejectd the appointment ${appointment?.patient?.fullName}!`
  });

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
          <Typography variant='h6'>
            Do you want to delete this appointment {appointment?.patient?.fullName}?
          </Typography>
        </Box>
      </DialogTitle>

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
          color='error'
          onClick={async (e) => {
            dialogProps.onClose?.(e, 'escapeKeyDown');
            await onConfirmHelper.call({});
          }}
        >
          Reject
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeclineAppointmentDialog;
