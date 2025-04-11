// src/api/staff-management.ts
import { apiGet } from 'src/utils/api-request';
import { Staff, StaffListResponse } from 'src/types/staff';

export class StaffManagementApi {
  static async getStaffs(params: Record<string, any>): Promise<StaffListResponse> {
    return await apiGet('/api/v1/staff', params);
  }

  static async getStaffDetail(id: string): Promise<Staff> {
    return await apiGet(`/api/v1/staff/${id}`);
  }
}
