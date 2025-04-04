export type AppointmentStatus = 'DECLINED' | 'PENDING' | 'COMPLETED';
export type TimeSlotStatus = 'AVAILABLE' | 'BOOKED';
export type AppointmentType = 'FIRST_VISIT' | 'FOLLOW_UP';
export interface Appointment {
  id: string;
  staffId?: string;
  date: string;
  userId: string;
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
    startTime: '',
    endTime: '',
    status: 'AVAILABLE',
    date: ''
  },
  date: String(new Date())
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  status?: TimeSlotStatus;
  date: string;
}

export interface Schedule {
  id: string;
  staffId: string;
  timeSlots: TimeSlot[];
}

export interface AppointmentDetail extends Appointment {}
