import { Staff } from 'src/types/staff';

export const departments = [
  'Emergency Department',
  'Internal Medicine',
  'Surgery',
  'Pediatrics',
  'Obstetrics and Gynecology',
  'Cardiology',
  'Neurology',
  'Oncology',
  'Radiology',
  'Pathology',
  'Psychiatry',
  'Anesthesiology',
  'Pharmacy',
  'Rehabilitation Services',
  'Dermatology',
  'Ophthalmology',
  'Otolaryngology',
  'Urology',
  'Geriatrics',
  'Dental Department'
];

export const statuses = ['ACTIVE', 'INACTIVE'];

export const sexes = ['MALE', 'FEMALE'];

export const roles = ['ADMIN', 'DOCTOR', 'NURSE'];

export const defaultStaffFilters = {
  status: '',
  role: '',
  sex: '',
  department: ''
};

export const defaultStaff: Staff = {
  fullName: '',
  email: '',
  ssn: '',
  dateOfBirth: '',
  sex: '',
  phoneNumber: '',
  nationality: '',
  address: '',
  biography: '',
  role: '',
  startWorkingDate: '',
  status: 'ACTIVE',
  licenseNumber: '',
  qualification: '',
  department: '',
  specializations: [],
  services: [],
  id: '',
  createdAt: null,
  lastLoginAt: null
};
