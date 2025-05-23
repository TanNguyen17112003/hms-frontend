import { Box, Chip, Typography } from '@mui/material';
import { useCallback, useMemo } from 'react';
import usePagination, { UsePaginationResult } from 'src/hooks/use-pagination';
import { useDialog, useDrawer, useSelection } from '@hooks';
import { CustomTable } from '@components';
import { Stack } from '@mui/system';
import getAppointmentManangementTableConfig from 'src/sections/admin/appointment/appointment-management-table-config';
import { AppointmentDetail } from 'src/types/appointment';
import { useRouter } from 'next/router';
import { useAuth } from '@hooks';
import { UserDetail } from 'src/types/user';
import { useUserContext } from 'src/contexts/user/user-context';
import Pagination from 'src/components/ui/Pagination';

interface AppointmentManagementListProps {
  appointments: AppointmentDetail[];
  searchInput: string;
  pagination?: UsePaginationResult;
}
const AppointmentManagementList: React.FC<AppointmentManagementListProps> = ({
  appointments,
  searchInput
}) => {
  const { user } = useAuth();
  const router = useRouter();
  const pagination = usePagination({
    count: appointments.length
  });

  const filteredAppointments = useMemo(() => {
    return appointments;
  }, [appointments]);

  const results = useMemo(() => {
    return filteredAppointments.map((appointment, index) => ({
      ...appointment,
      index: index + 1
    }));
  }, [filteredAppointments]);

  const AppointmentManagementListConfig = useMemo(() => {
    return getAppointmentManangementTableConfig({
      user: user as UserDetail
    });
  }, [getAppointmentManangementTableConfig]);

  const handleGoAppointment = useCallback((id: string) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, appointmentId: id }
    });
  }, []);

  return (
    <Box
      className='px-6 mt-8 py-4 border-2 rounded-xl bg-white'
      boxShadow={'0px 1px 2px 0px rgba(16, 24, 40, 0.06)'}
    >
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Stack direction='row' spacing={2} alignItems='center'>
          <Typography variant='h6'>Appointment List</Typography>
          <Chip
            label={`${results.length} appointments`}
            sx={{ backgroundColor: 'rgba(229, 231, 251, 1)', color: 'rgba(7, 11, 92, 1)' }}
          />
        </Stack>
      </Stack>
      <CustomTable
        className='mt-5'
        rows={results}
        configs={AppointmentManagementListConfig}
        onClickRow={(data) => handleGoAppointment(data.id)}
        cellClassName='bg-white'
      />
      <Pagination
        count={pagination?.count as number}
        page={pagination?.page as number}
        onChange={pagination?.onPageChange || (() => {})}
        rowsPerPage={pagination?.rowsPerPage as number}
      />
    </Box>
  );
};

export default AppointmentManagementList;
