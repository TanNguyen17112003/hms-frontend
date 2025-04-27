import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useContext,
  ChangeEvent,
  useState
} from 'react';
import { UsersApi } from 'src/api/user';
import {
  AllergyResponse,
  FamilyHistoryResponse,
  MedicalHistoryResponse,
  MedicalRecordResponse,
  MedicalRecordsApi,
  PastDiseaseResponse,
  PatientRelativeResponse,
  PatientResponse,
  SurgicalHistoryResponse,
  VaccinationResponse
} from 'src/api/medical-record';
import useFunction, {
  DEFAULT_FUNCTION_RETURN,
  UseFunctionReturnType
} from 'src/hooks/use-function';
import { useRouter } from 'next/router';
import { Allergy } from 'src/types/allergy';
import { FamilyHistory } from 'src/types/family-history';
import { PatientRelative } from 'src/types/patient-relative';
import { MedicalHistory } from 'src/types/medical-history';
import { MedicalRecord } from 'src/types/medical-record';
import { Vaccination } from 'src/types/vaccination';
import { PastDisease } from 'src/types/past-disease';
import { SurgicalHistory } from 'src/types/surgical-history';
import { UsePaginationResult } from '@hooks';
import usePagination from 'src/hooks/use-pagination';

interface ItemFilter {
  page?: number;
  size?: number;
}

interface ContextValue {
  getAllergiesApi: UseFunctionReturnType<FormData, AllergyResponse>;
  getFamilyHistoriesApi: UseFunctionReturnType<FormData, FamilyHistoryResponse>;
  getPatientRelativesApi: UseFunctionReturnType<FormData, PatientRelativeResponse>;
  getPatientsApi: UseFunctionReturnType<FormData, PatientResponse>;
  getMedicalHistoiesApi: UseFunctionReturnType<FormData, MedicalHistoryResponse>;
  getMedicalRecordsApi: UseFunctionReturnType<FormData, MedicalRecordResponse>;
  getVaccinationsApi: UseFunctionReturnType<FormData, VaccinationResponse>;
  getPastDiseasesApi: UseFunctionReturnType<FormData, PastDiseaseResponse>;
  getSurgicalHistoriesApi: UseFunctionReturnType<FormData, SurgicalHistoryResponse>;
  allergyPagination: UsePaginationResult;
  familyHistoryPagination: UsePaginationResult;
  patientRelativePagination: UsePaginationResult;
  patientPagination: UsePaginationResult;
  medicalHistoryPagination: UsePaginationResult;
  medicalRecordPagination: UsePaginationResult;
  vaccinationPagination: UsePaginationResult;
  pastDiseasePagination: UsePaginationResult;
  surgicalHistoryPagination: UsePaginationResult;
  allergyFilter: ItemFilter;
  setAllergyFilter: (filter: ItemFilter) => void;
  familyHistoryFilter: ItemFilter;
  setFamilyHistoryFilter: (filter: ItemFilter) => void;
  patientRelativeFilter: ItemFilter;
  setPatientRelativeFilter: (filter: ItemFilter) => void;
  patientFilter: ItemFilter;
  setPatientFilter: (filter: ItemFilter) => void;
  medicalHistoryFilter: ItemFilter;
  setMedicalHistoryFilter: (filter: ItemFilter) => void;
  medicalRecordFilter: ItemFilter;
  setMedicalRecordFilter: (filter: ItemFilter) => void;
  vaccinationFilter: ItemFilter;
  setVaccinationFilter: (filter: ItemFilter) => void;
  pastDiseaseFilter: ItemFilter;
  setPastDiseaseFilter: (filter: ItemFilter) => void;
  surgicalHistoryFilter: ItemFilter;
  setSurgicalHistoryFilter: (filter: ItemFilter) => void;
}

