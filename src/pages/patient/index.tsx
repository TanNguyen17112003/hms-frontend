import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import type { Page as PageType } from 'src/types/page';
import AppointmentProvider from 'src/contexts/appointment/appointment-context';
import UserProvider from 'src/contexts/user/user-context';
import { useAuth, useDialog } from '@hooks';
import ContentHeader from 'src/components/content-header';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, InputAdornment, Stack, TextField } from '@mui/material';
import { PlusIcon, SearchIcon } from 'lucide-react';
import PatientDetail from 'src/sections/patient-detail/patient-detail';
import PatientManagementList from 'src/sections/admin/patient-management/patient-management-list';
import AddPatientDialog from 'src/sections/staff/patient-management/add-patient-dialog';
import AdvancedFilter from 'src/components/advanced-filter/advanced-filter';
import { CreatePatientRequest, MedicalRecordsApi } from 'src/api/medical-record';
import useFunction from 'src/hooks/use-function';
import { LoadingProcess } from '@components';

const Page: PageType = () => {
  const { user } = useAuth();
  const router = useRouter();
  const addDialog = useDialog();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const getPatientsApi = useFunction(MedicalRecordsApi.getPatients);
  const [searchInput, setSearchInput] = useState<string>('');
  const handleSearch = () => {
    console.log(searchInput);
  };

  const handleAddPatient = useCallback(async (values: CreatePatientRequest) => {
    try {
      const response = await MedicalRecordsApi.createPatient(values);
      if (response) {
        getPatientsApi.call(new FormData());
      }
    } catch (error) {
      throw error;
    }
  }, []);

  const response = useMemo(() => {
    return getPatientsApi.data?.content || [];
  }, [getPatientsApi.data]);

  const count = useMemo(() => {
    return getPatientsApi.data?.totalElements || 0;
  }, [getPatientsApi.data]);

  const patients = useMemo(() => {
    return response.map((patient) => {
      return patient.patient;
    });
  }, [response]);

  useEffect(() => {
    const formData = new FormData();
    formData.append('page', page.toString());
    formData.append('size', rowsPerPage.toString());
    getPatientsApi.call(formData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage]);

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
            // description='Showing: All Consultations of All Healthcare Providers'
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
                  {(user?.role === 'STAFF' || user?.role === 'DOCTOR') && (
                    <Button
                      variant='contained'
                      className='w-40'
                      startIcon={<PlusIcon />}
                      sx={{ backgroundColor: 'rgba(14, 22, 128, 1)' }}
                      onClick={() => addDialog.handleOpen()}
                    >
                      Add Patient
                    </Button>
                  )}
                </Stack>
              </Stack>
            }
          />
          <Box className='px-6 py-4'>
            <PatientManagementList
              patients={patients}
              searchInput={searchInput}
              pagination={{
                page,
                rowsPerPage,
                setPage,
                setRowsPerPage
              }}
              count={count}
            />
            <AddPatientDialog
              open={addDialog.open}
              onClose={addDialog.handleClose}
              onConfirm={handleAddPatient}
            />
          </Box>
        </>
      )}
      {getPatientsApi.loading && <LoadingProcess />}
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
