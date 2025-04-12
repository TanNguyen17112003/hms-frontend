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
  addStaff: UseFunctionReturnType<any, Staff>;
  editStaff: UseFunctionReturnType<{ id: string; body: any }, Staff>;
}
export const StaffContext = createContext<ContextValue>({
  getListStaffsApi: DEFAULT_FUNCTION_RETURN,
  getStaffDetail: DEFAULT_FUNCTION_RETURN,
  addStaff: DEFAULT_FUNCTION_RETURN,
  editStaff: DEFAULT_FUNCTION_RETURN
});

const StaffProvider = ({ children }: { children: ReactNode }) => {
  const getListStaffsApi = useFunction(StaffManagementApi.getStaffs);
  const getStaffDetail = useFunction(StaffManagementApi.getStaffDetail);
  const addStaff = useFunction(StaffManagementApi.addStaff);
  const editStaff = useFunction(StaffManagementApi.editStaff);

  // const { user } = useAuth();

  // useEffect(() => {
  //   if (user?.role === 'ADMIN') {
  //     getListStaffsApi.call({ page: 1, size: 100 });
  //   }
  // }, [user]);

  return (
    <StaffContext.Provider
      value={{
        getListStaffsApi,
        getStaffDetail,
        addStaff,
        editStaff
      }}
    >
      {children}
    </StaffContext.Provider>
  );
};

export const useStaffContext = () => useContext(StaffContext);

export default StaffProvider;
