import { Button, CircularProgress, Grid, Stack, TextField, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import { StaffDetail } from 'src/types/user';
import { formatStandardDate } from 'src/utils/format-time-currency';
import { useAuth } from '@hooks';
import { useFormik } from 'formik';
import { UpdateProfileRequest } from 'src/api/user';
import useFunction from 'src/hooks/use-function';
import useAppSnackbar from 'src/hooks/use-app-snackbar';

function AccountBasicInfo({ staff }: { staff: StaffDetail }) {
  const { updateProfile } = useAuth();
  const { showSnackbarSuccess } = useAppSnackbar();

  const handleSubmit = useCallback(
    async (payload: UpdateProfileRequest) => {
      try {
        const response = await updateProfile(payload);
        showSnackbarSuccess('Update profile successfully!');
        return response;
      } catch (error) {
        throw error;
      }
    },
    [updateProfile]
  );

  const handleSubmitHelper = useFunction(handleSubmit);

  const formik = useFormik<Partial<UpdateProfileRequest>>({
    initialValues: {
      fullName: staff?.fullName,
      email: staff?.email,
      phoneNumber: staff?.phoneNumber,
      ssn: staff?.ssn
    },
    onSubmit: async (values) => {
      const { error } = await handleSubmitHelper.call({
        fullName: values.fullName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        ssn: values.ssn
      });
      if (!error) {
        formik.setValues({
          fullName: values.fullName,
          email: values.email,
          phoneNumber: values.phoneNumber,
          ssn: values.ssn
        });
        formik.setTouched({});
        formik.setSubmitting(false);
      }
    }
  });

  return (
    <Stack spacing={2}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={1.5} alignItems={'center'} justifyContent={'center'}>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Typography variant='body2'>Full name</Typography>
              <TextField
                variant='outlined'
                fullWidth
                value={formik.values.fullName || staff?.fullName}
                onChange={formik.handleChange} // Bind formik's onChange
                name='fullName' // Add the name attribute
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Typography variant='body2'>Email</Typography>
              <TextField
                variant='outlined'
                fullWidth
                value={formik.values.email || staff?.email}
                onChange={formik.handleChange}
                name='email'
                disabled
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Typography variant='body2'>Phone number</Typography>
              <TextField
                variant='outlined'
                fullWidth
                value={formik.values.phoneNumber || staff?.phoneNumber}
                onChange={formik.handleChange} // Bind formik's onChange
                name='phoneNumber' // Add the name attribute
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Typography variant='body2'>SSN</Typography>
              <TextField
                variant='outlined'
                fullWidth
                value={formik.values.ssn || staff?.ssn}
                onChange={formik.handleChange}
                name='ssn' // Add the name attribute
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <Typography variant='body2'>Address</Typography>
              <TextField variant='outlined' fullWidth value={staff?.address} />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Typography variant='body2'>Date of birth</Typography>
              <TextField
                variant='outlined'
                fullWidth
                value={formatStandardDate(staff?.dateOfBirth as string)}
                disabled
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Typography variant='body2'>Sex</Typography>
              <TextField variant='outlined' fullWidth value={staff?.sex} disabled />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <Typography variant='body2'>Nationality</Typography>
              <TextField variant='outlined' fullWidth value={staff?.nationality} disabled />
            </Stack>
          </Grid>

          <Grid item xs={12} md={12}>
            <Stack spacing={1}>
              <Typography variant='body2'>Join date</Typography>
              <TextField
                variant='outlined'
                fullWidth
                value={formatStandardDate(staff?.createdAt as string)}
                disabled
              />
            </Stack>
          </Grid>
        </Grid>
        <Button
          type='submit'
          sx={{
            width: 'fit-content'
          }}
          variant='contained'
          disabled={formik.isSubmitting}
          startIcon={formik.isSubmitting && <CircularProgress size={20} />}
        >
          {formik.isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </Stack>
  );
}

export default AccountBasicInfo;
