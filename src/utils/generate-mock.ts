import { UserDetail, PatientDetail, StaffDetail, initialUser } from '../types/user';
import {
  Appointment,
  TimeSlot,
  Schedule,
  AppointmentStatus,
  TimeSlotStatus,
  AppointmentType
} from '../types/appointment';
import { v4 as uuidv4 } from 'uuid';

const appointmentStatusList: AppointmentStatus[] = ['DECLINED', 'PENDING', 'COMPLETED'];
const timeSlotStatusList: TimeSlotStatus[] = ['AVAILABLE', 'BOOKED'];
const appointmentTypeList: AppointmentType[] = ['INITIAL', 'FOLLOW_UP'];

const generateRandomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const generateRandomTimeSlot = (): TimeSlot => {
  const startTime = generateRandomDate(new Date(), new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
  const endTime = new Date(startTime.getTime() + 30 * 60 * 1000); // 30 minutes slot
  return {
    id: uuidv4(),
    startTime: startTime.toISOString(),
    endTime: endTime.toISOString(),
    status: timeSlotStatusList[Math.floor(Math.random() * timeSlotStatusList.length)],
    date: startTime.toISOString().split('T')[0]
  };
};

const generatePatients = (): PatientDetail[] => {
  const patients: PatientDetail[] = [];
  for (let i = 0; i < 10; i++) {
    patients.push({
      ...initialUser,
      id: uuidv4(),
      name: `Patient ${i + 1}`,
      photoUrl:
        'https://static.vecteezy.com/system/resources/previews/027/245/520/original/male-3d-avatar-free-png.png',
      phone: `123456789${i}`,
      dob: generateRandomDate(new Date(1970, 0, 1), new Date(2000, 0, 1)).toISOString(),
      address: `Address ${i + 1}`,
      email: `patient${i + 1}@gmail.com`,
      role: 'PATIENT',
      SSN: `SSN${i + 1}`,
      gender: i % 2 === 0 ? 'MALE' : 'FEMALE',
      job: `Job ${i + 1}`
    });
  }
  return patients;
};

const generateDoctors = (patients: PatientDetail[]): StaffDetail[] => {
  const doctors: StaffDetail[] = [];
  for (let i = 0; i < 10; i++) {
    const schedule: Schedule[] = [];
    for (let j = 0; j < 7; j++) {
      schedule.push({
        id: uuidv4(),
        staffId: uuidv4(),
        timeSlots: Array.from({ length: 8 }, generateRandomTimeSlot)
      });
    }
    doctors.push({
      ...initialUser,
      id: uuidv4(),
      name: `Doctor ${i + 1}`,
      phone: `987654321${i}`,
      photoUrl:
        'https://static.vecteezy.com/system/resources/previews/027/245/520/original/male-3d-avatar-free-png.png',
      dob: generateRandomDate(new Date(1960, 0, 1), new Date(1990, 0, 1)).toISOString(),
      address: `Address ${i + 1}`,
      role: 'STAFF',
      SSN: `SSN${i + 1}`,
      gender: i % 2 === 0 ? 'MALE' : 'FEMALE',
      speciality: `Speciality ${i + 1}`,
      workStatus: i % 2 === 0 ? 'FULL_TIME' : 'PART_TIME',
      qualification: `Qualification ${i + 1}`,
      licenseNumber: `License${i + 1}`,
      patients: patients.slice(0, Math.floor(Math.random() * patients.length)),
      schedule
    });
  }
  return doctors;
};

const generateAppointments = (patients: PatientDetail[], doctors: StaffDetail[]): Appointment[] => {
  const appointments: Appointment[] = [];
  doctors.forEach((doctor) => {
    doctor.schedule.forEach((schedule) => {
      schedule.timeSlots.forEach((timeSlot) => {
        if (timeSlot.status === 'AVAILABLE') {
          const patient = patients[Math.floor(Math.random() * patients.length)];
          const randomDate = generateRandomDate(
            new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            new Date()
          );
          appointments.push({
            id: uuidv4(),
            staffId: doctor.id,
            userId: patient.id,
            timeSlot,
            notes: `Appointment notes for ${patient.name} with ${doctor.name}`,
            status: appointmentStatusList[Math.floor(Math.random() * appointmentStatusList.length)],
            type: appointmentTypeList[Math.floor(Math.random() * appointmentTypeList.length)],
            createdAt: generateRandomDate(new Date(2015, 0, 1), new Date(2025, 0, 1)).toISOString(),
            reason: `Reason for appointment ${Math.floor(Math.random() * 100)}`
          });
          timeSlot.status = 'BOOKED';
        }
      });
    });
  });
  return appointments;
};

const patients = generatePatients();
const doctors = generateDoctors(patients);
const appointments = generateAppointments(patients, doctors);

export { patients, doctors, appointments };
