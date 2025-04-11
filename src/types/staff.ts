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
  createdAt: Date;
  lastLoginAt: Date;
  licenseNumber: string;
  qualification: string;
  department: string;
  specializations: string[];
  services: string[];
}

export interface StaffListResponse {
  content: Staff[];
  last: boolean;
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}
