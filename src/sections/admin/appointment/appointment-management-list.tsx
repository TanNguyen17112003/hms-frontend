import { Box, Chip, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import usePagination, { UsePaginationResult } from 'src/hooks/use-pagination';
import { useDialog, useDrawer, useSelection } from '@hooks';
import { CustomTable } from '@components';
import { Stack } from '@mui/system';
import { AppointmentDetailConfig } from './appointment-management-table-config';
import getAppointmentManangementTableConfig from './appointment-management-table-config';
import { AppointmentDetail } from 'src/types/appointment';
import ApproveAppointmentDialog from './appointment-approve-dialog';
import DeclineAppointmentDialog from './appointment-decline-dialog';
import { useRouter } from 'next/router';
import { useAuth } from '@hooks';
import { PatientDetail, UserDetail } from 'src/types/user';
import { useUserContext } from 'src/contexts/user/user-context';
import Pagination from 'src/components/ui/Pagination';
import { useAppointmentContext } from 'src/contexts/appointment/appointment-context';
import AppointmentAssignDialog from './appointment-assign-dialog';
import { MedicalRecordsApi } from 'src/api/medical-record';

interface AppointmentManagementListProps {
  appointments: AppointmentDetail[];
  searchInput: string;
  pagination?: any;
  count: number;
}
const AppointmentManagementList: React.FC<AppointmentManagementListProps> = ({
  appointments,
  searchInput,
  pagination,
  count
}) => {
  const { user } = useAuth();
  const [patients, setPatients] = useState<PatientDetail[]>([]);

  const { rejectAppointment } = useAppointmentContext();
  const assignDialog = useDialog<AppointmentDetailConfig>();
  const select = useSelection<AppointmentDetailConfig>(appointments);
  const rejectDialog = useDialog<AppointmentDetailConfig>();
  const approveDialog = useDialog<AppointmentDetailConfig>();
  const router = useRouter();

  const filteredAppointments = useMemo(() => {
    return appointments.map((appointment) => {
      const patient = patients.find((patient) => patient.ssn === appointment.patientSsn);
      return {
        ...appointment,
        patient
      };
    });
  }, [appointments, patients]);

  const results = useMemo(() => {
    return filteredAppointments.map((appointment, index) => ({
      ...appointment,
      index: index + 1
    }));
  }, [filteredAppointments]);

  const AppointmentManagementListConfig = useMemo(() => {
    return getAppointmentManangementTableConfig({
      onClickDecline: (data) => rejectDialog.handleOpen(data),
      onClickApprove: (data) => approveDialog.handleOpen(data),
      user: user as UserDetail
    });
  }, [getAppointmentManangementTableConfig]);

  const handleGoAppointment = useCallback((id: string) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, appointmentId: id }
    });
  }, []);

  useEffect(() => {
    const fetchPatients = async () => {
      const fetchedPatients: PatientDetail[] = [];

      for (const appointment of appointments) {
        if (appointment.patientSsn) {
          try {
            const patient = await MedicalRecordsApi.getPatientBySSN(appointment.patientSsn);
            fetchedPatients.push(patient);
          } catch (error) {
            console.error(`Failed to fetch patient with ID ${appointment.patientSsn}:`, error);
          }
        }
      }

      setPatients(fetchedPatients);
    };

    fetchPatients();
  }, [appointments]);

  return (
    <Box
      className='px-6 mt-8 py-4 border-2 rounded-xl bg-white'
      boxShadow={'0px 1px 2px 0px rgba(16, 24, 40, 0.06)'}
    >
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Stack direction='row' spacing={2} alignItems='center'>
          <Typography variant='h6'>Appointment List</Typography>
          <>{JSON.stringify(patients[9])}</>
          <Chip
            label={`${count} appointments`}
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
        select={select}
      />
      <Pagination
        page={pagination?.page as number}
        count={pagination?.count as number}
        onChange={pagination?.onPageChange || (() => {})}
        rowsPerPage={10}
      />
      <ApproveAppointmentDialog
        open={approveDialog.open}
        onClose={approveDialog.handleClose}
        appointment={approveDialog.data as AppointmentDetailConfig}
        onConfirm={() => assignDialog.handleOpen(approveDialog?.data as AppointmentDetailConfig)}
      />
      <DeclineAppointmentDialog
        open={rejectDialog.open}
        onClose={rejectDialog.handleClose}
        appointment={rejectDialog.data as AppointmentDetailConfig}
        onConfirm={() => rejectAppointment(rejectDialog?.data?.id as string)}
      />
      <AppointmentAssignDialog
        open={assignDialog.open}
        onClose={assignDialog.handleClose}
        appointment={assignDialog.data as AppointmentDetailConfig}
      />
    </Box>
  );
};

export default AppointmentManagementList;
