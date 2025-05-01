type UserRole = 'ADMIN' | 'STAFF' | 'PATIENT' | 'DOCTOR';
type UserGender = 'MALE' | 'FEMALE';
type StaffStatus = 'ACTIVE' | 'INACTIVE';

export interface User {
  id: string;
  photoUrl?: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth?: string;
  address?: string;
  role: UserRole;
  ssn: string;
  sex?: UserGender;
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
  dateOfBirth: '',
  address: '',
  role: 'PATIENT',
  ssn: '',
  sex: 'MALE'
};

export interface PatientDetail extends UserDetail {}
export interface StaffDetail extends UserDetail {
  status: StaffStatus;
  startWorkingDate: string;
  department: string;
  services: string[];
  biography: string;
  specializations: string[];
  qualification: string;
  licenseNumber: string;
  patients?: PatientDetail[];
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
  dateOfBirth: string;
  governmentId: string;
  hospitalId: string;
}
