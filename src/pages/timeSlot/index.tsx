import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import type { Page as PageType } from 'src/types/page';
import { useAuth } from '@hooks';
import { Box, Button } from '@mui/material';
import { useRouter } from 'next/router';
import TimeSlotProvider from 'src/contexts/timeSlot/timeSlot-context';
import StaffTimeSlotManagement from 'src/sections/staff/timeSlot';
import AdminTimeSlotManagement from 'src/sections/admin/timeSlot';

const Page: PageType = () => {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <Box py={2}>
      <Box mt={2} px={4}>
        {user?.role === 'ADMIN' ? <AdminTimeSlotManagement /> : <StaffTimeSlotManagement />}
      </Box>
    </Box>
  );
};
Page.getLayout = (page) => (
  <DashboardLayout>
    <TimeSlotProvider>{page}</TimeSlotProvider>
  </DashboardLayout>
);

export default Page;
