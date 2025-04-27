import { Allergy } from 'src/types/allergy';
import { FamilyHistory } from 'src/types/family-history';
import { MedicalHistory } from 'src/types/medical-history';
import { MedicalInformation } from 'src/types/medical-information';
import { MedicalRecord } from 'src/types/medical-record';
import { PastDisease } from 'src/types/past-disease';
import { PatientRelative } from 'src/types/patient-relative';
import { SurgicalHistory } from 'src/types/surgical-history';
import type { StaffDetail, User, UserDetail } from 'src/types/user';
import { Vaccination } from 'src/types/vaccination';
import { apiDelete, apiGet, apiPatch, apiPost, apiPut, getFormData } from 'src/utils/api-request';

// Interfaces related to medical information management
export interface MedicalInfomationRequest
  extends Pick<MedicalInformation, 'height' | 'weight' | 'bloodType' | 'bloodPressure'> {}

// Interface related to allergy management
export interface AllergyRequest extends Pick<Allergy, 'allergen' | 'severity' | 'notes'> {}

export interface AllergyResponse {
  content: Allergy[];
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
  };
  size?: number;
  sort?: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  totalElements?: number;
  totalPages?: number;
}

// Interface related to family history management
export interface FamilyHistoryRequest
  extends Pick<FamilyHistory, 'relative' | 'condition' | 'notes'> {}

export interface FamilyHistoryResponse {
  content: FamilyHistory[];
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
  };
  size?: number;
  sort?: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  totalElements?: number;
  totalPages?: number;
}

// Interface related to patient relative management
export interface PatientRelativeRequest
  extends Pick<PatientRelative, 'fullName' | 'relationship' | 'phoneNumber'> {}

export interface PatientRelativeResponse {
  content: PatientRelative[];
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
  };
  size?: number;
  sort?: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  totalElements?: number;
  totalPages?: number;
}

// Interface related to patient management
export interface UpdatePatientRequest
  extends Partial<
    Pick<
      User,
      | 'fullName'
      | 'ssn'
      | 'phoneNumber'
      | 'dateOfBirth'
      | 'address'
      | 'sex'
      | 'nationality'
      | 'occupation'
      | 'maritalStatus'
    >
  > {}

export interface CreatePatientRequest {
  patientInfo: UpdatePatientRequest;
  medicalInfo: MedicalInfomationRequest;
}

export interface PatientItemResponse {
  patient: UserDetail;
  latestMedicalRecord: {
    id: string;
    symptoms: string;
    diagnoses: string;
    treatments: string;
    notes: string;
    patientId: string;
    patientName: string;
    doctorId: string;
    doctorName: string;
    createdAt: string;
  };
}

export interface PatientResponse {
  content: PatientItemResponse[];
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
  };
  size?: number;
  sort?: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  totalElements?: number;
  totalPages?: number;
}
// Interface related to medical history management
export interface MedicalHistoryRequest
  extends Pick<
    MedicalHistory,
    'name' | 'dosage' | 'frequency' | 'startDate' | 'endDate' | 'notes'
  > {}

export interface MedicalHistoryResponse {
  content: MedicalHistory[];
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
  };
  size?: number;
  sort?: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  totalElements?: number;
  totalPages?: number;
}

// Interface related to medical record management
export interface MedicalRecordRequest
  extends Pick<MedicalRecord, 'symptoms' | 'diagnoses' | 'treatments' | 'notes' | 'doctorId'> {}

export interface MedicalRecordResponse {
  content: MedicalRecord[];
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
  };
  size?: number;
  sort?: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  totalElements?: number;
  totalPages?: number;
}

// Interface related to vaccination management
export interface VaccinationRequest extends Pick<Vaccination, 'name' | 'date' | 'notes'> {}

export interface VaccinationResponse {
  content: Vaccination[];
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
  };
  size?: number;
  sort?: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  totalElements?: number;
  totalPages?: number;
}

// Interface related to past disease management
export interface PastDiseaseRequest extends Pick<PastDisease, 'name' | 'notes'> {}

export interface PastDiseaseResponse {
  content: PastDisease[];
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
  };
  size?: number;
  sort?: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  totalElements?: number;
  totalPages?: number;
}

// Interface related to surgical history
export interface SurgicalHistoryRequest extends Pick<SurgicalHistory, 'name' | 'year' | 'notes'> {}

export interface SurgicalHistoryResponse {
  content: SurgicalHistory[];
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
  };
  size?: number;
  sort?: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  totalElements?: number;
  totalPages?: number;
}

export class MedicalRecordsApi {
  // Api related to medical information management

  static async getMedicalInformation(patientId: string): Promise<MedicalInformation> {
    return await apiGet(`/api/v1/patients/${patientId}/medical-infor`);
  }

  static async updateMedicalInformation(
    patientId: string,
    request: MedicalInfomationRequest
  ): Promise<MedicalInformation> {
    return await apiPut(`/api/v1/patients/${patientId}/medical-infor`, request);
  }

