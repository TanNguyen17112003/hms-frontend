import { Box } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import type { Page as PageType } from 'src/types/page';
import ContentHeader from 'src/components/content-header';
import { useAuth } from '@hooks';
import PatientAccount from 'src/sections/patient/account';
import StaffAccount from 'src/sections/staff/account';
import AdminAccount from 'src/sections/admin/account';
const Page: PageType = () => {
  const { user } = useAuth();
  return (
    <>
      <ContentHeader 
        title='My Profile'
        description='This Information will be displayed publicly so be careful what you share.'
      />
      {
        user?.role === 'ADMIN' ? (
          <Box className='px-6 py-4'>
            <AdminAccount />
          </Box>
        ) : user?.role === 'PATIENT' ? (
          <Box className='px-6 py-4'>
            <PatientAccount />
          </Box>
        ) : (
          <Box className='px-6 py-4'>
            <StaffAccount />
          </Box>
        )
      }
    </>
  )
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
