import React, { useEffect, useMemo, useState } from 'react';
import { Stack } from '@mui/material';
import DashboardAppointment from './dashboard-appointment';
import DashboardChart from './dashboard-chart';
import DashboardPatient from './dashboard-patient';
import { useAuth } from '@hooks';
import { MedicalRecordsApi } from 'src/api/medical-record';
import useFunction from 'src/hooks/use-function';
import RelativeInfoCard from '../patient-detail/relative-info-card';
import MedicalHistoryCard from '../patient-detail/medical-history-card';
import { PatientRelative } from 'src/types/patient-relative';
import { PastDisease } from 'src/types/past-disease';
import { SurgicalHistory } from 'src/types/surgical-history';
import { MedicalHistory } from 'src/types/medical-history';
import { Allergy } from 'src/types/allergy';
import { Vaccination } from 'src/types/vaccination';
import { FamilyHistory } from 'src/types/family-history';
import { LoadingProcess } from '@components';

function DashboardHome() {
  const { user } = useAuth();
  const getPatientsApi = useFunction(MedicalRecordsApi.getPatients);
  const getPatientBySsn = useFunction(MedicalRecordsApi.getPatientBySSN);
  const info = useMemo(() => {
    return getPatientBySsn.data || null;
  }, [getPatientBySsn.data]);
  const getPatientRelativesApi = useFunction((request: { patientId: string; params: FormData }) =>
    MedicalRecordsApi.getPatientRelatives(request.patientId, request.params)
  );
  const getPastDiseasesApi = useFunction((request: { patientId: string; params: FormData }) =>
    MedicalRecordsApi.getPastDiseases(request.patientId, request.params)
  );
  const getSurgicalHistoriesApi = useFunction((request: { patientId: string; params: FormData }) =>
    MedicalRecordsApi.getSurgicalHistories(request.patientId, request.params)
  );
  const getAllergiesApi = useFunction((request: { patientId: string; params: FormData }) =>
    MedicalRecordsApi.getAllergies(request.patientId, request.params)
  );
  const getVaccinationsApi = useFunction((request: { patientId: string; params: FormData }) =>
    MedicalRecordsApi.getVaccinations(request.patientId, request.params)
  );
  const getFamilyHistoriesApi = useFunction((request: { patientId: string; params: FormData }) =>
    MedicalRecordsApi.getFamilyHistories(request.patientId, request.params)
  );

  const getMedicationsApi = useFunction((request: { patientId: string; params: FormData }) =>
    MedicalRecordsApi.getMedicationHistories(request.patientId, request.params)
  );

  const [patientPage, setPatientPage] = useState(0);
  const [relativesPage, setRelativesPage] = useState(0);
  const [relativesRowsPerPage, setRelativesRowsPerPage] = useState(5);

  const [pastDiseasesPage, setPastDiseasesPage] = useState(0);
  const [pastDiseasesRowsPerPage, setPastDiseasesRowsPerPage] = useState(5);

  const [surgicalPage, setSurgicalPage] = useState(0);
  const [surgicalRowsPerPage, setSurgicalRowsPerPage] = useState(5);

  const [allergiesPage, setAllergiesPage] = useState(0);
  const [allergiesRowsPerPage, setAllergiesRowsPerPage] = useState(5);

  const [vaccinationsPage, setVaccinationsPage] = useState(0);
  const [vaccinationsRowsPerPage, setVaccinationsRowsPerPage] = useState(5);

  const [familyPage, setFamilyPage] = useState(0);
  const [familyRowsPerPage, setFamilyRowsPerPage] = useState(5);

  const [medicationsPage, setMedicationsPage] = useState(0);
  const [medicationsRowsPerPage, setMedicationsRowsPerPage] = useState(5);

  const patients = useMemo(() => {
    return getPatientsApi.data?.content || [];
  }, [getPatientsApi.data]);

  const patientCount = useMemo(() => {
    return getPatientsApi.data?.totalElements || 0;
  }, [getPatientsApi.data]);

  const relatives = useMemo(() => {
    return getPatientRelativesApi.data?.content || [];
  }, [getPatientRelativesApi.data]);

  const totalRelatives = useMemo(() => {
    return getPatientRelativesApi.data?.totalElements || 0;
  }, [getPatientRelativesApi.data]);

  const pastDiseases = useMemo(() => {
    return getPastDiseasesApi.data?.content || [];
  }, [getPastDiseasesApi.data]);

  const totalPastDiseases = useMemo(() => {
    return getPastDiseasesApi.data?.totalElements || 0;
  }, [getPastDiseasesApi.data]);

  const surgicalHistories = useMemo(() => {
    return getSurgicalHistoriesApi.data?.content || [];
  }, [getSurgicalHistoriesApi.data]);

  const totalSurgical = useMemo(() => {
    return getSurgicalHistoriesApi.data?.totalElements || 0;
  }, [getSurgicalHistoriesApi.data]);

  const allergies = useMemo(() => {
    return getAllergiesApi.data?.content || [];
  }, [getAllergiesApi.data]);

  const totalAllergies = useMemo(() => {
    return getAllergiesApi.data?.totalElements || 0;
  }, [getAllergiesApi.data]);

  const vaccinations = useMemo(() => {
    return getVaccinationsApi.data?.content || [];
  }, [getVaccinationsApi.data]);

  const totalVaccinations = useMemo(() => {
    return getVaccinationsApi.data?.totalElements || 0;
  }, [getVaccinationsApi.data]);

  const familyHistories = useMemo(() => {
    return getFamilyHistoriesApi.data?.content || [];
  }, [getFamilyHistoriesApi.data]);

  const totalFamily = useMemo(() => {
    return getFamilyHistoriesApi.data?.totalElements || 0;
  }, [getFamilyHistoriesApi.data]);

  const medications = useMemo(() => {
    return getMedicationsApi.data?.content || [];
  }, [getMedicationsApi.data]);

  const totalMedications = useMemo(() => {
    return getMedicationsApi.data?.totalElements || 0;
  }, [getMedicationsApi.data]);

  useEffect(() => {
    const formData = new FormData();
    formData.append('page', patientPage.toString());
    getPatientsApi.call(formData);
  }, [patientPage]);

  useEffect(() => {
    if (user?.ssn && user?.role === 'PATIENT') {
      getPatientBySsn.call(user?.ssn);
    }
  }, [user]);

  useEffect(() => {
    if (info && user?.role === 'PATIENT') {
      const formData = new FormData();
      formData.append('page', relativesPage.toString());
      formData.append('size', relativesRowsPerPage.toString());
      getPatientRelativesApi.call({
        patientId: info?.id || '',
        params: formData
      });
    }
  }, [info, user?.role, relativesPage, relativesRowsPerPage]);

  useEffect(() => {
    if (info && user?.role === 'PATIENT') {
      const formData = new FormData();
      formData.append('page', pastDiseasesPage.toString());
      formData.append('size', pastDiseasesRowsPerPage.toString());
      getPastDiseasesApi.call({
        patientId: info?.id || '',
        params: formData
      });
    }
  }, [info, user?.role, pastDiseasesPage, pastDiseasesRowsPerPage]);

  useEffect(() => {
    if (info && user?.role === 'PATIENT') {
      const formData = new FormData();
      formData.append('page', surgicalPage.toString());
      formData.append('size', surgicalRowsPerPage.toString());
      getSurgicalHistoriesApi.call({
        patientId: info?.id || '',
        params: formData
      });
    }
  }, [info, user?.role, surgicalPage, surgicalRowsPerPage]);

  useEffect(() => {
    if (info && user?.role === 'PATIENT') {
      const formData = new FormData();
      formData.append('page', allergiesPage.toString());
      formData.append('size', allergiesRowsPerPage.toString());
      getAllergiesApi.call({
        patientId: info?.id || '',
        params: formData
      });
    }
  }, [info, user?.role, allergiesPage, allergiesRowsPerPage]);

  useEffect(() => {
    if (info && user?.role === 'PATIENT') {
      const formData = new FormData();
      formData.append('page', vaccinationsPage.toString());
      formData.append('size', vaccinationsRowsPerPage.toString());
      getVaccinationsApi.call({
        patientId: info?.id || '',
        params: formData
      });
    }
  }, [info, user?.role, vaccinationsPage, vaccinationsRowsPerPage]);

  useEffect(() => {
    if (info && user?.role === 'PATIENT') {
      const formData = new FormData();
      formData.append('page', familyPage.toString());
      formData.append('size', familyRowsPerPage.toString());
      getFamilyHistoriesApi.call({
        patientId: info?.id || '',
        params: formData
      });
    }
  }, [info, user?.role, familyPage, familyRowsPerPage]);

  useEffect(() => {
    if (info && user?.role === 'PATIENT') {
      const formData = new FormData();
      formData.append('page', medicationsPage.toString());
      formData.append('size', medicationsRowsPerPage.toString());
      getMedicationsApi.call({
        patientId: info?.id || '',
        params: formData
      });
    }
  }, [info, user?.role, medicationsPage, medicationsRowsPerPage]);

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
      {user?.role === 'PATIENT' && (
        <RelativeInfoCard
          isPatient={true}
          relativeInfo={relatives as PatientRelative[]}
          pagination={{
            page: relativesPage,
            rowsPerPage: relativesRowsPerPage,
            setPage: setRelativesPage,
            setRowsPerPage: setRelativesRowsPerPage
          }}
          count={totalRelatives}
        />
      )}
      {user?.role === 'PATIENT' && (
        <MedicalHistoryCard
          isPatient={true}
          medicalInfo={{
            medications: medications as MedicalHistory[],
            pastDiseases: pastDiseases as PastDisease[],
            surgicalHistories: surgicalHistories as SurgicalHistory[],
            allergies: allergies as Allergy[],
            vaccinations: vaccinations as Vaccination[],
            familyHistories: familyHistories as FamilyHistory[]
          }}
          pagination={{
            medications: {
              page: medicationsPage,
              rowsPerPage: medicationsRowsPerPage,
              setPage: setMedicationsPage,
              setRowsPerPage: setMedicationsRowsPerPage
            },
            pastDiseases: {
              page: pastDiseasesPage,
              rowsPerPage: pastDiseasesRowsPerPage,
              setPage: setPastDiseasesPage,
              setRowsPerPage: setPastDiseasesRowsPerPage
            },
            surgicalHistories: {
              page: surgicalPage,
              rowsPerPage: surgicalRowsPerPage,
              setPage: setSurgicalPage,
              setRowsPerPage: setSurgicalRowsPerPage
            },
            allergies: {
              page: allergiesPage,
              rowsPerPage: allergiesRowsPerPage,
              setPage: setAllergiesPage,
              setRowsPerPage: setAllergiesRowsPerPage
            },
            vaccinations: {
              page: vaccinationsPage,
              rowsPerPage: vaccinationsRowsPerPage,
              setPage: setVaccinationsPage,
              setRowsPerPage: setVaccinationsRowsPerPage
            },
            familyHistories: {
              page: familyPage,
              rowsPerPage: familyRowsPerPage,
              setPage: setFamilyPage,
              setRowsPerPage: setFamilyRowsPerPage
            }
          }}
          count={{
            medications: totalMedications,
            pastDiseases: totalPastDiseases,
            surgicalHistories: totalSurgical,
            allergies: totalAllergies,
            vaccinations: totalVaccinations,
            familyHistories: totalFamily
          }}
        />
      )}
      {(getPatientsApi.loading ||
        getPatientBySsn.loading ||
        getPatientRelativesApi.loading ||
        getPastDiseasesApi.loading ||
        getSurgicalHistoriesApi.loading ||
        getAllergiesApi.loading ||
        getVaccinationsApi.loading ||
        getFamilyHistoriesApi.loading ||
        getMedicationsApi.loading) && <LoadingProcess />}
    </Stack>
  );
}

export default DashboardHome;
