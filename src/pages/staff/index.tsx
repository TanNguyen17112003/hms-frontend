import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import type { Page as PageType } from 'src/types/page';
import { useDialog, useAuth } from '@hooks';
import React, { useCallback } from 'react';
import ContentHeader from 'src/components/content-header';
import { Box } from '@mui/material';

const Page: PageType = () => {
  const { user } = useAuth();
  return (
    <Box className='h-auto bg-white'>
      <ContentHeader  title={user.role === "ADMIN" ? 'Staff Management' : 'Doctor List'} description='Showing: All Consultations of All Healthcare Providers' />
    </Box>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
