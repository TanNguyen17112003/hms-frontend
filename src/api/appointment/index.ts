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
  patientAccountId: string;
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
  // static async getAppointments(request: {}): Promise<AppointmentDetail[]> {
  //   const response = await apiGet('/appointments', getFormData(request));
  //   return response;
  // }
  static async uploadFile(request: FileUploadRequest): Promise<FileUploadResponse> {
    return await apiPost('/api/v1/files/upload/single', getFormData(request));
  }

  static async uploadMultipleFiles(
    request: MultipleFileUploadRequest
  ): Promise<MultipleFileUploadResponse> {
    return await apiPost('/api/v1/files/upload/many', getFormData(request));
  }
  static async getAppointments(params: Record<string, any>): Promise<any> {
    return await apiGet('/api/v1/appointments', params);
  }

  static async createAppointment(request: AppointmentRequest): Promise<any> {
    return await apiPost('/api/v1/appointments', request);
  }

  static async assignAppointment(request: AppointmentAssignRequest): Promise<any> {
    return await apiPost('/api/v1/appointments/assign', request);
  }

  static async getDetailAppointment(id: string): Promise<AppointmentDetail> {
    return await apiGet(`/api/v1/appointments/${id}`);
  }

  static async rescheduleAppointment(id: string): Promise<any> {
    return await apiGet(`/api/v1/appointments/reschedule/${id}`);
  }

  static async cancelAppointment(id: string): Promise<any> {
    return await apiGet(`/api/v1/appointments/cancel/${id}`);
  }

  static async completeAppointment(id: string): Promise<any> {
    return await apiGet(`/api/v1/appointments/complete/${id}`);
  }

  static async declineAppointment(id: string): Promise<any> {
    return await apiGet(`/api/v1/appointments/decline/${id}`);
  }

  static async acceptAppointment(id: string): Promise<any> {
    return await apiGet(`/api/v1/appointments/accept/${id}`);
  }
}
