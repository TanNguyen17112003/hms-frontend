import React from 'react';
import { Stack } from '@mui/material';
import DashboardAppointment from './dashboard-appointment';
import DashboardChart from './dashboard-chart';
import DashboardPatient from './dashboard-patient';
import { patients } from 'src/utils/generate-mock';
import { useAuth } from '@hooks';

function DashboardHome() {
  const { user } = useAuth();
  return (
    <Stack direction={'column'} spacing={2} paddingX={3} marginTop={2}>
      <DashboardChart />
      {user?.role !== 'PATIENT' && <DashboardPatient patients={patients} />}
      <DashboardAppointment />
    </Stack>
  );
}

export default DashboardHome;
