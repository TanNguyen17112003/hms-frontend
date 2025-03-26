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
  onConfirm?: () => Promise<void>;
}) {
  const onConfirmHelper = useFunction(onConfirm!, {
    successMessage: `Đã chấp nhận lịch hẹn từ bệnh nhân ${appointment?.patient?.name}!`
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
            Chấp nhận lịch hẹn từ bệnh nhân {appointment?.patient?.name}?
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
          Hủy
        </Button>
        <Button
          variant='contained'
          color='success'
          onClick={async (e) => {
            dialogProps.onClose?.(e, 'escapeKeyDown');
            await onConfirmHelper.call({});
          }}
        >
          Chấp nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ApproveAppointmentDialog;
