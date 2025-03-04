import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import type { Page as PageType } from 'src/types/page';
import AppointmentProvider from 'src/contexts/appointment/appointment-context';
import { useAuth, useDialog } from '@hooks';
import { useState } from 'react';
import { Box, Button, InputAdornment, Stack, TextField } from '@mui/material';
import ContentHeader from 'src/components/content-header';
import AdvancedFilter from 'src/components/advanced-filter/advanced-filter';
import { PlusIcon, SearchIcon } from 'lucide-react';
import { appointments } from 'src/utils/generate-mock';
import AppointmentManagementList from 'src/sections/admin/appointment/appointment-management-list';
const Page: PageType = () => {
  const { user } = useAuth();
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
        title='Manage Appointments'
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
              <AdvancedFilter filters={[]} />
            </Stack>
          </Stack>
        }
      />
      <Box className='px-6 py-4'>
        <AppointmentManagementList appointments={appointments} searchInput={searchInput} />
      </Box>
    </Box>
  );
};
Page.getLayout = (page) => (
  <DashboardLayout>
    <AppointmentProvider>{page}</AppointmentProvider>
  </DashboardLayout>
);

export default Page;
