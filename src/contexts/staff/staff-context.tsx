import { createContext, ReactNode, useCallback, useEffect, useContext } from 'react';
import { StaffManagementApi } from 'src/api/staff-management';
import useFunction, {
  DEFAULT_FUNCTION_RETURN,
  UseFunctionReturnType
} from 'src/hooks/use-function';
import { Staff, StaffListResponse } from 'src/types/staff';
import { useAuth } from '@hooks';

interface ContextValue {
  getListStaffsApi: UseFunctionReturnType<Record<string, any>, StaffListResponse>;
  getStaffDetail: UseFunctionReturnType<string, Staff>;
}
export const StaffContext = createContext<ContextValue>({
  getListStaffsApi: DEFAULT_FUNCTION_RETURN,
  getStaffDetail: DEFAULT_FUNCTION_RETURN
});

const StaffProvider = ({ children }: { children: ReactNode }) => {
  const getListStaffsApi = useFunction(StaffManagementApi.getStaffs);
  const getStaffDetail = useFunction(StaffManagementApi.getStaffDetail);

  const { user } = useAuth();

  // useEffect(() => {
  //   if (user?.role === 'ADMIN') {
  //     getListStaffsApi.call({ page: 1, size: 100 });
  //   }
  // }, [user]);

  return (
    <StaffContext.Provider
      value={{
        getListStaffsApi,
        getStaffDetail
      }}
    >
      {children}
    </StaffContext.Provider>
  );
};

export const useStaffContext = () => useContext(StaffContext);

export default StaffProvider;
