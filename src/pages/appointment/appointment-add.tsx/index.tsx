import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import type { Page as PageType } from 'src/types/page';
import AppointmentProvider from 'src/contexts/appointment/appointment-context';
import { useAuth, useDialog } from '@hooks';
import { useState } from 'react';
import { Box, Button, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import ContentHeader from 'src/components/content-header';
import { useFormik } from 'formik';
import AppointmentAdd from 'src/sections/patient/appointment/appointment-add';
import { useRouter } from 'next/router';
import { Add } from 'iconsax-react';
import { AppointmentFormProps, initialAppointmentFormValues } from 'src/types/appointment';
const Page: PageType = () => {
  const { user } = useAuth();
  const router = useRouter();
  const formik = useFormik<AppointmentFormProps>({
      initialValues: initialAppointmentFormValues,
      onSubmit: (values) => {
        console.log('Form submitted:', values);
      },
    })
  return (
    <Box
      sx={{
        maxHeight: '100vh',
        overflow: 'auto'
      }}
    >
        <>
          <ContentHeader
            title='Add appointment'
            description='Create your owin appointment and manage it easily'
            rightSection={
              <Button
                startIcon={<Add />}
                variant='contained'
                color='primary'
              >
                Add
              </Button>
            }
          />
          <Box className='px-6 py-4'>
            <AppointmentAdd formik={formik}/>
          </Box>
        </>
    </Box>
  );
};
Page.getLayout = (page) => (
  <DashboardLayout>
    <AppointmentProvider>{page}</AppointmentProvider>
  </DashboardLayout>
);

export default Page;
