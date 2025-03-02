import { useDialog } from '@hooks';
import { Box, Button, InputAdornment, Stack, TextField } from '@mui/material';
import { Filter, PlusIcon, SearchIcon } from 'lucide-react';
import { useState } from 'react';
import ContentHeader from 'src/components/content-header';
import { DashboardLayout } from 'src/layouts';
import AddPatientDialog from 'src/sections/admin/patient-management/add-patient-dialog';
import PatientManagementList from 'src/sections/admin/patient-management/patient-management-list';
import type { Page as PageType } from 'src/types/page';

export type PatientData = {
  id: string;
  name: string;
  email: string;
  date: Date;
  age: number;
  diseases: string;
  status: 'Complicated' | 'In-Treatment';
  sex: 'Male' | 'Female';
  doctorName?: string;
  avatar?: string;
  role: 'PATIENT' | 'STAFF' | 'ADMIN';
  phoneNumber?: string;
  address?: string;
  dob?: string;
  governmentId?: string;
  hospitalId?: string;
};
const PATIENTS: PatientData[] = [
  {
    id: '#1234567',
    name: 'John Doe',
    email: 'johndoe@example.com',
    date: new Date(),
    sex: 'Male',
    age: 25,
    diseases: 'Hypertension',
    status: 'Complicated',
    doctorName: 'Dr. Strange',
    role: 'PATIENT'
  },
  {
    id: '#1234568',
    name: 'Jane Smith',
    email: 'janesmith@example.com',
    date: new Date(),
    sex: 'Female',
    age: 30,
    diseases: 'Diabetes',
    status: 'In-Treatment',
    doctorName: 'Dr. Strange',
    role: 'PATIENT'
  },
  {
    id: '#1234569',
    name: 'Alice Johnson',
    email: 'alicejohnson@example.com',
    date: new Date(),
    sex: 'Female',
    age: 45,
    diseases: 'Asthma',
    status: 'In-Treatment',
    doctorName: 'Dr. Strange',
    role: 'PATIENT'
  },
  {
    id: '#1234570',
    name: 'Bob Brown',
    email: 'bobbrown@example.com',
    date: new Date(),
    sex: 'Male',
    age: 50,
    diseases: 'Chronic Kidney Disease',
    status: 'Complicated',
    doctorName: 'Dr. Strange',
    role: 'PATIENT'
  },
  {
    id: '#1234571',
    name: 'Charlie Davis',
    email: 'charliedavis@example.com',
    date: new Date(),
    sex: 'Male',
    age: 60,
    diseases: 'Heart Failure',
    status: 'Complicated',
    doctorName: 'Dr. Strange',
    role: 'PATIENT'
  },
  {
    id: '#1234572',
    name: 'Diana Evans',
    email: 'dianaevans@example.com',
    date: new Date(),
    sex: 'Female',
    age: 35,
    diseases: 'Rheumatoid Arthritis',
    status: 'In-Treatment',
    doctorName: 'Dr. Strange',
    role: 'PATIENT'
  },
  {
    id: '#1234573',
    name: 'Ethan Harris',
    email: 'ethanharris@example.com',
    date: new Date(),
    sex: 'Male',
    age: 40,
    diseases: 'Chronic Obstructive Pulmonary Disease',
    status: 'Complicated',
    role: 'PATIENT'
  },
  {
    id: '#1234574',
    name: 'Fiona Garcia',
    email: 'fionagarcia@example.com',
    date: new Date(),
    sex: 'Female',
    age: 55,
    diseases: 'Osteoporosis',
    status: 'In-Treatment',
    doctorName: 'Dr. Strange',
    role: 'PATIENT'
  },
  {
    id: '#1234575',
    name: 'George Hall',
    email: 'georgehall@example.com',
    date: new Date(),
    sex: 'Male',
    age: 65,
    diseases: "Alzheimer's Disease",
    status: 'Complicated',
    role: 'PATIENT'
  },
  {
    id: '#1234576',
    name: 'Hannah Lee',
    email: 'hannahlee@example.com',
    date: new Date(),
    sex: 'Female',
    age: 28,
    diseases: 'Multiple Sclerosis',
    status: 'In-Treatment',
    doctorName: 'Dr. Strange',
    role: 'PATIENT'
  }
];

const Page: PageType = () => {
  const addDialog = useDialog();
  const [searchInput, setSearchInput] = useState<string>('');
  const handleSearch = () => {
    console.log(searchInput);
  };
  return (
    <Box
      sx={{
        maxHeight: '100vh',
        overflow: 'auto'
      }}
    >
      <ContentHeader
        title='Patient Management'
        description='Showing: All Consultations of All Healthcare Providers'
        rightSection={
          <Stack direction={'row'} alignItems={'center'} gap={3} className='mt-4' flexWrap={'wrap'}>
            <TextField
              variant='outlined'
              placeholder='t1faker@gmail.com'
              className='max-sm:w-full w-[300px]'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end' className='cursor-pointer' onClick={handleSearch}>
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
            <Stack className='max-sm:ml-auto' direction={'row'} gap={1} alignItems={'center'}>
              <Button
                variant='outlined'
                color='inherit'
                endIcon={<Filter />}
                // onClick={() => router.push('/admin/patient-management/create')}
              >
                Filter
              </Button>

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
      <PatientManagementList patients={PATIENTS} searchInput={searchInput} />
      <AddPatientDialog open={addDialog.open} onClose={addDialog.handleClose} />
    </Box>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;
