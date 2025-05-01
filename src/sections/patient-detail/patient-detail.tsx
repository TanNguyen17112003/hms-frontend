import { Page as PageType } from 'src/types/page';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { DashboardLayout } from 'src/layouts';
import { ArrowLeft, Calendar, ChevronRight } from 'lucide-react';
import { Breadcrumbs, Button, Link, Typography } from '@mui/material';
import GeneralInfoCard from './general-info-card';
import MedicalInfoCard from './medical-info-card';
import { Box } from '@mui/system';
import RelativeInfoCard from './relative-info-card';
import MedicalHistoryCard from './medical-history-card';
import MedicalRecordCard from './medical-record-card';
import { useRouter } from 'next/router';
import {
  AllergyRequest,
  FamilyHistoryRequest,
  MedicalHistoryRequest,
  MedicalInformationRequest,
  MedicalRecordRequest,
  MedicalRecordsApi,
  PastDiseaseRequest,
  PatientRelativeRequest,
  SurgicalHistoryRequest,
  UpdatePatientRequest,
  VaccinationRequest
} from 'src/api/medical-record';
import useFunction from 'src/hooks/use-function';
import { UserDetail } from 'src/types/user';
import { MedicalInformation } from 'src/types/medical-information';
import { PatientRelative } from 'src/types/patient-relative';
import { PastDisease } from 'src/types/past-disease';
import { SurgicalHistory } from 'src/types/surgical-history';
import { Allergy } from 'src/types/allergy';
import { Vaccination } from 'src/types/vaccination';
import { MedicalHistory } from 'src/types/medical-history';
import { FamilyHistory } from 'src/types/family-history';
import { MedicalRecord } from 'src/types/medical-record';
import { LoadingProcess } from '@components';

