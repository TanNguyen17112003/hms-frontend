import { apiDelete, apiGet, apiPatch, apiPost, apiPut, getFormData } from 'src/utils/api-request';
import CookieHelper, { CookieKeys } from 'src/utils/cookie-helper';
import { Appointment, AppointmentDetail } from 'src/types/appointment';

export class AppointmentApi {
  // static async getAppointments(request: {}): Promise<AppointmentDetail[]> {
  //   const response = await apiGet('/appointments', getFormData(request));
  //   return response;
  // }

  static async getAppointments(params: Record<string, any>): Promise<any> {
    return await apiGet('/api/v1/appointments', params);
  }
}
