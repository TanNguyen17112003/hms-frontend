import React from 'react';
import { Stack } from '@mui/material';
import DashboardAppointment from './dashboard-appointment';
import DashboardChart from './dashboard-chart';
import DashboardPatient from './dashboard-patient';
import { patients } from 'src/utils/generate-mock';

function DashboardHome() {
  return (
    <Stack direction={'column'} spacing={2} paddingX={3} marginTop={2}>
      <DashboardChart />
      <DashboardPatient patients={patients} />
      <DashboardAppointment />
    </Stack>
  );
}

export default DashboardHome;
