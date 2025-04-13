import { apiDelete, apiGet, apiPatch, apiPost, apiPut, getFormData } from 'src/utils/api-request';
import CookieHelper, { CookieKeys } from 'src/utils/cookie-helper';
import { Appointment, AppointmentDetail, AppointmentType } from 'src/types/appointment';

// Interface related to TimeSlot
export interface CreateTimeSlotRequest {
  week: number;
  date: string;
  startTime: string;
  endTime: string;
  maxAppointmentPerTimeSLot: number;
}

export interface CreateBulkTimeSlotRequest {
  week: number;
  date: string[];
  startTime: string;
  endTime: string;
  durationMinutes: number;
  maxAppointmentPerTimeSLot: number;
}

// interface related to doctor time slot

export interface DistributeTimeSlotForDoctorRequest {
  maxAppointmentsPerTimeSlot: number;
  timeSlotIds: string[];
}

export interface ModifyTimeSlotForDoctorRequest {
  doctorId: string;
  doctorTimeSlotIds: string[];
  maxAppointment: number;
}

export interface RegisterTimeSlotForDoctorRequest {
  doctorId: string;
  timeSlotIds: string[];
  maxAppointmentsPerTimeSlot: number;
}

export interface CreateDoctorTimeSlotRequest {
  maxAppointments: number;
  timeSlotIds: string;
  doctorIds: string[];
}

export class TimeSlotApi {
  // api related to appointment
  static async getTimeSlots(week: number, date: string) {
    return await apiGet(`/api/v1/timeslots?week=${week}&date=${date}`);
  }
}
