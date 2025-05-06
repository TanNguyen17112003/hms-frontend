import { Staff } from './staff';
import { StaffDetail } from './user';

export type AppointmentStatus =
  | 'REJECTED'
  | 'PENDING'
  | 'COMPLETED'
  | 'ACCEPTED'
  | 'RESCHEDULED'
  | 'CANCELLED';
export type TimeSlotStatus = 'AVAILABLE' | 'BOOKED';
export type AppointmentType = 'FIRST_VISIT' | 'FOLLOW_UP';

export interface Appointment {
  id: string;
  doctor: Staff;
  date: string;
  patientSsn: string;
  timeSlot: TimeSlot;
  notes?: string;
  status: AppointmentStatus;
  type: AppointmentType;
  createdAt: string;
  reason?: string;
  note: string[];
}

export interface AppointmentFormProps {
  notes?: File;
  reason?: string;
  type: AppointmentType;
  timeSlotId: string;
  date: string;
}

export const initialAppointmentFormValues: AppointmentFormProps = {
  notes: undefined,
  reason: '',
  type: 'FIRST_VISIT',
  timeSlotId: '',
  date: ''
};

interface TimeDetails {
  hour: number;
  minute: number;
  second: number;
  nano: number;
}

export interface TimeSlot {
  id: string;
  week: number;
  startTime: string;
  endTime: string;
  totalMaxAppointment: number;
  date: string;
}

export interface AppointmentFilter {
  filters?: {
    property: string;
    rule: string;
    value: string;
  }[];
  sort?: string[];
  page?: number;
  size?: number;
}

export interface AppointmentDetail extends Appointment {}
