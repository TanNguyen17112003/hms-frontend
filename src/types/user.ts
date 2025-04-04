import { Schedule } from './appointment';

type UserRole = 'ADMIN' | 'STAFF' | 'PATIENT';
type UserGender = 'MALE' | 'FEMALE';
type WorkStatus = 'FULL_TIME' | 'PART_TIME';

export interface User {
  id: string;
  photoUrl?: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  dob?: string;
  address?: string;
  role: UserRole;
  ssn: string;
  gender?: UserGender;
  nationality?: string;
  occupation?: string;
  maritalStatus?: string;
  createdAt?: string;
  lastLoginAt?: string;
}

export interface UserDetail extends User {}

export const initialUser: UserDetail = {
  id: '',
  photoUrl: '',
  fullName: '',
  email: '',
  phoneNumber: '',
  dob: '',
  address: '',
  role: 'PATIENT',
  ssn: '',
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

export interface PatientData {
  id: string;
  name: string;
  email: string;
  date: Date;
  age: number;
  diseases: string;
  status: string;
  role: UserRole;
  sex: UserGender;
  phoneNumber: string;
  address: string;
  dob: string;
  governmentId: string;
  hospitalId: string;
}
