import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import type { Page as PageType } from 'src/types/page';
import AppointmentProvider from 'src/contexts/appointment/appointment-context';
import { useAuth } from '@hooks';
import { Box } from '@mui/material';
import AppointmentDetail from 'src/sections/admin/appointment/appointment-detail';
import { useRouter } from 'next/router';
import { AppointmentManagement } from 'src/sections/admin/appointment';
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
      ) : (
        <AppointmentManagement />
      )}
    </Box>
  );
};
Page.getLayout = (page) => (
  <DashboardLayout>
    <AppointmentProvider>{page}</AppointmentProvider>
  </DashboardLayout>
);

export default Page;
