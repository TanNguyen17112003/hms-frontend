import { Box, Chip, Typography } from '@mui/material';
import { useMemo } from 'react';
import usePagination from 'src/hooks/use-pagination';
import { useDialog, useDrawer, useSelection } from '@hooks';
import { CustomTable } from '@components';
import { Stack } from '@mui/system';
import { AppointmentDetailConfig } from './appointment-management-table-config';
import { patients, doctors } from 'src/utils/generate-mock';
import getAppointmentManangementTableConfig from './appointment-management-table-config';
import { AppointmentDetail } from 'src/types/appointment';
import ApproveAppointmentDialog from './appointment-approve-dialog';
import DeclineAppointmentDialog from './appointment-decline-dialog';

interface AppointmentManagementListProps {
  appointments: AppointmentDetail[];
  searchInput: string;
}
const AppointmentManagementList: React.FC<AppointmentManagementListProps> = ({
  appointments,
  searchInput
}) => {
  const configAppointments = useMemo(() => {
    return appointments.map((appointment) => {
      const patient = patients.find((patient) => patient.id === appointment.userId);
      const doctor = doctors.find((doctor) => doctor.id === appointment.staffId);
      return { ...appointment, patient, doctor };
    });
  }, [appointments]);
  const select = useSelection<AppointmentDetailConfig>(configAppointments);
  const declineDialog = useDialog<AppointmentDetailConfig>();
  const approveDialog = useDialog<AppointmentDetailConfig>();
  const editDrawer = useDrawer<AppointmentDetailConfig>();
  const pagination = usePagination({
    count: appointments.length
  });

  const filteredAppointments = configAppointments.filter((appointment) => {
    return appointment?.staffId?.toLowerCase().includes(searchInput.toLowerCase());
  });
  const results = filteredAppointments.map((appointment, index) => ({
    ...appointment,
    index: index + 1
  }));

  const AppointmentManagementListConfig = useMemo(() => {
    return getAppointmentManangementTableConfig({
      onClickDecline: (data) => declineDialog.handleOpen(data),
      onClickApprove: (data) => approveDialog.handleOpen(data)
    });
  }, [getAppointmentManangementTableConfig]);

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
        pagination={pagination}
        cellClassName='bg-white'
        select={select}
      />
      <ApproveAppointmentDialog
        open={approveDialog.open}
        onClose={approveDialog.handleClose}
        appointment={approveDialog.data as AppointmentDetailConfig}
        onConfirm={() => new Promise<void>((resolve) => setTimeout(resolve, 1000))}
      />
      <DeclineAppointmentDialog
        open={declineDialog.open}
        onClose={declineDialog.handleClose}
        appointment={declineDialog.data as AppointmentDetailConfig}
        onConfirm={() => new Promise<void>((resolve) => setTimeout(resolve, 1000))}
      />
    </Box>
  );
};

export default AppointmentManagementList;
