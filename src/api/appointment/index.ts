import { apiDelete, apiGet, apiPatch, apiPost, apiPut, getFormData } from 'src/utils/api-request';
import CookieHelper, { CookieKeys } from 'src/utils/cookie-helper';
import { Appointment, AppointmentDetail, AppointmentType } from 'src/types/appointment';

// Interface Related to Appointment
export interface AppointmentRequest {
  date: string;
  type: AppointmentType;
  reason: string;
  notes: string[];
  timeSlotId: string;
  patientSsn: string;
}

export interface AppointmentResponse {
  content: Appointment[];
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

export interface AppointmentAssignRequest {
  appointmentId: string;
  doctorId: string;
}

interface FileUploadRequest {
  file: File;
}

interface FileUploadResponse {
  url: string;
}

interface MultipleFileUploadRequest {
  files: File[];
}

interface MultipleFileUploadResponse {
  urls: string[];
}

export class AppointmentApi {
  static async uploadFile(request: FileUploadRequest): Promise<FileUploadResponse> {
    return await apiPost('/api/v1/files/upload/single', getFormData(request));
  }

  static async uploadMultipleFiles(
    request: MultipleFileUploadRequest
  ): Promise<MultipleFileUploadResponse> {
    return await apiPost('/api/v1/files/upload/many', getFormData(request));
  }
  static async getAppointments(params: Record<string, any>): Promise<AppointmentResponse> {
    return await apiGet('/api/v1/appointments', params);
  }

  static async getAppointment(id: string): Promise<Appointment> {
    return await apiGet(`/api/v1/appointments/${id}/detail`);
  }

  static async createAppointment(request: AppointmentRequest): Promise<any> {
    return await apiPost('/api/v1/appointments', request);
  }

  static async assignAppointment(request: AppointmentAssignRequest): Promise<AppointmentDetail> {
    return await apiPost('/api/v1/appointments/assign', request);
  }

  static async getDetailAppointment(id: string): Promise<AppointmentDetail> {
    return await apiGet(`/api/v1/appointments/${id}`);
  }

  static async rescheduleAppointment(id: string, timeSlotId: string): Promise<any> {
    return await apiPatch(`/api/v1/appointments/${id}/reschedule?timeslot=${timeSlotId}`, {});
  }

  static async cancelAppointment(id: string): Promise<any> {
    return await apiPatch(`/api/v1/appointments/${id}/cancel`, {});
  }

  static async completeAppointment(id: string): Promise<any> {
    return await apiPatch(`/api/v1/appointments/${id}/complete`, {});
  }

  static async rejectAppointment(id: string): Promise<any> {
    return await apiPatch(`/api/v1/appointments/${id}/reject`, {});
  }

  static async acceptAppointment(id: string): Promise<any> {
    return await apiPatch(`/api/v1/appointments/${id}/accept`, {});
  }
}
