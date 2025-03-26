import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { useAuth } from 'src/hooks/use-auth';
import { getDashboardAdminConfigs } from './dashboard-admin-configs';
import { getDashboardPatientConfigs } from './dashboard-patient-configs';
import { getDashboardStaffConfigs } from './dashboard-staff-config';

export interface DashboardItem {
  disabled?: boolean;
  external?: boolean;
  icon?: ReactNode;
  items?: DashboardItem[];
  label?: ReactNode;
  path?: string;
  title: string;
}

export interface Section {
  items: DashboardItem[];
  subheader?: string;
}

export const useSections = () => {
  const { user } = useAuth();

  return useMemo(() => {
    return user?.role === 'PATIENT'
      ? getDashboardPatientConfigs()
      : user?.role === 'STAFF'
        ? getDashboardStaffConfigs()
        : getDashboardAdminConfigs();
  }, [user]);
};