const PatientDetail: PageType = () => {
  const router = useRouter();

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
  const getPatientApi = useFunction(MedicalRecordsApi.getPatient);
  const getMedicalInformationApi = useFunction(MedicalRecordsApi.getMedicalInformation);
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

  const fetchRelatives = useCallback(() => {
    const formData = new FormData();
    formData.append('size', relativesRowsPerPage.toString());
    formData.append('page', relativesPage.toString());
    getPatientRelativesApi.call({
      patientId: router.query.patientId as string,
      params: formData
    });
  }, [relativesPage, relativesRowsPerPage, router.query.patientId]);

  const fetchMedications = useCallback(() => {
    const formData = new FormData();
    formData.append('size', medicationsRowsPerPage.toString());
    formData.append('page', medicationsPage.toString());
    getMedicationHistoriesApi.call({
      patientId: router.query.patientId as string,
      params: formData
    });
  }, [medicationsPage, medicationsRowsPerPage, router.query.patientId]);

  const fetchSurgicalHistories = useCallback(() => {
    const formData = new FormData();
    formData.append('size', surgicalRowsPerPage.toString());
    formData.append('page', surgicalPage.toString());
    getSurgicalHistoriesApi.call({
      patientId: router.query.patientId as string,
      params: formData
    });
  }, [surgicalPage, surgicalRowsPerPage, router.query.patientId]);

  const fetchVaccinations = useCallback(() => {
    const formData = new FormData();
    formData.append('size', vaccinationsRowsPerPage.toString());
    formData.append('page', vaccinationsPage.toString());
    getVaccinationsApi.call({
      patientId: router.query.patientId as string,
      params: formData
    });
  }, [vaccinationsPage, vaccinationsRowsPerPage, router.query.patientId]);

  const fetchFamilyHistories = useCallback(() => {
    const formData = new FormData();
    formData.append('size', familyRowsPerPage.toString());
    formData.append('page', familyPage.toString());
    getFamilyHistoriesApi.call({
      patientId: router.query.patientId as string,
      params: formData
    });
  }, [familyPage, familyRowsPerPage, router.query.patientId]);

  const fetchAllergies = useCallback(() => {
    const formData = new FormData();
    formData.append('size', allergiesRowsPerPage.toString());
    formData.append('page', allergiesPage.toString());
    getAllergiesApi.call({
      patientId: router.query.patientId as string,
      params: formData
    });
  }, [allergiesPage, allergiesRowsPerPage, router.query.patientId]);

  const fetchPastDiseases = useCallback(() => {
    const formData = new FormData();
    formData.append('size', pastDiseasesRowsPerPage.toString());
    formData.append('page', pastDiseasesPage.toString());
    getPastDiseasesApi.call({
      patientId: router.query.patientId as string,
      params: formData
    });
  }, [pastDiseasesPage, pastDiseasesRowsPerPage, router.query.patientId]);

  const fetchMedicalRecords = useCallback(() => {
    const formData = new FormData();
    formData.append('size', medicalRecordsRowsPerPage.toString());
    formData.append('page', medicalRecordsPage.toString());
    getMedicalRecordsApi.call({
      patientId: router.query.patientId as string,
      params: formData
    });
  }, [medicalRecordsPage, medicalRecordsRowsPerPage, router.query.patientId]);

  const totalPastDiseases = useMemo(() => {
    return getPastDiseasesApi.data?.totalElements || 0;
  }, [getPastDiseasesApi.data]);

  const totalSurgicalHistories = useMemo(() => {
    return getSurgicalHistoriesApi.data?.totalElements || 0;
  }, [getSurgicalHistoriesApi.data]);

  const totalVaccinations = useMemo(() => {
    return getVaccinationsApi.data?.totalElements || 0;
  }, [getVaccinationsApi.data]);

  const totalFamilyHistories = useMemo(() => {
    return getFamilyHistoriesApi.data?.totalElements || 0;
  }, [getFamilyHistoriesApi.data]);

  const totalAllergies = useMemo(() => {
    return getAllergiesApi.data?.totalElements || 0;
  }, [getAllergiesApi.data]);

  const totalMedicalRecords = useMemo(() => {
    return getMedicalRecordsApi.data?.totalElements || 0;
  }, [getMedicalRecordsApi.data]);

  const totalMedications = useMemo(() => {
    return getMedicationHistoriesApi.data?.totalElements || 0;
  }, [getMedicationHistoriesApi.data]);

  const totalRelatives = useMemo(() => {
    return getPatientRelativesApi.data?.totalElements || 0;
  }, [getPatientRelativesApi.data]);

  const patient = useMemo(() => {
    return getPatientApi.data || null;
  }, [getPatientApi.data]);

  const medicalInformation = useMemo(() => {
    return getMedicalInformationApi.data || null;
  }, [getMedicalInformationApi.data]);

  const patientRelatives = useMemo(() => {
    return getPatientRelativesApi.data?.content || null;
  }, [getPatientRelativesApi.data]);

  const medicationHistories = useMemo(() => {
    return getMedicationHistoriesApi.data?.content || null;
  }, [getMedicationHistoriesApi.data]);

  const surgicalHistories = useMemo(() => {
    return getSurgicalHistoriesApi.data?.content || null;
  }, [getSurgicalHistoriesApi.data]);

  const vaccinations = useMemo(() => {
    return getVaccinationsApi.data?.content || null;
  }, [getVaccinationsApi.data]);

  const familyHistories = useMemo(() => {
    return getFamilyHistoriesApi.data?.content || null;
  }, [getFamilyHistoriesApi.data]);

  const allergies = useMemo(() => {
    return getAllergiesApi.data?.content || null;
  }, [getAllergiesApi.data]);

  const pastDiseases = useMemo(() => {
    return getPastDiseasesApi.data?.content || null;
  }, [getPastDiseasesApi.data]);

  const medicalRecords = useMemo(() => {
    return getMedicalRecordsApi.data?.content || null;
  }, [getMedicalRecordsApi.data]);

  const updateGeneralInfo = useCallback(
    async (values: UpdatePatientRequest) => {
      try {
        const response = await MedicalRecordsApi.updatePatient(
          router.query.patientId as string,
          values
        );
        if (response) {
          getPatientApi.setData(response);
        }
      } catch (error) {
        throw error;
      }
    },
    [getPatientApi]
  );

  const updateMedicalInfo = useCallback(
    async (values: MedicalInformationRequest) => {
      try {
        const response = await MedicalRecordsApi.updateMedicalInformation(
          router.query.patientId as string,
          values
        );
        if (response) {
          getMedicalInformationApi.setData(response);
        }
      } catch (error) {
        throw error;
      }
    },
    [getMedicalInformationApi]
  );

  const createPatientRelative = useCallback(
    async (values: PatientRelativeRequest) => {
      try {
        const response = await MedicalRecordsApi.createPatientRelative(
          router.query.patientId as string,
          values
        );
        if (response) {
          await getPatientRelativesApi.call({
            patientId: router.query.patientId as string,
            params: new FormData()
          });
        }
      } catch (error) {
        throw error;
      }
    },
    [getPatientRelativesApi, router.query.patientId]
  );

  const updatePatientRelative = useCallback(
    async (id: string, values: PatientRelativeRequest) => {
      try {
        const response = await MedicalRecordsApi.updatePatientRelative(
          router.query.patientId as string,
          id,
          values
        );
        if (response) {
          await getPatientRelativesApi.call({
            patientId: router.query.patientId as string,
            params: new FormData()
          });
        }
      } catch (error) {
        throw error;
      }
    },
    [getPatientRelativesApi, router.query.patientId]
  );

  const deletePatientRelative = useCallback(
    async (id: string) => {
      try {
        await MedicalRecordsApi.deletePatientRelative(router.query.patientId as string, id);
        await getPatientRelativesApi.call({
          patientId: router.query.patientId as string,
          params: new FormData()
        });
      } catch (error) {
        console.error('Failed to delete relative:', error);
        throw error;
      }
    },
    [getPatientRelativesApi, router.query.patientId]
  );

  const createPastDisease = useCallback(
    async (values: PastDiseaseRequest) => {
      try {
        const response = await MedicalRecordsApi.createPastDisease(
          router.query.patientId as string,
          values
        );
        if (response) {
          // Refetch the full list of past diseases
          await getPastDiseasesApi.call({
            patientId: router.query.patientId as string,
            params: new FormData()
          });
        }
      } catch (error) {
        throw error;
      }
    },
    [getPastDiseasesApi, router.query.patientId]
  );

  const updatePastDisease = useCallback(
    async (id: string, values: PastDiseaseRequest) => {
      try {
        const response = await MedicalRecordsApi.updatePastDisease(
          router.query.patientId as string,
          id,
          values
        );
        if (response) {
          // Refetch the full list of past diseases
          await getPastDiseasesApi.call({
            patientId: router.query.patientId as string,
            params: new FormData()
          });
        }
      } catch (error) {
        throw error;
      }
    },
    [getPastDiseasesApi, router.query.patientId]
  );

  const deletePastDisease = useCallback(
    async (id: string) => {
      try {
        const response = await MedicalRecordsApi.deletePastDisease(
          router.query.patientId as string,
          id
        );
        await getPastDiseasesApi.call({
          patientId: router.query.patientId as string,
          params: new FormData()
        });
      } catch (error) {
        throw error;
      }
    },
    [getPastDiseasesApi, router.query.patientId]
  );

  const createSurgicalHistory = useCallback(
    async (values: SurgicalHistoryRequest) => {
      try {
        const response = await MedicalRecordsApi.createSurgicalHistory(
          router.query.patientId as string,
          values
        );
        if (response) {
          // Refetch the full list of surgical histories
          await getSurgicalHistoriesApi.call({
            patientId: router.query.patientId as string,
            params: new FormData()
          });
        }
      } catch (error) {
        throw error;
      }
    },
    [getSurgicalHistoriesApi, router.query.patientId]
  );

  const updateSurgicalHistory = useCallback(
    async (id: string, values: SurgicalHistoryRequest) => {
      try {
        const response = await MedicalRecordsApi.updateSurgicalHistory(
          router.query.patientId as string,
          id,
          values
        );
        if (response) {
          // Refetch the full list of surgical histories
          await getSurgicalHistoriesApi.call({
            patientId: router.query.patientId as string,
            params: new FormData()
          });
        }
      } catch (error) {
        throw error;
      }
    },
    [getSurgicalHistoriesApi, router.query.patientId]
  );

  const deleteSurgicalHistory = useCallback(
    async (id: string) => {
      try {
        const response = await MedicalRecordsApi.deleteSurgicalHistory(
          router.query.patientId as string,
          id
        );
        await getSurgicalHistoriesApi.call({
          patientId: router.query.patientId as string,
          params: new FormData()
        });
      } catch (error) {
        throw error;
      }
    },
    [getSurgicalHistoriesApi, router.query.patientId]
  );

  const createMedicationHistory = useCallback(
    async (values: MedicalHistoryRequest) => {
      try {
        const response = await MedicalRecordsApi.createMedicalHistory(
          router.query.patientId as string,
          values
        );
        if (response) {
          // Refetch the full list of medication histories
          await getMedicationHistoriesApi.call({
            patientId: router.query.patientId as string,
            params: new FormData()
          });
        }
      } catch (error) {
        throw error;
      }
    },
    [getMedicationHistoriesApi, router.query.patientId]
  );

  const updateMedicationHistory = useCallback(
    async (id: string, values: MedicalHistoryRequest) => {
      try {
        const response = await MedicalRecordsApi.updateMedicalHistory(
          router.query.patientId as string,
          id,
          values
        );
        if (response) {
          // Refetch the full list of medication histories
          await getMedicationHistoriesApi.call({
            patientId: router.query.patientId as string,
            params: new FormData()
          });
        }
      } catch (error) {
        throw error;
      }
    },
    [getMedicationHistoriesApi, router.query.patientId]
  );

  const deleteMedicationHistory = useCallback(
    async (id: string) => {
      try {
        const response = await MedicalRecordsApi.deleteMedicalHistory(
          router.query.patientId as string,
          id
        );
        await getMedicationHistoriesApi.call({
          patientId: router.query.patientId as string,
          params: new FormData()
        });
      } catch (error) {
        throw error;
      }
    },
    [getMedicationHistoriesApi, router.query.patientId]
  );

  const createVaccination = useCallback(
    async (values: VaccinationRequest) => {
      try {
        const response = await MedicalRecordsApi.createVaccination(
          router.query.patientId as string,
          values
        );
        if (response) {
          // Refetch the full list of vaccinations
          await getVaccinationsApi.call({
            patientId: router.query.patientId as string,
            params: new FormData()
          });
        }
      } catch (error) {
        throw error;
      }
    },
    [getVaccinationsApi, router.query.patientId]
  );

  const updateVaccination = useCallback(
    async (id: string, values: VaccinationRequest) => {
      try {
        const response = await MedicalRecordsApi.updateVaccination(
          router.query.patientId as string,
          id,
          values
        );
        if (response) {
          // Refetch the full list of vaccinations
          await getVaccinationsApi.call({
            patientId: router.query.patientId as string,
            params: new FormData()
          });
        }
      } catch (error) {
        throw error;
      }
    },
    [getVaccinationsApi, router.query.patientId]
  );

  const deleteVaccination = useCallback(
    async (id: string) => {
      try {
        const response = await MedicalRecordsApi.deleteVaccination(
          router.query.patientId as string,
          id
        );
        await getVaccinationsApi.call({
          patientId: router.query.patientId as string,
          params: new FormData()
        });
      } catch (error) {
        throw error;
      }
    },
    [getVaccinationsApi, router.query.patientId]
  );

  const createFamilyHistory = useCallback(
    async (values: FamilyHistoryRequest) => {
      try {
        const response = await MedicalRecordsApi.createFamilyHistory(
          router.query.patientId as string,
          values
        );
        if (response) {
          // Refetch the full list of family histories
          await getFamilyHistoriesApi.call({
            patientId: router.query.patientId as string,
            params: new FormData()
          });
        }
      } catch (error) {
        throw error;
      }
    },
    [getFamilyHistoriesApi, router.query.patientId]
  );

  const updateFamilyHistory = useCallback(
    async (id: string, values: FamilyHistoryRequest) => {
      try {
        const response = await MedicalRecordsApi.updateFamilyHistory(
          router.query.patientId as string,
          id,
          values
        );
        if (response) {
          // Refetch the full list of family histories
          await getFamilyHistoriesApi.call({
            patientId: router.query.patientId as string,
            params: new FormData()
          });
        }
      } catch (error) {
        throw error;
      }
    },
    [getFamilyHistoriesApi, router.query.patientId]
  );

  const deleteFamilyHistory = useCallback(
    async (id: string) => {
      try {
        const response = await MedicalRecordsApi.deleteFamilyHistory(
          router.query.patientId as string,
          id
        );
        await getFamilyHistoriesApi.call({
          patientId: router.query.patientId as string,
          params: new FormData()
        });
      } catch (error) {
        throw error;
      }
    },
    [getFamilyHistoriesApi, router.query.patientId]
  );

  const createAllergy = useCallback(
    async (values: AllergyRequest) => {
      try {
        const response = await MedicalRecordsApi.createAllergy(
          router.query.patientId as string,
          values
        );
        if (response) {
          // Refetch the full list of allergies
          await getAllergiesApi.call({
            patientId: router.query.patientId as string,
            params: new FormData()
          });
        }
      } catch (error) {
        throw error;
      }
    },
    [getAllergiesApi, router.query.patientId]
  );

  const updateAllergy = useCallback(
    async (id: string, values: AllergyRequest) => {
      try {
        const response = await MedicalRecordsApi.updateAllergy(
          router.query.patientId as string,
          id,
          values
        );
        if (response) {
          // Refetch the full list of allergies
          await getAllergiesApi.call({
            patientId: router.query.patientId as string,
            params: new FormData()
          });
        }
      } catch (error) {
        throw error;
      }
    },
    [getAllergiesApi, router.query.patientId]
  );

  const deleteAllergy = useCallback(
    async (id: string) => {
      try {
        const response = await MedicalRecordsApi.deleteAllergy(
          router.query.patientId as string,
          id
        );
        await getAllergiesApi.call({
          patientId: router.query.patientId as string,
          params: new FormData()
        });
      } catch (error) {
        throw error;
      }
    },
    [getAllergiesApi, router.query.patientId]
  );

  const createMedicalRecord = useCallback(
    async (values: MedicalRecordRequest) => {
      try {
        const response = await MedicalRecordsApi.createMedicalRecord(
          router.query.patientId as string,
          values
        );
        if (response) {
          // Refetch the full list of medical records
          await getMedicalRecordsApi.call({
            patientId: router.query.patientId as string,
            params: new FormData()
          });
        }
      } catch (error) {
        throw error;
      }
    },
    [getMedicalRecordsApi, router.query.patientId]
  );

  const updateMedicalRecord = useCallback(
    async (id: string, values: MedicalRecordRequest) => {
      try {
        const response = await MedicalRecordsApi.updateMedicalRecord(
          router.query.patientId as string,
          id,
          values
        );
        if (response) {
          // Refetch the full list of medical records
          await getMedicalRecordsApi.call({
            patientId: router.query.patientId as string,
            params: new FormData()
          });
        }
      } catch (error) {
        throw error;
      }
    },
    [getMedicalRecordsApi, router.query.patientId]
  );

  const deleteMedicalRecord = useCallback(
    async (id: string) => {
      try {
        const response = await MedicalRecordsApi.deleteMedicalRecord(
          router.query.patientId as string,
          id
        );
        await getMedicalRecordsApi.call({
          patientId: router.query.patientId as string,
          params: new FormData()
        });
      } catch (error) {
        throw error;
      }
    },
    [getMedicalRecordsApi, router.query.patientId]
  );

  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    router.push('/patient');
  }

  const breadcrumbs = [
    <Link
      underline='hover'
      key='1'
      color='#0E1680'
      onClick={handleClick}
      className='!font-semibold cursor-pointer'
    >
      Patient Management
    </Link>,
    <Typography key='3' sx={{ color: '#0E1680' }} className='!font-semibold'>
      Morshed Ali
    </Typography>
  ];

  useEffect(() => {
    getPatientApi.call(router.query.patientId as string);
    getMedicalInformationApi.call(router.query.patientId as string);
    fetchRelatives();
    fetchMedications();
    fetchSurgicalHistories();
    fetchVaccinations();
    fetchFamilyHistories();
    fetchAllergies();
    fetchPastDiseases();
    fetchMedicalRecords();
  }, [
    router.query.patientId,
    fetchRelatives,
    fetchMedications,
    fetchSurgicalHistories,
    fetchVaccinations,
    fetchFamilyHistories,
    fetchAllergies,
    fetchPastDiseases,
    fetchMedicalRecords,
    relativesPage,
    relativesRowsPerPage,
    medicationsPage,
    medicationsRowsPerPage,
    surgicalPage,
    surgicalRowsPerPage,
    vaccinationsPage,
    vaccinationsRowsPerPage,
    familyPage,
    familyRowsPerPage,
    allergiesPage,
    allergiesRowsPerPage,
    pastDiseasesPage,
    pastDiseasesRowsPerPage,
    medicalRecordsPage,
    medicalRecordsRowsPerPage
  ]);

  return (
    <div className='ml-4'>
      <>{relativesPage}</>
      <div className='w-full flex justify-between items-center mb-5'>
        <div className='flex gap-5'>
          <button className='text-[#0E1680]' onClick={() => router.push('/patient')}>
            <ArrowLeft />
          </button>
          <Breadcrumbs separator={<ChevronRight />} aria-label='breadcrumb'>
            {breadcrumbs}
          </Breadcrumbs>
        </div>
        <Button
          variant='contained'
          startIcon={<Calendar />}
          className='!bg-[#0E1680] hover:opacity-90'
        >
          Add new appointment
        </Button>
      </div>

      {/* Profile Section */}
      <div className='flex-col flex gap-5'>
        <GeneralInfoCard
          generalInfo={patient as UserDetail}
          updateGeneralInfo={updateGeneralInfo}
        />
        <Box className='grid grid-cols-2 gap-5'>
          <MedicalInfoCard
            medicalInfo={medicalInformation as MedicalInformation}
            updateMedicalInfo={updateMedicalInfo}
          />
          <RelativeInfoCard
            relativeInfo={patientRelatives as PatientRelative[]}
            createPatientRelative={createPatientRelative}
            deletePatientRelative={deletePatientRelative}
            pagination={{
              page: relativesPage,
              rowsPerPage: relativesRowsPerPage,
              setPage: setRelativesPage,
              setRowsPerPage: setRelativesRowsPerPage
            }}
            count={totalRelatives}
          />
        </Box>
        <MedicalHistoryCard
          medicalInfo={{
            pastDiseases: getPastDiseasesApi.data?.content as PastDisease[],
            surgicalHistories: getSurgicalHistoriesApi.data?.content as SurgicalHistory[],
            medications: getMedicationHistoriesApi.data?.content as MedicalHistory[],
            allergies: getAllergiesApi.data?.content as Allergy[],
            vaccinations: getVaccinationsApi.data?.content as Vaccination[],
            familyHistories: getFamilyHistoriesApi.data?.content as FamilyHistory[],
            createPastDisease,
            updatePastDisease,
            deletePastDisease,
            createSurgicalHistory,
            updateSurgicalHistory,
            deleteSurgicalHistory,
            createMedicationHistory,
            updateMedicationHistory,
            deleteMedicationHistory,
            createVaccination,
            updateVaccination,
            deleteVaccination,
            createFamilyHistory,
            updateFamilyHistory,
            deleteFamilyHistory,
            createAllergy,
            updateAllergy,
            deleteAllergy
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
            surgicalHistories: totalSurgicalHistories,
            vaccinations: totalVaccinations,
            familyHistories: totalFamilyHistories,
            allergies: totalAllergies,
            pastDiseases: totalPastDiseases
          }}
        />
        <MedicalRecordCard
          medicalInfo={medicalRecords as MedicalRecord[]}
          createMedicalRecord={createMedicalRecord}
          updateMedicalRecord={updateMedicalRecord}
          deleteMedicalRecord={deleteMedicalRecord}
          pagination={{
            page: medicalRecordsPage,
            rowsPerPage: medicalRecordsRowsPerPage,
            setPage: setMedicalRecordsPage,
            setRowsPerPage: setMedicalRecordsRowsPerPage
          }}
          count={totalMedicalRecords}
        />
      </div>
      {(getPatientApi.loading ||
        getMedicalInformationApi.loading ||
        getPastDiseasesApi.loading ||
        getSurgicalHistoriesApi.loading ||
        getVaccinationsApi.loading ||
        getFamilyHistoriesApi.loading ||
        getAllergiesApi.loading ||
        getMedicalRecordsApi.loading ||
        getMedicationHistoriesApi.loading ||
        getPatientRelativesApi.loading) && <LoadingProcess />}
    </div>
  );
};

export default PatientDetail;
