import { useEffect, useMemo, useState } from 'react';
import { Box, InputAdornment, Stack, TextField } from '@mui/material';
import ContentHeader from 'src/components/content-header';
import AdvancedFilter from 'src/components/advanced-filter/advanced-filter';
import { SearchIcon } from 'lucide-react';
import { useAppointmentContext } from 'src/contexts/appointment/appointment-context';
import AppointmentManagementList from 'src/sections/patient/appointment/appointment-management-list';
import { LoadingProcess } from '@components';
import { Filter } from 'src/types/filter';
import { useAuth } from '@hooks';

export const AppointmentManagement: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const { user } = useAuth();
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [dateRange, setDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null
  });
  const { getAppointmentListApi, appointmentFilter, setAppointmentFilter, appointmentPagination } =
    useAppointmentContext();
  const appointments = useMemo(() => {
    return (getAppointmentListApi.data?.content || []).filter(
      (appointment) => appointment.patientSsn === user?.ssn
    );
  }, [getAppointmentListApi, user?.ssn]);

  const filters: Filter[] = [
    {
      type: 'select',
      title: 'Status',
      value: selectedStatus,
      onChange: (value: string) => {
        setSelectedStatus(value);
      },
      options: ['PENDING', 'ACCEPTED', 'REJECTED', 'RESCHEDULED', 'COMPLETED', 'CANCELLED'].map(
        (status) => ({
          label: status,
          value: status
        })
      )
    },
    {
      type: 'select',
      title: 'Appointment Type',
      value: selectedType,
      onChange: (value: string) => {
        setSelectedType(value);
      },
      options: ['FIRST_VISIT', 'FOLLOW_UP'].map((type) => ({
        label: type,
        value: type
      }))
    }
  ];

  useEffect(() => {
    const filterList = [];
    if (selectedStatus !== '') {
      filterList.push({
        property: 'status',
        rule: 'eq',
        value: selectedStatus
      });
    }
    if (selectedType !== '') {
      filterList.push({
        property: 'type',
        rule: 'eq',
        value: selectedType
      });
    }
    setAppointmentFilter({
      ...appointmentFilter,
      page: appointmentPagination.page,
      size: 5,
      filters: filterList
    });
  }, [appointmentPagination.page, selectedStatus, selectedType]);

  return (
    <>
      <ContentHeader
        title='Manage Appointments'
        // description='Showing: All Consultations of All Healthcare Providers'
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
                  <InputAdornment position='end' className='cursor-pointer' onClick={() => {}}>
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
            <Stack className='max-sm:ml-auto' direction={'row'} gap={1} alignItems={'center'}>
              <AdvancedFilter filters={filters} />
            </Stack>
          </Stack>
        }
      />
      <Box className='px-6 py-4'>
        <AppointmentManagementList appointments={appointments} searchInput={searchInput} />
      </Box>
      {getAppointmentListApi.loading && <LoadingProcess />}
    </>
  );
};
