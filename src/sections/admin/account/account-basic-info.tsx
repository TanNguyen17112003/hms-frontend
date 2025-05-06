import React, { useCallback } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Divider
} from '@mui/material';
import { StaffDetail } from 'src/types/user';
import { useFormik } from 'formik';
import { UpdateProfileRequest } from 'src/api/user';
import useFunction from 'src/hooks/use-function';
import useAppSnackbar from 'src/hooks/use-app-snackbar';
import { useAuth } from '@hooks';
import { formatStandardDate } from 'src/utils/format-time-currency';

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
        formik.setTouched({});
        formik.setSubmitting(false);
      }
    }
  });

  return (
    <Card className='w-full p-5'>
      <Typography variant='h6' fontWeight='bold' className='text-bg-primary'>
        Basic Information
      </Typography>
      <Divider sx={{ my: 2 }} />
      <CardContent className='p-4'>
        <Box className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
          {/* Full Name */}
          <Box>
            <Typography variant='body2' sx={{ color: '#475467', mb: 1 }}>
              Full Name
            </Typography>
            <TextField
              variant='outlined'
              fullWidth
              value={formik.values.fullName || ''}
              onChange={formik.handleChange}
              name='fullName'
            />
          </Box>

          {/* Email */}
          <Box>
            <Typography variant='body2' sx={{ color: '#475467', mb: 1 }}>
              Email
            </Typography>
            <TextField
              variant='outlined'
              fullWidth
              value={formik.values.email || ''}
              name='email'
              disabled
            />
          </Box>

          {/* Phone Number */}
          <Box>
            <Typography variant='body2' sx={{ color: '#475467', mb: 1 }}>
              Phone Number
            </Typography>
            <TextField
              variant='outlined'
              fullWidth
              value={formik.values.phoneNumber || ''}
              onChange={formik.handleChange}
              name='phoneNumber'
            />
          </Box>

          {/* SSN */}
          <Box>
            <Typography variant='body2' sx={{ color: '#475467', mb: 1 }}>
              SSN
            </Typography>
            <TextField
              variant='outlined'
              fullWidth
              value={formik.values.ssn || ''}
              onChange={formik.handleChange}
              name='ssn'
            />
          </Box>

          {/* Address */}
          <Box>
            <Typography variant='body2' sx={{ color: '#475467', mb: 1 }}>
              Address
            </Typography>
            <Typography variant='body1' sx={{ color: '#101828' }}>
              {staff?.address || 'Not provided'}
            </Typography>
          </Box>

          {/* Date of Birth */}
          <Box>
            <Typography variant='body2' sx={{ color: '#475467', mb: 1 }}>
              Date of Birth
            </Typography>
            <Typography variant='body1' sx={{ color: '#101828' }}>
              {formatStandardDate(staff?.dateOfBirth as string)}
            </Typography>
          </Box>

          {/* Sex */}
          <Box>
            <Typography variant='body2' sx={{ color: '#475467', mb: 1 }}>
              Sex
            </Typography>
            <Typography variant='body1' sx={{ color: '#101828' }}>
              {staff?.sex}
            </Typography>
          </Box>

          {/* Nationality */}
          <Box>
            <Typography variant='body2' sx={{ color: '#475467', mb: 1 }}>
              Nationality
            </Typography>
            <Typography variant='body1' sx={{ color: '#101828' }}>
              {staff?.nationality}
            </Typography>
          </Box>

          {/* Join Date */}
          <Box>
            <Typography variant='body2' sx={{ color: '#475467', mb: 1 }}>
              Join Date
            </Typography>
            <Typography variant='body1' sx={{ color: '#101828' }}>
              {formatStandardDate(staff?.createdAt as string)}
            </Typography>
          </Box>
        </Box>

        {/* Save Button */}
        <Box className='w-full flex justify-end mt-4'>
          <Button
            type='submit'
            variant='contained'
            disabled={formik.isSubmitting}
            startIcon={formik.isSubmitting && <CircularProgress size={20} />}
            onClick={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
          >
            {formik.isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default AccountBasicInfo;
