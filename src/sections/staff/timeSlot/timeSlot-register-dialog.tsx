import { Dialog, DialogTitle, DialogActions, Button, DialogProps, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import useFunction from 'src/hooks/use-function';
import { TimeSlot } from 'src/types/appointment';

function TimeSlotRegisterDialog({
  timeSlot,
  onConfirm,
  ...dialogProps
}: DialogProps & {
  timeSlot: TimeSlot;
  onConfirm?: () => Promise<void>;
}) {
  const onConfirmHelper = useFunction(onConfirm!, {
    successMessage: `Register successfully!`
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
          <Typography variant='h6'>Do you want to register for this time slot?</Typography>
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
          color='primary'
          onClick={async (e) => {
            dialogProps.onClose?.(e, 'escapeKeyDown');
            await onConfirmHelper.call({});
          }}
        >
          Register
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TimeSlotRegisterDialog;
