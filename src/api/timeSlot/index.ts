import { apiDelete, apiGet, apiPatch, apiPost } from 'src/utils/api-request';
import { TimeSlot } from 'src/types/appointment';
import { StaffDetail } from 'src/types/user';

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

export interface DeleteTimeSlotForDoctorRequest {
  timeSlotIds: string[];
  doctorId: string;
}

export interface CreateDoctorTimeSlotRequest {
  maxAppointments: number;
  timeSlotIds: string[];
  doctorIds: string[];
  assignedBy: string;
}

export interface TimeSlotResponse {
  week: number;
  date: string;
  availableTimeSlots: TimeSlot[];
  unavailableTimeSlots: TimeSlot[];
}

export interface TimeSlotRequest {
  week: number;
  date: string;
}

export class TimeSlotApi {
  // api related to timeslot
  static async getTimeSlots(request: TimeSlotRequest): Promise<TimeSlotResponse> {
    return await apiGet(`/api/v1/timeslots?week=${request.week}&date=${request.date}`);
  }

  static async createTimeSlot(request: CreateTimeSlotRequest): Promise<TimeSlot> {
    return await apiPost('/api/v1/timeslots', request);
  }

  static async createBulkTimeslot(request: CreateBulkTimeSlotRequest): Promise<TimeSlot[]> {
    return await apiPost('/api/v1/timeslots/bulk', request);
  }

  static async deleteTimeSlot(id: string): Promise<TimeSlot> {
    return await apiDelete(`/api/v1/timeslots/${id}`, {});
  }

  // api related to doctor timeslot
  static async getDoctorBasedOnTimeSlot(id: string): Promise<StaffDetail[]> {
    return await apiGet(`/api/v1/doctor-timeslots/${id}/doctors`);
  }

  static async createDoctorTimeSlot(request: CreateDoctorTimeSlotRequest): Promise<TimeSlot[]> {
    return await apiPost('/api/v1/doctor-timeslots', request);
  }

  static async registerTimeSlot(request: RegisterTimeSlotForDoctorRequest): Promise<TimeSlot[]> {
    return await apiPost('/api/v1/doctor-timeslots/register', request);
  }

  static async modifyTimeSlot(request: ModifyTimeSlotForDoctorRequest): Promise<TimeSlot[]> {
    return await apiPatch('/api/v1/doctor-timeslots/modify', request);
  }

  static async deleteTimeSlotForDoctor(
    request: DeleteTimeSlotForDoctorRequest
  ): Promise<TimeSlot[]> {
    return await apiPost('/api/v1/doctor-timeslots/delete', request);
  }
}
