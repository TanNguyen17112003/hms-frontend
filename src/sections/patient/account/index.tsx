import React, { useEffect, useMemo, useState } from 'react';
import AccountBasicInfo from './account-basic-info';
import AccountMedicalInfo from './account-medical-info';
import AccountPassword from './account-password';
import AccountPicture from './account-picture';
import { Stack, Tabs, Tab } from '@mui/material';
import { useAuth } from '@hooks';
import { UserDetail } from 'src/types/user';
import { MedicalRecordsApi } from 'src/api/medical-record';
import GeneralInfoCard from 'src/sections/patient-detail/general-info-card';
import useFunction from 'src/hooks/use-function';
import MedicalInfoCard from 'src/sections/patient-detail/medical-info-card';
import { MedicalInformation } from 'src/types/medical-information';
import RelativeInfoCard from 'src/sections/patient-detail/relative-info-card';
import { PatientRelative } from 'src/types/patient-relative';
import MedicalHistoryCard from 'src/sections/patient-detail/medical-history-card';
import { PastDisease } from 'src/types/past-disease';
import { SurgicalHistory } from 'src/types/surgical-history';
import { MedicalHistory } from 'src/types/medical-history';
import { Allergy } from 'src/types/allergy';
import { Vaccination } from 'src/types/vaccination';
import { FamilyHistory } from 'src/types/family-history';
import MedicalRecordCard from 'src/sections/patient-detail/medical-record-card';
import { MedicalRecord } from 'src/types/medical-record';

