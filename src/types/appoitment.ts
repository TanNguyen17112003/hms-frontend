type AppointmentStatus = 'AVAILABLE' | 'BOOKED' | 'BLOCKED';
export interface Appointment {
  id: string;
  staffId: string;
  userId: string;
  timeSlot: TimeSlot;
  notes?: string;
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
}

export interface Schedule {
  id: string;
  staffId: string;
  date: string;
  timeSlots: TimeSlot[];
}