export const UserContext = createContext<ContextValue>({
  getAllergiesApi: DEFAULT_FUNCTION_RETURN,
  getFamilyHistoriesApi: DEFAULT_FUNCTION_RETURN,
  getPatientRelativesApi: DEFAULT_FUNCTION_RETURN,
  getPatientsApi: DEFAULT_FUNCTION_RETURN,
  getMedicalHistoiesApi: DEFAULT_FUNCTION_RETURN,
  getMedicalRecordsApi: DEFAULT_FUNCTION_RETURN,
  getVaccinationsApi: DEFAULT_FUNCTION_RETURN,
  getPastDiseasesApi: DEFAULT_FUNCTION_RETURN,
  getSurgicalHistoriesApi: DEFAULT_FUNCTION_RETURN,
  allergyPagination: {
    count: 0,
    page: 0,
    rowsPerPage: 10,
    totalPages: 0,
    onPageChange: function (event: any, newPage: number): void {
      throw new Error('Function not implemented.');
    },
    onRowsPerPageChange: function (
      event: number | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void {
      throw new Error('Function not implemented.');
    }
  },
  familyHistoryPagination: {
    count: 0,
    page: 0,
    rowsPerPage: 10,
    totalPages: 0,
    onPageChange: function (event: any, newPage: number): void {
      throw new Error('Function not implemented.');
    },
    onRowsPerPageChange: function (
      event: number | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void {
      throw new Error('Function not implemented.');
    }
  },
  patientRelativePagination: {
    count: 0,
    page: 0,
    rowsPerPage: 10,
    totalPages: 0,
    onPageChange: function (event: any, newPage: number): void {
      throw new Error('Function not implemented.');
    },
    onRowsPerPageChange: function (
      event: number | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void {
      throw new Error('Function not implemented.');
    }
  },
  patientPagination: {
    count: 0,
    page: 0,
    rowsPerPage: 10,
    totalPages: 0,
    onPageChange: function (event: any, newPage: number): void {
      throw new Error('Function not implemented.');
    },
    onRowsPerPageChange: function (
      event: number | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void {
      throw new Error('Function not implemented.');
    }
  },
  medicalHistoryPagination: {
    count: 0,
    page: 0,
    rowsPerPage: 10,
    totalPages: 0,
    onPageChange: function (event: any, newPage: number): void {
      throw new Error('Function not implemented.');
    },
    onRowsPerPageChange: function (
      event: number | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void {
      throw new Error('Function not implemented.');
    }
  },
  medicalRecordPagination: {
    count: 0,
    page: 0,
    rowsPerPage: 10,
    totalPages: 0,
    onPageChange: function (event: any, newPage: number): void {
      throw new Error('Function not implemented.');
    },
    onRowsPerPageChange: function (
      event: number | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void {
      throw new Error('Function not implemented.');
    }
  },
  vaccinationPagination: {
    count: 0,
    page: 0,
    rowsPerPage: 10,
    totalPages: 0,
    onPageChange: function (event: any, newPage: number): void {
      throw new Error('Function not implemented.');
    },
    onRowsPerPageChange: function (
      event: number | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void {
      throw new Error('Function not implemented.');
    }
  },
  pastDiseasePagination: {
    count: 0,
    page: 0,
    rowsPerPage: 10,
    totalPages: 0,
    onPageChange: function (event: any, newPage: number): void {
      throw new Error('Function not implemented.');
    },
    onRowsPerPageChange: function (
      event: number | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void {
      throw new Error('Function not implemented.');
    }
  },
  surgicalHistoryPagination: {
    count: 0,
    page: 0,
    rowsPerPage: 10,
    totalPages: 0,
    onPageChange: function (event: any, newPage: number): void {
      throw new Error('Function not implemented.');
    },
    onRowsPerPageChange: function (
      event: number | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void {
      throw new Error('Function not implemented.');
    }
  },
  allergyFilter: {},
  setAllergyFilter: () => {},
  familyHistoryFilter: {},
  setFamilyHistoryFilter: () => {},
  patientRelativeFilter: {},
  setPatientRelativeFilter: () => {},
  patientFilter: {},
  setPatientFilter: () => {},
  medicalHistoryFilter: {},
  setMedicalHistoryFilter: () => {},
  medicalRecordFilter: {},
  setMedicalRecordFilter: () => {},
  vaccinationFilter: {},
  setVaccinationFilter: () => {},
  pastDiseaseFilter: {},
  setPastDiseaseFilter: () => {},
  surgicalHistoryFilter: {},
  setSurgicalHistoryFilter: () => {}
});

const UserProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const getAllergiesApi = useFunction((params: FormData) =>
    MedicalRecordsApi.getAllergies(router.query.patientId as string, params)
  );
  const getFamilyHistoriesApi = useFunction((params: FormData) =>
    MedicalRecordsApi.getFamilyHistories(router.query.patientId as string, params)
  );
  const getPatientRelativesApi = useFunction((params: FormData) =>
    MedicalRecordsApi.getPatientRelatives(router.query.patientId as string, params)
  );
  const getPatientsApi = useFunction(MedicalRecordsApi.getPatients);
  const getMedicalHistoiesApi = useFunction((params: FormData) =>
    MedicalRecordsApi.getMedicalHistories(router.query.patientId as string, params)
  );
  const getMedicalRecordsApi = useFunction((params: FormData) =>
    MedicalRecordsApi.getMedicalRecords(router.query.patientId as string, params)
  );
  const getVaccinationsApi = useFunction((params: FormData) =>
    MedicalRecordsApi.getVaccinations(router.query.patientId as string, params)
  );
  const getPastDiseasesApi = useFunction((params: FormData) =>
    MedicalRecordsApi.getPastDiseases(router.query.patientId as string, params)
  );
  const getSurgicalHistoriesApi = useFunction((params: FormData) =>
    MedicalRecordsApi.getSurgicalHistories(router.query.patientId as string, params)
  );
  const allergyPagination = usePagination({
    count: getAllergiesApi.data?.totalElements || 0
  });
  const familyHistoryPagination = usePagination({
    count: getFamilyHistoriesApi.data?.totalElements || 0
  });
  const patientRelativePagination = usePagination({
    count: getPatientRelativesApi.data?.totalElements || 0
  });
  const patientPagination = usePagination({
    count: getPatientsApi.data?.totalElements || 0
  });
  const medicalHistoryPagination = usePagination({
    count: getMedicalHistoiesApi.data?.totalElements || 0
  });
  const medicalRecordPagination = usePagination({
    count: getMedicalRecordsApi.data?.totalElements || 0
  });
  const vaccinationPagination = usePagination({
    count: getVaccinationsApi.data?.totalElements || 0
  });
  const pastDiseasePagination = usePagination({
    count: getPastDiseasesApi.data?.totalElements || 0
  });
  const surgicalHistoryPagination = usePagination({
    count: getSurgicalHistoriesApi.data?.totalElements || 0
  });

  const [allergyFilter, setAllergyFilter] = useState<ItemFilter>({});
  const [familyHistoryFilter, setFamilyHistoryFilter] = useState<ItemFilter>({});
  const [patientRelativeFilter, setPatientRelativeFilter] = useState<ItemFilter>({});
  const [patientFilter, setPatientFilter] = useState<ItemFilter>({});
  const [medicalHistoryFilter, setMedicalHistoryFilter] = useState<ItemFilter>({});
  const [medicalRecordFilter, setMedicalRecordFilter] = useState<ItemFilter>({});
  const [vaccinationFilter, setVaccinationFilter] = useState<ItemFilter>({});
  const [pastDiseaseFilter, setPastDiseaseFilter] = useState<ItemFilter>({});
  const [surgicalHistoryFilter, setSurgicalHistoryFilter] = useState<ItemFilter>({});

  useEffect(() => {
    const formData = new FormData();
    Object.entries(allergyFilter).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });
    getAllergiesApi.call(formData);
  }, [allergyFilter]);

  useEffect(() => {
    const formData = new FormData();
    Object.entries(familyHistoryFilter).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });
    getFamilyHistoriesApi.call(formData);
  }, [familyHistoryFilter]);

  useEffect(() => {
    const formData = new FormData();
    Object.entries(patientRelativeFilter).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });
    getPatientRelativesApi.call(formData);
  }, [patientRelativeFilter]);

  useEffect(() => {
    const formData = new FormData();
    Object.entries(patientFilter).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });
    getPatientsApi.call(formData);
  }, [patientFilter]);

  useEffect(() => {
    const formData = new FormData();
    Object.entries(medicalHistoryFilter).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });
    getMedicalHistoiesApi.call(formData);
  }, [medicalHistoryFilter]);

  useEffect(() => {
    const formData = new FormData();
    Object.entries(medicalRecordFilter).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });
    getMedicalRecordsApi.call(formData);
  }, [medicalRecordFilter]);

  useEffect(() => {
    const formData = new FormData();
    Object.entries(vaccinationFilter).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });
    getVaccinationsApi.call(formData);
  }, [vaccinationFilter]);

  useEffect(() => {
    const formData = new FormData();
    Object.entries(pastDiseaseFilter).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });
    getPastDiseasesApi.call(formData);
  }, [pastDiseaseFilter]);

  useEffect(() => {
    const formData = new FormData();
    Object.entries(surgicalHistoryFilter).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });
    getSurgicalHistoriesApi.call(formData);
  }, [surgicalHistoryFilter]);

  return (
    <UserContext.Provider
      value={{
        getAllergiesApi,
        getFamilyHistoriesApi,
        getPatientRelativesApi,
        getPatientsApi,
        getMedicalHistoiesApi,
        getMedicalRecordsApi,
        getVaccinationsApi,
        getPastDiseasesApi,
        getSurgicalHistoriesApi,
        allergyPagination,
        familyHistoryPagination,
        patientRelativePagination,
        patientPagination,
        medicalHistoryPagination,
        medicalRecordPagination,
        vaccinationPagination,
        pastDiseasePagination,
        surgicalHistoryPagination,
        allergyFilter,
        setAllergyFilter,
        familyHistoryFilter,
        setFamilyHistoryFilter,
        patientRelativeFilter,
        setPatientRelativeFilter,
        patientFilter,
        setPatientFilter,
        medicalHistoryFilter,
        setMedicalHistoryFilter,
        medicalRecordFilter,
        setMedicalRecordFilter,
        vaccinationFilter,
        setVaccinationFilter,
        pastDiseaseFilter,
        setPastDiseaseFilter,
        surgicalHistoryFilter,
        setSurgicalHistoryFilter
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

export default UserProvider;
