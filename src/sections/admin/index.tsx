import React, { useEffect, useMemo, useState } from 'react';
import { Stack } from '@mui/material';
import DashboardAppointment from './dashboard-appointment';
import DashboardChart from './dashboard-chart';
import DashboardPatient from './dashboard-patient';
import { patients } from 'src/utils/generate-mock';
import { useAuth } from '@hooks';
import { MedicalRecordsApi } from 'src/api/medical-record';
import useFunction from 'src/hooks/use-function';

function DashboardHome() {
  const { user } = useAuth();
  const getPatientsApi = useFunction(MedicalRecordsApi.getPatients);
  const [patientPage, setPatientPage] = useState(0);

  const patients = useMemo(() => {
    return getPatientsApi.data?.content || [];
  }, [getPatientsApi.data]);

  const patientCount = useMemo(() => {
    return getPatientsApi.data?.totalElements || 0;
  }, [getPatientsApi.data]);

  useEffect(() => {
    const formData = new FormData();
    formData.append('page', patientPage.toString());
    getPatientsApi.call(formData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientPage]);
  return (
    <Stack direction={'column'} spacing={2} paddingX={3} marginTop={2}>
      <DashboardChart />
      {user?.role !== 'PATIENT' && (
        <DashboardPatient
          patients={patients}
          pagination={{
            page: patientPage,
            setPage: setPatientPage
          }}
          count={patientCount}
        />
      )}
      <DashboardAppointment />
    </Stack>
  );
}

export default DashboardHome;
