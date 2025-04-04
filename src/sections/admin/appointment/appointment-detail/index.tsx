import React, { useMemo } from 'react';
import { appointments, patients, doctors } from 'src/utils/generate-mock';
import { useRouter } from 'next/router';
import { Box, Button, Stack } from '@mui/material';
import { useResponsive } from 'src/utils/use-responsive';
import AppointmentDetailHeader from './appointment-detail-header';
import AppointmentDetailPatient from './appointment-detail-patient';
import AppointmentDetailInfo from './appointment-detail-info';
import { Ban, Plus } from 'lucide-react';
import { AppointmentDetailConfig } from '../appointment-management-table-config';

function AppointmentDetail() {
  const router = useRouter();
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const filteredAppointment = useMemo(() => {
    const foundAppointment = appointments.find(
      (appointment) => appointment.id === router.query.appointmentId
    );
    const patient = patients.find((patient) => patient.id === foundAppointment?.userId);
    const doctor = doctors.find((doctor) => doctor.id === foundAppointment?.staffId);
    return {
      ...foundAppointment,
      patient,
      doctor
    };
  }, [router.query.appointmentId, appointments, patients, doctors]);
  return (
    <Stack direction={'column'} spacing={2}>
      <Box
        display={'flex'}
        flexDirection={isMobile ? 'column' : 'row'}
        alignItems={!isMobile ? 'center' : ''}
        justifyContent={!isMobile ? 'space-between' : ''}
        gap={2}
      >
        <AppointmentDetailHeader patientName={filteredAppointment.patient?.fullName as string} />
        {filteredAppointment.status === 'PENDING' && (
          <Stack direction={'row'} spacing={1.5} alignItems={'center'}>
            <Button variant='outlined' startIcon={<Ban size={16} />} color='inherit'>
              Decline
            </Button>
            <Button
              sx={{
                backgroundColor: 'hsl(var(--background-button))',
                ':hover': { backgroundColor: 'orange' }
              }}
              variant='contained'
              startIcon={<Plus size={16} />}
            >
              Approve
            </Button>
          </Stack>
        )}
      </Box>
      <Box display={'flex'} flexDirection={isMobile ? 'column' : 'row'}>
        <Stack flex={isDesktop ? 0.4 : isTablet ? 0.5 : 1}>
          <AppointmentDetailPatient appointment={filteredAppointment as AppointmentDetailConfig} />
        </Stack>
        <Stack flex={isDesktop ? 0.6 : isTablet ? 0.5 : 1}>
          <AppointmentDetailInfo appointment={filteredAppointment as AppointmentDetailConfig} />
        </Stack>
      </Box>
    </Stack>
  );
}

export default AppointmentDetail;
