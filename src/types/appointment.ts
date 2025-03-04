export type AppointmentStatus = 'DECLINED' | 'PENDING' | 'COMPLETED';
export type TimeSlotStatus = 'AVAILABLE' | 'BOOKED';
export type AppointmentType = 'INITIAL' | 'FOLLOW_UP';
export interface Appointment {
  id: string;
  staffId?: string;
  userId: string;
  timeSlot: TimeSlot;
  notes?: string;
  status: AppointmentStatus;
  type: AppointmentType;
  createdAt: string;
  reason?: string;
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
