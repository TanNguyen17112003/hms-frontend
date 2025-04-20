import { Dialog, DialogTitle, DialogActions, Button, DialogProps, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import useFunction from 'src/hooks/use-function';
import { AppointmentDetailConfig } from './appointment-management-table-config';

function ApproveAppointmentDialog({
  appointment,
  onConfirm,
  ...dialogProps
}: DialogProps & {
  appointment: AppointmentDetailConfig;
  onConfirm?: () => void;
}) {
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
            Approve this appointment {appointment?.patient?.fullName}?
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
          color='success'
          onClick={(e) => {
            dialogProps.onClose?.(e, 'escapeKeyDown');
            onConfirm?.();
          }}
        >
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ApproveAppointmentDialog;
