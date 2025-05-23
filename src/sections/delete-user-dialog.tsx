import { Dialog, DialogTitle, DialogActions, Button, DialogProps, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import useFunction from 'src/hooks/use-function';
import { PatientDetail } from 'src/types/user';

type UserDetail = PatientDetail;
function DeleteUserDialog({
  user,
  onConfirm,
  ...dialogProps
}: DialogProps & {
  user: UserDetail;
  onConfirm?: () => Promise<void>;
}) {
  const onConfirmHelper = useFunction(onConfirm!, {
    successMessage: `Xóa ${user?.role === 'PATIENT' ? 'bệnh nhân' : 'nhân viên'} thành công!`
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
            Xóa {user?.role === 'PATIENT' ? 'bệnh nhân' : 'nhân viên'} {user?.fullName}
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
          Xoá
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteUserDialog;
