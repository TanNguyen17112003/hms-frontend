import React, { useMemo } from 'react';
import { AppointmentDetailConfig } from '../appointment-management-table-config';
import { Avatar, Box, Card, Divider, Grid, Stack, Typography } from '@mui/material';
import { calculateAge, formatStandardDate } from 'src/utils/format-time-currency';
import { UserDetail } from 'src/types/user';

interface AppointmentDetailPatientProps {
  patient: UserDetail;
}

const AppointmentDetailPatient: React.FC<AppointmentDetailPatientProps> = ({ patient }) => {
  const patientInfo = useMemo(() => {
    return [
      {
        title: 'Full Name',
        value: patient?.fullName
      },
      {
        title: 'SSN',
        value: patient?.ssn
      },
      {
        title: 'Address',
        value: patient?.address
      },
      {
        title: 'Phone',
        value: patient?.phoneNumber
      },
      {
        title: 'Date of Birth',
        value: formatStandardDate(patient?.dateOfBirth as string)
      },
      {
        title: 'Role',
        value: 'Patient'
      }
    ];
  }, [patient]);
  return (
    <Card className='px-4 py-5 h-full'>
      <Typography variant='h6' fontWeight={'bold'} className='text-bg-primary'>
        Patient Information
      </Typography>
      <Divider className='py-2' />
      <Stack spacing={3} pt={2}>
        <Box display='flex' flexDirection={'column'} alignItems={'center'} width={'100%'}>
          <Box
            component='img'
            src='/ui/PatientDetail/avt-photo-blue-tick.png'
            alt={`${patient?.fullName}'s profile`}
            className='w-24 h-24 rounded-full object-cover'
          />
          <Stack direction={'column'} spacing={0.5} alignItems={'center'}>
            <Typography className='text-bg-primary' fontWeight={'bold'}>
              {patient?.fullName}
            </Typography>
            <Typography variant='body2'>
              {calculateAge(patient?.dateOfBirth as string)} Years,{' '}
              {patient?.sex === 'MALE' ? 'Male' : 'Female'}
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
    </Card>
  );
};

export default AppointmentDetailPatient;