  // Api related to allergy management

  static async getAllergies(patientId: string, params: FormData): Promise<AllergyResponse> {
    return await apiGet(`/api/v1/patients/${patientId}/allergies`, params);
  }

  static async getAllergy(patientId: string, allergyId: string): Promise<Allergy> {
    return await apiGet(`/api/v1/patients/${patientId}/allergies/${allergyId}`);
  }

  static async createAllergy(patientId: string, request: AllergyRequest): Promise<Allergy> {
    return await apiPost(`/api/v1/patients/${patientId}/allergies`, request);
  }

  static async updateAllergy(
    patientId: string,
    allergyId: string,
    request: AllergyRequest
  ): Promise<Allergy> {
    return await apiPut(`/api/v1/patients/${patientId}/allergies/${allergyId}`, request);
  }

  static async deleteAllergy(patientId: string, allergyId: string): Promise<void> {
    return await apiDelete(`/api/v1/patients/${patientId}/allergies/${allergyId}`, {});
  }

  // Api related to family history management

  static async getFamilyHistories(
    patientId: string,
    params: FormData
  ): Promise<FamilyHistoryResponse> {
    return await apiGet(`/api/v1/patients/${patientId}/family-histories`, params);
  }

  static async getFamilyHistory(
    patientId: string,
    familyHistoryId: string
  ): Promise<FamilyHistory> {
    return await apiGet(`/api/v1/patients/${patientId}/family-histories/${familyHistoryId}`);
  }

  static async createFamilyHistory(
    patientId: string,
    request: FamilyHistoryRequest
  ): Promise<FamilyHistory> {
    return await apiPost(`/api/v1/patients/${patientId}/family-histories`, request);
  }

  static async updateFamilyHistory(
    patientId: string,
    familyHistoryId: string,
    request: FamilyHistoryRequest
  ): Promise<FamilyHistory> {
    return await apiPut(
      `/api/v1/patients/${patientId}/family-histories/${familyHistoryId}`,
      request
    );
  }

  static async deleteFamilyHistory(patientId: string, familyHistoryId: string): Promise<void> {
    return await apiDelete(`/api/v1/patients/${patientId}/family-histories/${familyHistoryId}`, {});
  }

  // Api related to patient relative management
  static async getPatientRelatives(
    patientId: string,
    params: FormData
  ): Promise<PatientRelativeResponse> {
    return await apiGet(`/api/v1/patients/${patientId}/relatives`, params);
  }

  static async getPatientRelative(patientId: string, relativeId: string): Promise<PatientRelative> {
    return await apiGet(`/api/v1/patients/${patientId}/relatives/${relativeId}`);
  }

  static async createPatientRelative(
    patientId: string,
    request: PatientRelativeRequest
  ): Promise<PatientRelative> {
    return await apiPost(`/api/v1/patients/${patientId}/relatives`, request);
  }

  static async updatePatientRelative(
    patientId: string,
    relativeId: string,
    request: PatientRelativeRequest
  ): Promise<PatientRelative> {
    return await apiPut(`/api/v1/patients/${patientId}/relatives/${relativeId}`, request);
  }

  static async deletePatientRelative(patientId: string, relativeId: string): Promise<void> {
    return await apiDelete(`/api/v1/patients/${patientId}/relatives/${relativeId}`, {});
  }

  // Api related to patient management
  static async getPatient(patientId: string): Promise<UserDetail> {
    return await apiGet(`/api/v1/patients/${patientId}`);
  }

  static async updatePatient(
    patientId: string,
    request: UpdatePatientRequest
  ): Promise<UserDetail> {
    return await apiPut(`/api/v1/patients/${patientId}`, request);
  }

  static async createPatient(request: CreatePatientRequest): Promise<UserDetail> {
    return await apiPost(`/api/v1/patients`, request);
  }

  static async getPatients(params: FormData): Promise<PatientResponse> {
    return await apiGet(`/api/v1/patients`, params);
  }

  // Api related to medical history management

  static async getMedicalHistories(
    patientId: string,
    params: FormData
  ): Promise<MedicalHistoryResponse> {
    return await apiGet(`/api/v1/patients/${patientId}/medical-histories`, params);
  }

  static async getMedicalHistory(
    patientId: string,
    medicalHistoryId: string
  ): Promise<MedicalHistory> {
    return await apiGet(`/api/v1/patients/${patientId}/medical-histories/${medicalHistoryId}`);
  }

  static async createMedicalHistory(
    patientId: string,
    request: MedicalHistoryRequest
  ): Promise<MedicalHistory> {
    return await apiPost(`/api/v1/patients/${patientId}/medical-histories`, request);
  }

  static async updateMedicalHistory(
    patientId: string,
    medicalHistoryId: string,
    request: MedicalHistoryRequest
  ): Promise<MedicalHistory> {
    return await apiPut(
      `/api/v1/patients/${patientId}/medical-histories/${medicalHistoryId}`,
      request
    );
  }

