import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import type { Page as PageType } from 'src/types/page';
import AppointmentProvider from 'src/contexts/appointment/appointment-context';
import UserProvider from 'src/contexts/user/user-context';
import { useAuth, useDialog } from '@hooks';
import ContentHeader from 'src/components/content-header';
import { useState } from 'react';
import { patients } from 'src/utils/generate-mock';
import { useRouter } from 'next/router';
import { Box, Button, InputAdornment, Stack, TextField } from '@mui/material';
import { PlusIcon, SearchIcon } from 'lucide-react';
import PatientDetail from 'src/sections/patient-detail/patient-detail';
import PatientManagementList from 'src/sections/admin/patient-management/patient-management-list';
import AddPatientDialog from 'src/sections/admin/patient-management/add-patient-dialog';
import AdvancedFilter from 'src/components/advanced-filter/advanced-filter';

const Page: PageType = () => {
  const { user } = useAuth();
  const router = useRouter();
  const addDialog = useDialog();
  const [searchInput, setSearchInput] = useState<string>('');
  const handleSearch = () => {
    console.log(searchInput);
  };
  return (
    <Box
      sx={{
        overflow: 'auto'
      }}
    >
      {router.query.patientId ? (
        <Box className='px-6 py-4'>
          <PatientDetail />
        </Box>
      ) : (
        <>
          <ContentHeader
            title='Patient Management'
            description='Showing: All Consultations of All Healthcare Providers'
            rightSection={
              <Stack
                direction={'row'}
                alignItems={'center'}
                gap={3}
                className='mt-4'
                flexWrap={'wrap'}
              >
                <TextField
                  variant='outlined'
                  placeholder='t1faker@gmail.com'
                  className='max-sm:w-full w-[300px]'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position='end'
                        className='cursor-pointer'
                        onClick={handleSearch}
                      >
                        <SearchIcon />
                      </InputAdornment>
                    )
                  }}
                />
                <Stack className='max-sm:ml-auto' direction={'row'} gap={1} alignItems={'center'}>
                  <AdvancedFilter filters={[]} />

                  <Button
                    variant='contained'
                    className='w-40'
                    startIcon={<PlusIcon />}
                    sx={{ backgroundColor: 'rgba(14, 22, 128, 1)' }}
                    onClick={() => addDialog.handleOpen()}
                  >
                    Add Patient
                  </Button>
                </Stack>
              </Stack>
            }
          />
          <Box className='px-6 py-4'>
            <PatientManagementList patients={patients} searchInput={searchInput} />
            <AddPatientDialog open={addDialog.open} onClose={addDialog.handleClose} />
          </Box>
        </>
      )}
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
