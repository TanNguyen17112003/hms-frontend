export interface Staff {
  id: string;
  fullName: string;
  email: string;
  ssn: string;
  dateOfBirth: string;
  sex: string;
  phoneNumber: string;
  nationality: string;
  address: string;
  biography: string;
  role: string;
  startWorkingDate: string;
  status: string;
  createdAt: string | null;
  lastLoginAt: string | null;
  licenseNumber: string;
  qualification: string;
  department: string;
  specializations: string[];
  services: string[];
}

export const initialStaff: Staff = {
  id: '',
  fullName: '',
  email: '',
  ssn: '',
  dateOfBirth: '',
  sex: '',
  phoneNumber: '',
  nationality: '',
  address: '',
  biography: '',
  role: 'STAFF',
  startWorkingDate: '',
  status: 'ACTIVE',
  createdAt: null,
  lastLoginAt: null,
  licenseNumber: '',
  qualification: '',
  department: '',
  specializations: [],
  services: []
};

export interface StaffListResponse {
  content: Staff[];
  last: boolean;
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}
