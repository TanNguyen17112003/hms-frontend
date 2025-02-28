import { Schedule } from './appoitment';

type UserRole = 'ADMIN' | 'STAFF' | 'PATIENT';
type UserGender = 'MALE' | 'FEMAIL';
type WorkStatus = 'FULL_TIME' | 'PART_TIME';

interface User {
  id: string;
  photoUrl: string;
  name: string;
  email?: string;
  phone: string;
  dob: string;
  address: string;
  role: UserRole;
  SSN: string;
  gender: UserGender;
}

export interface UserDetail extends User {}

export const initialUser: UserDetail = {
  id: '',
  photoUrl: '',
  name: '',
  email: '',
  phone: '',
  dob: '',
  address: '',
  role: 'PATIENT',
  SSN: '',
  gender: 'MALE'
};

export interface PatientDetail extends UserDetail {
  job: string;
}
export interface StaffDetail extends UserDetail {
  speciality: string;
  workStatus: WorkStatus;
  qualification: string;
  licenseNumber: string;
  patients: PatientDetail[];
  schedule: Schedule[];
}
