import {
  Dialog,
  DialogContent,
  Button,
  DialogProps,
  DialogTitle,
  InputAdornment,
  TextField,
  IconButton
} from '@mui/material';
import React, { useState } from 'react';
import { Box, Stack } from '@mui/system';
import { LockCircle } from 'iconsax-react';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { useFormik } from 'formik';
import useFunction from 'src/hooks/use-function';

function AccountPasswordDialog({ ...props }: DialogProps) {
  const [viewRawOldPassword, setViewRawOldPassword] = useState(false);
  const [viewRawNewPassword, setViewRawNewPassword] = useState(false);
  const [viewRawRetypePassword, setViewRawRetypePassword] = useState(false);
  const updatePasswordApi = useFunction((async () => console.log(1)), {
    successMessage: 'Update password successfully!'
  });

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      newPasswordConfirm: ''
    },
    onSubmit: async (values) => {
      if (values.newPassword != values.newPasswordConfirm) {
        formik.setFieldError('newPasswordConfirm', 'Mật khẩu không khớp');
      }
      const { error } = await updatePasswordApi.call({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword
      });
      if (!error) {
        formik.setValues({
          currentPassword: '',
          newPassword: '',
          newPasswordConfirm: ''
        });
        props.onClose?.({}, 'backdropClick');
      }
    }
  });

  return (
    <Dialog
      open={props.open}
      onClose={(e) => props.onClose?.(e, 'backdropClick')}
      maxWidth='sm'
      fullWidth
    >
      <DialogTitle>Update Password</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Stack
            spacing={2}
            sx={{
              py: 1
            }}
          >
            <TextField
              label='Current Password'
              type={!viewRawOldPassword ? 'password' : 'text'}
              required
              value={formik.values.currentPassword}
              name='currentPassword'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <LockCircle variant='Bold' />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={() => {
                        setViewRawOldPassword(!viewRawOldPassword);
                      }}
                    >
                      {viewRawOldPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <TextField
              label='New Password'
              type={!viewRawNewPassword ? 'password' : 'text'}
              value={formik.values.newPassword}
              name='newPassword'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <LockCircle variant='Bold' />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={() => {
                        setViewRawNewPassword(!viewRawNewPassword);
                      }}
                    >
                      {viewRawNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <TextField
              label='Retype New Password'
              type={!viewRawRetypePassword ? 'password' : 'text'}
              required
              value={formik.values.newPasswordConfirm}
              name='newPasswordConfirm'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <LockCircle variant='Bold' />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={() => {
                        setViewRawRetypePassword(!viewRawRetypePassword);
                      }}
                    >
                      {viewRawRetypePassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Stack>
        </DialogContent>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: 3,
            py: 2
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'center'
            }}
          >
            <Button
              color='inherit'
              variant='contained'
              onClick={(e) => props.onClose?.(e, 'backdropClick')}
            >
              Cancel
            </Button>
            <Button variant='contained' color='primary' type='submit'>
              Update
            </Button>
          </Box>
        </Box>
      </form>
    </Dialog>
  );
}

export default AccountPasswordDialog;
function async(arg0: () => void): (payload: unknown) => Promise<unknown> {
  throw new Error('Function not implemented.');
}