  static async deleteMedicalHistory(patientId: string, medicalHistoryId: string): Promise<void> {
    return await apiDelete(
      `/api/v1/patients/${patientId}/medical-histories/${medicalHistoryId}`,
      {}
    );
  }

  // Api related to medical record management
  static async getMedicalRecords(
    patientId: string,
    params: FormData
  ): Promise<MedicalRecordResponse> {
    return await apiGet(`/api/v1/patients/${patientId}/medical-records`, params);
  }

  static async getMedicalRecord(
    patientId: string,
    medicalRecordId: string
  ): Promise<MedicalRecord> {
    return await apiGet(`/api/v1/patients/${patientId}/medical-records/${medicalRecordId}`);
  }

  static async createMedicalRecord(
    patientId: string,
    request: MedicalRecordRequest
  ): Promise<MedicalRecord> {
    return await apiPost(`/api/v1/patients/${patientId}/medical-records`, request);
  }

  static async updateMedicalRecord(
    patientId: string,
    medicalRecordId: string,
    request: MedicalRecordRequest
  ): Promise<MedicalRecord> {
    return await apiPut(
      `/api/v1/patients/${patientId}/medical-records/${medicalRecordId}`,
      request
    );
  }

  static async deleteMedicalRecord(patientId: string, medicalRecordId: string): Promise<void> {
    return await apiDelete(`/api/v1/patients/${patientId}/medical-records/${medicalRecordId}`, {});
  }

  // Api related to vaccination management
  static async getVaccinations(patientId: string, params: FormData): Promise<VaccinationResponse> {
    return await apiGet(`/api/v1/patients/${patientId}/vaccinations`, params);
  }

  static async getVaccination(patientId: string, vaccinationId: string): Promise<Vaccination> {
    return await apiGet(`/api/v1/patients/${patientId}/vaccinations/${vaccinationId}`);
  }

  static async createVaccination(
    patientId: string,
    request: VaccinationRequest
  ): Promise<Vaccination> {
    return await apiPost(`/api/v1/patients/${patientId}/vaccinations`, request);
  }

  static async updateVaccination(
    patientId: string,
    vaccinationId: string,
    request: VaccinationRequest
  ): Promise<Vaccination> {
    return await apiPut(`/api/v1/patients/${patientId}/vaccinations/${vaccinationId}`, request);
  }

  static async deleteVaccination(patientId: string, vaccinationId: string): Promise<void> {
    return await apiDelete(`/api/v1/patients/${patientId}/vaccinations/${vaccinationId}`, {});
  }

  // Api related to past disease management
  static async getPastDiseases(patientId: string, params: FormData): Promise<PastDiseaseResponse> {
    return await apiGet(`/api/v1/patients/${patientId}/past-diseases`, params);
  }

  static async getPastDisease(patientId: string, pastDiseaseId: string): Promise<PastDisease> {
    return await apiGet(`/api/v1/patients/${patientId}/past-diseases/${pastDiseaseId}`);
  }

  static async createPastDisease(
    patientId: string,
    request: PastDiseaseRequest
  ): Promise<PastDisease> {
    return await apiPost(`/api/v1/patients/${patientId}/past-diseases`, request);
  }

  static async updatePastDisease(
    patientId: string,
    pastDiseaseId: string,
    request: PastDiseaseRequest
  ): Promise<PastDisease> {
    return await apiPut(`/api/v1/patients/${patientId}/past-diseases/${pastDiseaseId}`, request);
  }

  static async deletePastDisease(patientId: string, pastDiseaseId: string): Promise<void> {
    return await apiDelete(`/api/v1/patients/${patientId}/past-diseases/${pastDiseaseId}`, {});
  }

  // Api related to surgical history management
  static async getSurgicalHistories(
    patientId: string,
    params: FormData
  ): Promise<SurgicalHistoryResponse> {
    return await apiGet(`/api/v1/patients/${patientId}/surgical-history`, params);
  }

  static async getSurgicalHistory(
    patientId: string,
    surgicalHistoryId: string
  ): Promise<SurgicalHistory> {
    return await apiGet(`/api/v1/patients/${patientId}/surgical-history/${surgicalHistoryId}`);
  }

  static async createSurgicalHistory(
    patientId: string,
    request: SurgicalHistoryRequest
  ): Promise<SurgicalHistory> {
    return await apiPost(`/api/v1/patients/${patientId}/surgical-history`, request);
  }

  static async updateSurgicalHistory(
    patientId: string,
    surgicalHistoryId: string,
    request: SurgicalHistoryRequest
  ): Promise<SurgicalHistory> {
    return await apiPut(
      `/api/v1/patients/${patientId}/surgical-history/${surgicalHistoryId}`,
      request
    );
  }

  static async deleteSurgicalHistory(patientId: string, surgicalHistoryId: string): Promise<void> {
    return await apiDelete(
      `/api/v1/patients/${patientId}/surgical-history/${surgicalHistoryId}`,
      {}
    );
  }
}
