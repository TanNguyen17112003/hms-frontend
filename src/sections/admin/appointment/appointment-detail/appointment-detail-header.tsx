import React, { useCallback } from 'react';
import { Typography, Breadcrumbs, Link, Stack } from '@mui/material';
import { paths } from 'src/paths';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/router';

interface HeaderProps {
  patientName: string;
}

const AppointmentDetailHeader: React.FC<HeaderProps> = ({ patientName }) => {
  const router = useRouter();
  const handleGoBack = useCallback(() => {
    router.back();
  }, []);
  return (
    <Stack direction={'row'} alignItems={'center'} spacing={1.5}>
      <ArrowLeft size={20} onClick={handleGoBack} className='cursor-pointer text-bg-primary' />
      <Breadcrumbs aria-label='breadcrumb'>
        <Link
          underline='hover'
          color='inherit'
          href={paths.appointment.index}
          className='text-bg-primary'
        >
          <Typography className='text-bg-primary'>Appointments</Typography>
        </Link>
        <Link underline='hover' color='inherit'>
          <Typography className='text-bg-primary'>Appointment Details</Typography>
        </Link>
        <Typography className='text-bg-primary'>{patientName}</Typography>
      </Breadcrumbs>
    </Stack>
  );
};

export default AppointmentDetailHeader;
