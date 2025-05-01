import React from 'react';
import { AppointmentDetailConfig } from '../appointment-management-table-config';
import { Box, Stack, Grid, Typography, TextField } from '@mui/material';
import { useResponsive } from 'src/utils/use-responsive';
import { formatStandardDate, formatTime } from 'src/utils/format-time-currency';
import { FileDropzone } from '@components';

interface AppointmentDetailInfoProps {
  appointment: AppointmentDetailConfig;
}

const AppointmentDetailInfo: React.FC<AppointmentDetailInfoProps> = ({ appointment }) => {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  return (
    <Stack>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Stack spacing={1}>
            <Typography variant='body2'>Appointment Type</Typography>
            <TextField
              variant='outlined'
              fullWidth
              value={appointment?.type === 'FIRST_VISIT' ? 'Initial' : 'Follow-up'}
              disabled
            />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={1}>
            <Typography variant='body2'>Doctors</Typography>
            <TextField
              variant='outlined'
              fullWidth
              value={appointment?.doctor?.fullName || ''}
              disabled={appointment?.doctor !== null}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={1}>
            <Typography variant='body2'>Time</Typography>
            <TextField
              variant='outlined'
              fullWidth
              value={`${formatTime(appointment?.timeSlot?.startTime as string)} - ${formatTime(appointment?.timeSlot?.endTime)}`}
              disabled
            />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={1}>
            <Typography variant='body2'>Date</Typography>
            <TextField
              variant='outlined'
              fullWidth
              value={formatStandardDate(appointment?.timeSlot?.date)}
              disabled
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant='body2'>Reason for consultations</Typography>
            <TextField variant='outlined' fullWidth value={appointment?.reason} disabled />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant='body2'>Review notes</Typography>
            <TextField variant='outlined' fullWidth value={appointment?.notes} disabled />
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default AppointmentDetailInfo;
