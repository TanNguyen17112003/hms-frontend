import { useEffect, useState } from 'react';
import { Box, InputAdornment, Stack, TextField } from '@mui/material';
import ContentHeader from 'src/components/content-header';
import AdvancedFilter from 'src/components/advanced-filter/advanced-filter';
import { SearchIcon } from 'lucide-react';
import { appointments } from 'src/utils/generate-mock';
import AppointmentManagementList from 'src/sections/admin/appointment/appointment-management-list';
import { useAppointmentContext } from 'src/contexts/appointment/appointment-context';
import { LoadingProcess } from '@components';
import { useDebounce } from '@hooks';

export const AppointmentManagement: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const debouncedSearchInput = useDebounce(searchInput, 500);
  const { getListAppointmentsApi } = useAppointmentContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [appointmentListInfo, setAppointmentListInfo] = useState<any>(null);
  const [page, setPage] = useState<number>(1);
  const rowsPerPage = 10;

  const handleGetListAppointment = async () => {
    setIsLoading(true);
    try {
      const res = await getListAppointmentsApi.call({
        page: page,
        size: rowsPerPage
      });
      console.log(33, res);
      if (res.data) {
        setAppointmentListInfo(res.data);
      }
    } catch (err: any) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetListAppointment();
  }, [page, debouncedSearchInput]);

  const handleSearch = () => {
    console.log(searchInput);
  };

  return (
    <>
      {isLoading && <LoadingProcess />}
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
        <AppointmentManagementList
          appointments={appointmentListInfo}
          searchInput={searchInput}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
        />
      </Box>
    </>
  );
};
