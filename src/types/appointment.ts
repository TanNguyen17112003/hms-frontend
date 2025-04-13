import { StaffDetail } from './user';

export type AppointmentStatus = 'DECLINED' | 'PENDING' | 'COMPLETED';
export type TimeSlotStatus = 'AVAILABLE' | 'BOOKED';
export type AppointmentType = 'FIRST_VISIT' | 'FOLLOW_UP';

export interface Appointment {
  id: string;
  doctor: StaffDetail;
  date: string;
  patientAccountId: string;
  timeSlot: TimeSlot;
  notes?: string;
  status: AppointmentStatus;
  type: AppointmentType;
  createdAt: string;
  reason?: string;
}

export interface AppointmentFormProps {
  notes?: File;
  reason?: string;
  type: AppointmentType;
  timeSlot: TimeSlot;
  date: string;
}

export const initialAppointmentFormValues: AppointmentFormProps = {
  notes: undefined,
  reason: '',
  type: 'FIRST_VISIT',
  timeSlot: {
    id: '',
    week: 0,
    startTime: {
      hour: 0,
      minute: 0,
      second: 0,
      nano: 0
    },
    endTime: {
      hour: 0,
      minute: 0,
      second: 0,
      nano: 0
    },
    totalMaxAppointment: 0,
    date: ''
  },
  date: String(new Date())
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
  startTime: TimeDetails;
  endTime: TimeDetails;
  totalMaxAppointment: number;
  date: string;
}

export interface AppointmentDetail extends Appointment {}
