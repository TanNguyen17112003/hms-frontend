import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import type { Page as PageType } from 'src/types/page';
import { useDialog, useAuth } from '@hooks';
import React, { useCallback } from 'react';
import ContentHeader from 'src/components/content-header';
import { Box } from '@mui/material';
import { StaffManagement } from 'src/sections/admin/staff-management';
import UserProvider from 'src/contexts/user/user-context';
import AppointmentProvider from 'src/contexts/appointment/appointment-context';

const Page: PageType = () => {
  const { user } = useAuth();
  return (
    <Box className='h-auto bg-white'>
      <ContentHeader
        title={user?.role === 'ADMIN' ? 'Staff Management' : 'Doctor List'}
        description='Showing: All Consultations of All Healthcare Providers'
      />
      <StaffManagement />
    </Box>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    <UserProvider>
      <AppointmentProvider>{page}</AppointmentProvider>
    </UserProvider>
  </DashboardLayout>
);

export default Page;
