// src/api/staff-management.ts
import { apiGet, apiPatch, apiPost } from 'src/utils/api-request';
import { Staff, StaffListResponse } from 'src/types/staff';

export class StaffManagementApi {
  static async getStaffs(params: Record<string, any>): Promise<StaffListResponse> {
    return await apiGet('/api/v1/staff', params);
  }

  static async getStaffDetail(id: string): Promise<Staff> {
    return await apiGet(`/api/v1/staff/${id}`);
  }

  static async addStaff(body: any): Promise<Staff> {
    return await apiPost(`/api/v1/staff`, body);
  }

  static async editStaff(params: { id: string; body: any }): Promise<Staff> {
    const { id, body } = params;
    return await apiPatch(`/api/v1/staff/${id}`, body);
  }
}