function PatientAccount() {
  const tabs = [
    { label: 'Basic Info', value: 'basic-info' },
    { label: 'Medical Info', value: 'medical-info' }
  ];
  const [selectedTab, setSelectedTab] = useState(tabs[0].value);
  const { user } = useAuth();
  const [relativesPage, setRelativesPage] = useState(0);
  const [relativesRowsPerPage, setRelativesRowsPerPage] = useState(5);

  const [medicationsPage, setMedicationsPage] = useState(0);
  const [medicationsRowsPerPage, setMedicationsRowsPerPage] = useState(5);

  const [surgicalPage, setSurgicalPage] = useState(0);
  const [surgicalRowsPerPage, setSurgicalRowsPerPage] = useState(5);

  const [vaccinationsPage, setVaccinationsPage] = useState(0);
  const [vaccinationsRowsPerPage, setVaccinationsRowsPerPage] = useState(5);

  const [familyPage, setFamilyPage] = useState(0);
  const [familyRowsPerPage, setFamilyRowsPerPage] = useState(5);

  const [allergiesPage, setAllergiesPage] = useState(0);
  const [allergiesRowsPerPage, setAllergiesRowsPerPage] = useState(5);

  const [pastDiseasesPage, setPastDiseasesPage] = useState(0);
  const [pastDiseasesRowsPerPage, setPastDiseasesRowsPerPage] = useState(5);

  const [medicalRecordsPage, setMedicalRecordsPage] = useState(0);
  const [medicalRecordsRowsPerPage, setMedicalRecordsRowsPerPage] = useState(5);
  const getInfoApi = useFunction(MedicalRecordsApi.getPatientBySSN);
  const getMedicalInfoApi = useFunction(MedicalRecordsApi.getMedicalInformation);
  const getPatientRelativesApi = useFunction((request: { patientId: string; params: FormData }) =>
    MedicalRecordsApi.getPatientRelatives(request.patientId, request.params)
  );
  const getMedicationHistoriesApi = useFunction(
    (request: { patientId: string; params: FormData }) =>
      MedicalRecordsApi.getMedicationHistories(request.patientId, request.params)
  );
  const getSurgicalHistoriesApi = useFunction((request: { patientId: string; params: FormData }) =>
    MedicalRecordsApi.getSurgicalHistories(request.patientId, request.params)
  );
  const getVaccinationsApi = useFunction((request: { patientId: string; params: FormData }) =>
    MedicalRecordsApi.getVaccinations(request.patientId, request.params)
  );
  const getFamilyHistoriesApi = useFunction((request: { patientId: string; params: FormData }) =>
    MedicalRecordsApi.getFamilyHistories(request.patientId, request.params)
  );
  const getAllergiesApi = useFunction((request: { patientId: string; params: FormData }) =>
    MedicalRecordsApi.getAllergies(request.patientId, request.params)
  );

  const getPastDiseasesApi = useFunction((request: { patientId: string; params: FormData }) =>
    MedicalRecordsApi.getPastDiseases(request.patientId, request.params)
  );

  const getMedicalRecordsApi = useFunction((request: { patientId: string; params: FormData }) =>
    MedicalRecordsApi.getMedicalRecords(request.patientId, request.params)
  );
  const info = useMemo(() => {
    return getInfoApi.data || null;
  }, [getInfoApi.data]);

  const medicalInfo = useMemo(() => {
    return getMedicalInfoApi.data || null;
  }, [getMedicalInfoApi.data]);

  const totalRelatives = useMemo(() => {
    return getPatientRelativesApi.data?.totalElements || 0;
  }, [getPatientRelativesApi.data]);

  const totalMedications = useMemo(() => {
    return getMedicationHistoriesApi.data?.totalElements || 0;
  }, [getMedicationHistoriesApi.data]);

  const totalSurgical = useMemo(() => {
    return getSurgicalHistoriesApi.data?.totalElements || 0;
  }, [getSurgicalHistoriesApi.data]);

  const totalVaccinations = useMemo(() => {
    return getVaccinationsApi.data?.totalElements || 0;
  }, [getVaccinationsApi.data]);

  const totalFamily = useMemo(() => {
    return getFamilyHistoriesApi.data?.totalElements || 0;
  }, [getFamilyHistoriesApi.data]);

  const totalAllergies = useMemo(() => {
    return getAllergiesApi.data?.totalElements || 0;
  }, [getAllergiesApi.data]);

  const totalPastDiseases = useMemo(() => {
    return getPastDiseasesApi.data?.totalElements || 0;
  }, [getPastDiseasesApi.data]);

  const totalMedicalRecords = useMemo(() => {
    return getMedicalRecordsApi.data?.totalElements || 0;
  }, [getMedicalRecordsApi.data]);

  useEffect(() => {
    if (user) {
      getInfoApi.call(user.ssn);
    }
  }, []);

  useEffect(() => {
    if (info) {
      getMedicalInfoApi.call(info.id);
    }
  }, [info]);

  useEffect(() => {
    if (info) {
      const formData = new FormData();
      formData.append('page', relativesPage.toString());
      formData.append('size', relativesRowsPerPage.toString());
      getPatientRelativesApi.call({
        patientId: info?.id as string,
        params: formData
      });
    }
  }, [info, relativesPage, relativesRowsPerPage]);

  useEffect(() => {
    if (info) {
      const formData = new FormData();
      formData.append('page', medicationsPage.toString());
      formData.append('size', medicationsRowsPerPage.toString());
      getMedicationHistoriesApi.call({
        patientId: info?.id as string,
        params: formData
      });
    }
  }, [info, medicationsPage, medicationsRowsPerPage]);

  useEffect(() => {
    if (info) {
      const formData = new FormData();
      formData.append('page', surgicalPage.toString());
      formData.append('size', surgicalRowsPerPage.toString());
      getSurgicalHistoriesApi.call({
        patientId: info?.id as string,
        params: formData
      });
    }
  }, [info, surgicalPage, surgicalRowsPerPage]);

  useEffect(() => {
    if (info) {
      const formData = new FormData();
      formData.append('page', vaccinationsPage.toString());
      formData.append('size', vaccinationsRowsPerPage.toString());
      getVaccinationsApi.call({
        patientId: info?.id as string,
        params: formData
      });
    }
  }, [info, vaccinationsPage, vaccinationsRowsPerPage]);

  useEffect(() => {
    if (info) {
      const formData = new FormData();
      formData.append('page', familyPage.toString());
      formData.append('size', familyRowsPerPage.toString());
      getFamilyHistoriesApi.call({
        patientId: info?.id as string,
        params: formData
      });
    }
  }, [info, familyPage, familyRowsPerPage]);

  useEffect(() => {
    if (info) {
      const formData = new FormData();
      formData.append('page', allergiesPage.toString());
      formData.append('size', allergiesRowsPerPage.toString());
      getAllergiesApi.call({
        patientId: info?.id as string,
        params: formData
      });
    }
  }, [info, allergiesPage, allergiesRowsPerPage]);

  useEffect(() => {
    if (info) {
      const formData = new FormData();
      formData.append('page', pastDiseasesPage.toString());
      formData.append('size', pastDiseasesRowsPerPage.toString());
      getPastDiseasesApi.call({
        patientId: info?.id as string,
        params: formData
      });
    }
  }, [info, pastDiseasesPage, pastDiseasesRowsPerPage]);

  useEffect(() => {
    if (info) {
      const formData = new FormData();
      formData.append('page', medicalRecordsPage.toString());
      formData.append('size', medicalRecordsRowsPerPage.toString());
      getMedicalRecordsApi.call({
        patientId: info?.id as string,
        params: formData
      });
    }
  }, [info, medicalRecordsPage, medicalRecordsRowsPerPage]);

  return (
    <Stack spacing={2}>
      <Tabs
        value={selectedTab}
        onChange={(event, newValue) => {
          setSelectedTab(newValue);
        }}
        variant='scrollable'
        scrollButtons='auto'
        allowScrollButtonsMobile
      >
        {tabs.map((tab) => (
          <Tab key={tab.value} label={tab.label} value={tab.value} />
        ))}
      </Tabs>
      {selectedTab === 'basic-info' && (
        <>
          <GeneralInfoCard generalInfo={info as UserDetail} />
          <MedicalInfoCard medicalInfo={medicalInfo as MedicalInformation} />
          <AccountPassword />
        </>
      )}
      {selectedTab === 'medical-info' && (
        <>
          <RelativeInfoCard
            isPatient={true}
            relativeInfo={getPatientRelativesApi.data?.content as PatientRelative[]}
            pagination={{
              page: relativesPage,
              rowsPerPage: relativesRowsPerPage,
              setPage: setRelativesPage,
              setRowsPerPage: setRelativesRowsPerPage
            }}
            count={totalRelatives}
          />
          <MedicalHistoryCard
            isPatient={true}
            medicalInfo={{
              pastDiseases: getPastDiseasesApi.data?.content as PastDisease[],
              surgicalHistories: getSurgicalHistoriesApi.data?.content as SurgicalHistory[],
              medications: getMedicationHistoriesApi.data?.content as MedicalHistory[],
              allergies: getAllergiesApi.data?.content as Allergy[],
              vaccinations: getVaccinationsApi.data?.content as Vaccination[],
              familyHistories: getFamilyHistoriesApi.data?.content as FamilyHistory[]
            }}
            pagination={{
              medications: {
                page: medicationsPage,
                rowsPerPage: medicationsRowsPerPage,
                setPage: setMedicationsPage,
                setRowsPerPage: setMedicationsRowsPerPage
              },
              surgicalHistories: {
                page: surgicalPage,
                rowsPerPage: surgicalRowsPerPage,
                setPage: setSurgicalPage,
                setRowsPerPage: setSurgicalRowsPerPage
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
              },
              allergies: {
                page: allergiesPage,
                rowsPerPage: allergiesRowsPerPage,
                setPage: setAllergiesPage,
                setRowsPerPage: setAllergiesRowsPerPage
              },
              pastDiseases: {
                page: pastDiseasesPage,
                rowsPerPage: pastDiseasesRowsPerPage,
                setPage: setPastDiseasesPage,
                setRowsPerPage: setPastDiseasesRowsPerPage
              }
            }}
            count={{
              medications: totalMedications,
              surgicalHistories: totalSurgical,
              vaccinations: totalVaccinations,
              familyHistories: totalFamily,
              allergies: totalAllergies,
              pastDiseases: totalPastDiseases
            }}
          />
          <MedicalRecordCard
            isPatient={true}
            medicalInfo={getMedicalRecordsApi.data?.content as MedicalRecord[]}
            pagination={{
              page: medicalRecordsPage,
              rowsPerPage: medicalRecordsRowsPerPage,
              setPage: setMedicalRecordsPage,
              setRowsPerPage: setMedicalRecordsRowsPerPage
            }}
            count={totalMedicalRecords}
          />
        </>
      )}
    </Stack>
  );
}

export default PatientAccount;
