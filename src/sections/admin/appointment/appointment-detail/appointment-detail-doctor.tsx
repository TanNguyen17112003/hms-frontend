import { useCallback, useMemo, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Divider,
  Stack,
  Button,
  TextField,
  CircularProgress,
  Chip,
  IconButton,
  Card
} from '@mui/material';
import BadgeIcon from '@mui/icons-material/Badge';
import SchoolIcon from '@mui/icons-material/School';
import React from 'react';
import { StaffDetail } from 'src/types/user';

function AppointmentDetailDoctor({ doctor }: { doctor: StaffDetail }) {
  const [loading, setLoading] = useState(false);
  const [specializations, setSpecializations] = useState(doctor?.specializations || []);

  const initialValue = useMemo(
    () => [
      {
        title: 'License number',
        value: doctor?.licenseNumber,
        icon: <BadgeIcon color='primary' />,
        field: 'license'
      },
      {
        title: 'Qualification',
        value: doctor?.qualification,
        icon: <SchoolIcon color='primary' />,
        field: 'qualification'
      }
    ],
    [doctor]
  );

  const yearExperience =
    new Date().getFullYear() - new Date(doctor?.startWorkingDate).getFullYear();
  const experience = useMemo(() => {
    return `${yearExperience} years`;
  }, [yearExperience]);

  return (
    <Card className='px-4 py-5 h-full flex flex-col justify-between relative'>
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            zIndex: 9999
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <Typography variant='h6' fontWeight={'bold'} className='text-bg-primary'>
        Doctor Information
      </Typography>
      <Divider sx={{ my: 2 }} />
      {doctor && (
        <>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant='h6' fontWeight='bold'>
                Bio Information
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='h6' fontWeight='bold'>
                Basic Information
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Box display='flex' flexDirection='column' flex='1'>
                <Typography variant='body1' fontWeight='bold'>
                  Biography
                </Typography>
                <Typography>{doctor?.biography}</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display='flex' flexDirection='column' flex='1'>
                <Typography variant='body1' fontWeight='bold'>
                  Full Name
                </Typography>
                <Typography>{doctor?.fullName}</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display='flex' flexDirection='column' flex='1'>
                <Typography variant='body1' fontWeight='bold'>
                  Services
                </Typography>
                <Stack direction='row' spacing={1} flexWrap='wrap'>
                  {doctor?.services.map((service, index) => (
                    <Chip key={index} label={service} color='primary' variant='outlined' />
                  ))}
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display='flex' flexDirection='column' flex='1'>
                <Typography variant='body1' fontWeight='bold'>
                  Date of Birth
                </Typography>
                <Typography>{doctor?.dateOfBirth}</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display='flex' flexDirection='column' flex='1'>
                <Typography variant='body1' fontWeight='bold'>
                  Specializations
                </Typography>
                <Stack direction='row' spacing={1} flexWrap='wrap'>
                  {doctor?.specializations.map((specialization, index) => (
                    <Chip key={index} label={specialization} color='primary' variant='outlined' />
                  ))}
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display='flex' flexDirection='column' flex='1'>
                <Typography variant='body1' fontWeight='bold'>
                  Phone Number
                </Typography>
                <Typography>{doctor?.phoneNumber}</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box gap={1} display='flex' flexDirection='column' pt={2} height='100%'>
                <Box display='flex' flexDirection='column' flex='1'>
                  <Grid container alignItems='center' spacing={2} sx={{ mb: 1 }}>
                    <Grid item>{initialValue[0].icon}</Grid>
                    <Grid item xs>
                      <Typography variant='body1' fontWeight='bold'>
                        {initialValue[0].title}
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        {initialValue[0].value}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display='flex' flexDirection='column' flex='1'>
                <Typography variant='body1' fontWeight='bold'>
                  Email
                </Typography>
                <Typography>{doctor?.email}</Typography>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box gap={1} display='flex' flexDirection='column' pt={2} height='100%'>
                <Box display='flex' flexDirection='column' flex='1'>
                  <Grid container alignItems='center' spacing={2} sx={{ mb: 1 }}>
                    <Grid item>{initialValue[1].icon}</Grid>
                    <Grid item xs>
                      <Typography variant='body1' fontWeight='bold'>
                        {initialValue[1].title}
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        {initialValue[1].value}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display='flex' flexDirection='column' flex='1'>
                <Typography variant='body1' fontWeight='bold'>
                  Address
                </Typography>
                <Typography>{doctor?.address}</Typography>
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Grid container justifyContent='space-between' alignItems='center' sx={{ mt: 'auto' }}>
            <Grid item>
              <Typography variant='body1' fontWeight='bold'>
                Experience
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='body1' color='primary'>
                {experience}
              </Typography>
            </Grid>
          </Grid>
        </>
      )}
      {!doctor && (
        <Box
          display={'flex'}
          height={'100%'}
          justifyContent={'center'}
          alignItems={'center'}
          flexDirection={'column'}
          gap={2}
        >
          <Typography variant='h4' color='red' fontWeight={'bold'}>
            No doctor information!
          </Typography>
        </Box>
      )}
    </Card>
  );
}

export default AppointmentDetailDoctor;
