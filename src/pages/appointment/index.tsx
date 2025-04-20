import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import type { Page as PageType } from 'src/types/page';
import AppointmentProvider from 'src/contexts/appointment/appointment-context';
import { useAuth } from '@hooks';
import { Box } from '@mui/material';
import AppointmentDetail from 'src/sections/admin/appointment/appointment-detail';
import { useRouter } from 'next/router';
import { AppointmentManagement as AdminAppointmentManagement } from 'src/sections/admin/appointment';
import { AppointmentManagement as StaffAppointmentManagement } from 'src/sections/staff/appointment';
import { AppointmentManagement as PatientAppointmentManagement } from 'src/sections/patient/appointment';
import UserProvider from 'src/contexts/user/user-context';

const Page: PageType = () => {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <Box
      sx={{
        maxHeight: '100vh',
        overflow: 'auto'
      }}
    >
      {router.query.appointmentId ? (
        <Box className='px-6 py-4'>
          <AppointmentDetail />
        </Box>
      ) : user?.role === 'ADMIN' ? (
        <AdminAppointmentManagement />
      ) : user?.role === 'PATIENT' ? (
        <PatientAppointmentManagement />
      ) : (
        <StaffAppointmentManagement />
      )
      // <Box className='px-6 py-4'>
      }
    </Box>
  );
};
Page.getLayout = (page) => (
  <DashboardLayout>
    <AppointmentProvider>
      <UserProvider>{page}</UserProvider>
    </AppointmentProvider>
  </DashboardLayout>
);

export default Page;
