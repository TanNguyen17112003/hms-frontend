import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import type { Page as PageType } from 'src/types/page';
import UserProvider from 'src/contexts/user/user-context';
import AppointmentProvider from 'src/contexts/appointment/appointment-context';
import { useAuth } from '@hooks';
import { Box } from '@mui/material';
import ContentHeader from 'src/components/content-header';
import { useRouter } from 'next/router';
import StaffDetail from 'src/sections/admin/staff-management/staff-detail';
import { StaffManagement } from 'src/sections/admin/staff-management';
import StaffProvider from 'src/contexts/staff/staff-context';

const Page: PageType = () => {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <Box
      sx={{
        maxHeight: 'calc(100vh-72px)',
        overflow: 'auto'
      }}
    >
      {router.query.staffId ? (
        <Box className='px-6 py-4'>
          <StaffDetail />
        </Box>
      ) : (
        <Box className='h-auto bg-white'>
          <ContentHeader
            title={user?.role === 'ADMIN' ? 'Staff Management' : 'Doctor List'}
            description='Showing: All Consultations of All Healthcare Providers'
          />
          <StaffManagement />
        </Box>
      )}
    </Box>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    <UserProvider>
      <StaffProvider>{page}</StaffProvider>
    </UserProvider>
  </DashboardLayout>
);

export default Page;
