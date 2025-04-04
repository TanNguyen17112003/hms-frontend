import React, { useMemo } from 'react';
import { AppointmentDetailConfig } from '../appointment-management-table-config';
import { Avatar, Box, Divider, Grid, Stack, Typography } from '@mui/material';
import { calculateAge, formatStandardDate } from 'src/utils/format-time-currency';

interface AppointmentDetailPatientProps {
  appointment: AppointmentDetailConfig;
}

const AppointmentDetailPatient: React.FC<AppointmentDetailPatientProps> = ({ appointment }) => {
  const patientInfo = useMemo(() => {
    return [
      {
        title: 'Email',
        value: appointment.patient?.email
      },
      {
        title: 'SSN',
        value: appointment.patient?.ssn
      },
      {
        title: 'Address',
        value: appointment.patient?.address
      },
      {
        title: 'Phone',
        value: appointment.patient?.phoneNumber
      },
      {
        title: 'Date of Birth',
        value: formatStandardDate(appointment.patient?.dob as string)
      },
      {
        title: 'Role',
        value: 'Patient'
      }
    ];
  }, [appointment]);
  return (
    <Stack spacing={3}>
      <Box display='flex' flexDirection={'column'} gap={1.5} alignItems={'center'} width={'100%'}>
        <Avatar src={appointment.patient?.photoUrl} sx={{ width: 100, height: 100 }} />
        <Stack direction={'column'} spacing={0.5}>
          <Typography className='text-bg-primary' fontWeight={'bold'}>
            {appointment.patient?.fullName}
          </Typography>
          <Typography variant='body2'>
            {calculateAge(appointment.patient?.dob as string)} Years,{' '}
            {appointment.patient?.gender === 'MALE' ? 'Male' : 'Female'}
          </Typography>
        </Stack>
      </Box>
      <Divider />
      <Box>
        <Grid container spacing={2}>
          {patientInfo.map((info, index) => (
            <Grid item xs={6} key={index}>
              <Stack direction={'column'} spacing={1}>
                <Typography variant='body2' color='textSecondary'>
                  {info.title}
                </Typography>
                <Typography variant='body2' className='text-bg-primary' fontWeight={'bold'}>
                  {info.value}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
};

export default AppointmentDetailPatient;
