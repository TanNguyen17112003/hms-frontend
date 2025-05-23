import { Box, Chip, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import usePagination from 'src/hooks/use-pagination';
import { useDialog, useDrawer, useSelection } from '@hooks';
import { CustomTable } from '@components';
import { Stack } from '@mui/system';
import getAppointmentManangementTableConfig from 'src/sections/admin/appointment/appointment-management-table-config';
import { AppointmentDetail } from 'src/types/appointment';
import { useRouter } from 'next/router';
import { useAuth } from '@hooks';
import { PatientDetail, UserDetail } from 'src/types/user';
import { MedicalRecordsApi } from 'src/api/medical-record';

interface AppointmentManagementListProps {
  appointments: AppointmentDetail[];
  searchInput: string;
}
const AppointmentManagementList: React.FC<AppointmentManagementListProps> = ({
  appointments,
  searchInput
}) => {
  const [patients, setPatients] = useState<PatientDetail[]>([]);
  const { user } = useAuth();
  const pagination = usePagination({
    count: appointments.length
  });
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
        pagination={pagination}
        cellClassName='bg-white'
      />
    </Box>
  );
};

export default AppointmentManagementList;
