import React, { useMemo } from 'react';
import { Box, Typography, Stack, Grid, Avatar, Divider, Button } from '@mui/material';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { useResponsive } from 'src/utils/use-responsive';
import { patients, appointments, doctors } from 'src/utils/generate-mock';
import { Calendar2, Clock } from 'iconsax-react';
import { formatStandardDate, formatTime } from 'src/utils/format-time-currency';

function DashboardAppointment() {
  const { isDesktop } = useResponsive();
  const filteredAppointments = useMemo(() => {
    return appointments.slice(0, 6).map((appointment) => {
      const patient = patients.find((patient) => patient.id === appointment.userId);
      const doctor = doctors.find((doctor) => doctor.id === appointment.staffId);
      return {
        ...appointment,
        patient,
        doctor
      };
    });
  }, [patients, appointments]);

  return (
    <Stack>
      <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
        <Typography variant={'h6'}>Upcoming Appointment</Typography>
        {isDesktop && (
          <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <Box display={'flex'} gap={1}>
              <Box className='border p-1 border-gray-200 rounded-md cursor-pointer'>
                <ChevronLeft color='gray' />
              </Box>
              <Box className='border p-1 border-gray-200 rounded-md cursor-pointer'>
                <ChevronRight color='gray' />
              </Box>
            </Box>
          </Stack>
        )}
      </Box>
      <Stack mt={2}>
        <Grid container spacing={3}>
          {filteredAppointments.map((appointment, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                className='border p-3 border-gray-200 rounded-md shadow-sm'
                display={'flex'}
                flexDirection={'column'}
                gap={2}
              >
                <Stack direction={'row'} spacing={2} alignItems={'center'}>
                  <Avatar src={appointment.doctor?.photoUrl} />
                  <Box>
                    <Typography variant={'h6'}>{appointment.doctor?.name}</Typography>
                    <Typography variant={'body2'} fontWeight={'light'}>
                      {appointment.doctor?.speciality}
                    </Typography>
                  </Box>
                </Stack>
                <Divider />
                <Stack direction={'row'} spacing={2} alignItems={'center'}>
                  <Avatar src={appointment.patient?.photoUrl} />
                  <Typography variant={'h6'}>{appointment.patient?.name}</Typography>
                </Stack>
                <Stack
                  direction={'row'}
                  spacing={2}
                  alignItems={'center'}
                  paddingX={3}
                  paddingY={2}
                  border={1}
                  borderRadius={2}
                  borderColor={'#E5E7FB'}
                >
                  <Box display={'flex'} gap={1} alignItems={'center'}>
                    <Calendar2 color='#070B5C' />
                    <Typography variant={'body2'} fontWeight={'bold'} color='#070B5C'>
                      {formatStandardDate(appointment.timeSlot.date)}
                    </Typography>
                  </Box>
                  <Divider orientation='vertical' flexItem sx={{ height: '24px' }} />
                  <Box display={'flex'} gap={1} alignItems={'center'}>
                    <Clock color='#070B5C' />
                    <Typography variant={'body2'} fontWeight={'bold'} color='#070B5C'>
                      {formatTime(appointment.timeSlot.startTime)} -{' '}
                      {formatTime(appointment.timeSlot.endTime)}
                    </Typography>
                  </Box>
                </Stack>
                <Stack direction={'row'} spacing={2} justifyContent={'center'} width={'100%'}>
                  <Button
                    variant='contained'
                    color='secondary'
                    sx={{ bgcolor: '#E5E7FB', color: '#0E1680', width: '50%' }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant='contained'
                    sx={{ bgcolor: '#0E1680', width: '50%' }}
                    startIcon={<Calendar color='white' />}
                  >
                    Reschedule
                  </Button>
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
}

export default DashboardAppointment;
