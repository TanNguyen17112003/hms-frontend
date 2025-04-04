import { Button, CircularProgress, Grid, Stack, TextField, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import { UserDetail } from 'src/types/user';
import { formatStandardDate } from 'src/utils/format-time-currency';
import { useAuth } from '@hooks';
import { useFormik } from 'formik';
import { UpdateProfileRequest } from 'src/api/user';
import useFunction from 'src/hooks/use-function';
import useAppSnackbar from 'src/hooks/use-app-snackbar';

function AccountBasicInfo({ user }: { user: UserDetail }) {
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
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      ssn: user.ssn,
    },
    onSubmit: async (values) => {
      const { error } = await handleSubmitHelper.call({
        fullName: values.fullName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        ssn: values.ssn,
      });
      if (!error) {
        formik.setValues({
          fullName: values.fullName,
          email: values.email,
          phoneNumber: values.phoneNumber,
          ssn: values.ssn,
        });
        formik.setTouched({});
        formik.setSubmitting(false);
      }
    },
  });

  return (
    <Stack spacing={2}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={1.5} alignItems={'center'} justifyContent={'center'}>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Typography variant="body2">Full name</Typography>
              <TextField
                variant="outlined"
                fullWidth
                value={formik.values.fullName || user.fullName}
                onChange={formik.handleChange} // Bind formik's onChange
                name="fullName" // Add the name attribute
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Typography variant="body2">Email</Typography>
              <TextField
                variant="outlined"
                fullWidth
                value={formik.values.email || user.email}
                onChange={formik.handleChange} // Bind formik's onChange
                name="email" // Add the name attribute
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Typography variant="body2">Phone number</Typography>
              <TextField
                variant="outlined"
                fullWidth
                value={formik.values.phoneNumber || user.phoneNumber}
                onChange={formik.handleChange} // Bind formik's onChange
                name="phoneNumber" // Add the name attribute
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Typography variant="body2">SSN</Typography>
              <TextField
                variant="outlined"
                fullWidth
                value={formik.values.ssn || user.ssn}
                onChange={formik.handleChange} 
                name="ssn" // Add the name attribute
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Typography variant="body2">Occupation</Typography>
              <TextField variant="outlined" fullWidth value={user?.occupation} />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Typography variant="body2">Marital status</Typography>
              <TextField variant="outlined" fullWidth value={user?.maritalStatus} />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <Typography variant="body2">Address</Typography>
              <TextField variant="outlined" fullWidth value={user?.address} />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Typography variant="body2">Date of birth</Typography>
              <TextField
                variant="outlined"
                fullWidth
                value={formatStandardDate(user?.dob as string)}
                disabled
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Typography variant="body2">Sex</Typography>
              <TextField variant="outlined" fullWidth value={user?.gender} disabled />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <Typography variant="body2">Nationality</Typography>
              <TextField variant="outlined" fullWidth value={user?.nationality} disabled />
            </Stack>
          </Grid>

          <Grid item xs={12} md={12}>
            <Stack spacing={1}>
              <Typography variant="body2">Join date</Typography>
              <TextField
                variant="outlined"
                fullWidth
                value={formatStandardDate(user?.createdAt as string)}
                disabled
              />
            </Stack>
          </Grid>
        </Grid>
        <Button
          type="submit"
          sx={{
            width: 'fit-content',
          }}
          variant="contained"
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