import React from 'react';
import StaffFilter from './staff-filter';
import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import { doctors } from 'src/utils/generate-mock';
import { StaffDetail } from 'src/types/user';
import { Stethoscope, Clock, Calendar, FileText, ChevronRight } from 'lucide-react';

const DoctorCard: React.FC<{ doctor: StaffDetail }> = ({ doctor }) => (
  <Stack
    paddingX={2}
    paddingY={3}
    borderRadius={2}
    direction={'row'}
    alignItems={'center'}
    justifyContent={'space-between'}
    border={'1px solid #E0E0E0'}
  >
    <Stack direction={'row'} spacing={2} alignItems={'center'}>
      <Avatar src={doctor.photoUrl} variant='square' sx={{ width: 64, height: 64 }} />
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'flex-start'}
        gap={1}
      >
        <Typography variant='h5'>{doctor.name}</Typography>
        <Stack direction={'row'} spacing={2}>
          <InfoItem icon={<Stethoscope size={16} />} text={doctor.speciality} />
          <InfoItem icon={<Clock size={16} />} text='9.30am - 01:00am BST' />
          <InfoItem icon={<Calendar size={16} />} text='Jun 24, 2021' />
        </Stack>
        <Stack direction={'row'} spacing={1}>
          <FileText size={16} />
          <Typography variant='body2' fontWeight={'light'}>
            {doctor.qualification}
          </Typography>
        </Stack>
      </Box>
    </Stack>
    <Stack spacing={1}>
      <Button
        variant='contained'
        sx={{ backgroundColor: '#0E1680', ':hover': { backgroundColor: 'orange' } }}
        endIcon={<ChevronRight size={16} />}
      >
        <Typography>View Appointments</Typography>
      </Button>
      <Button variant='outlined' sx={{ color: '#0E1680' }}>
        View Doctor Details
      </Button>
    </Stack>
  </Stack>
);

const InfoItem: React.FC<{
  icon: React.ReactNode;
  text: string;
}> = ({ icon, text }) => (
  <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={0.5}>
    {icon}
    <Typography variant='body2' fontWeight={'light'}>
      {text}
    </Typography>
  </Box>
);

export const StaffManagement = () => {
  return (
    <Box className='px-6 py-4'>
      <StaffFilter />
      <Box display={'flex'} flexDirection={'column'} gap={2}>
        {doctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </Box>
    </Box>
  );
};
