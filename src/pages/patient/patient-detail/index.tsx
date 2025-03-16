import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import type { Page as PageType } from 'src/types/page';
import React from 'react';
import UserProvider from 'src/contexts/user/user-context';
import PatientDetail from 'src/sections/patient-detail/PatientDetail';

const Page: PageType = () => {
  return <PatientDetail />;
};

Page.getLayout = (page) => (
  <DashboardLayout>
    <UserProvider>{page}</UserProvider>
  </DashboardLayout>
);

export default Page;
