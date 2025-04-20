import { createContext, ReactNode, useCallback, useEffect, useContext, useState } from 'react';
import { AppointmentApi, AppointmentRequest, AppointmentResponse } from 'src/api/appointment';
import useFunction, {
  DEFAULT_FUNCTION_RETURN,
  UseFunctionReturnType
} from 'src/hooks/use-function';
import { AppointmentDetail, AppointmentFilter } from 'src/types/appointment';
import { useAuth } from '@hooks';
import { ChangeEvent } from 'react';
import { UsePaginationResult } from '@hooks';
import usePagination from 'src/hooks/use-pagination';

interface ContextValue {
  getAppointmentListApi: UseFunctionReturnType<FormData, AppointmentResponse>;
  appointmentPagination: UsePaginationResult;
  appointmentFilter: AppointmentFilter;
  setAppointmentFilter: (filter: AppointmentFilter) => void;
}

export const AppointmentContext = createContext<ContextValue>({
  getAppointmentListApi: DEFAULT_FUNCTION_RETURN,
  appointmentPagination: {
    count: 0,
    page: 0,
    rowsPerPage: 10,
    totalPages: 0,
    onPageChange: function (event: any, newPage: number): void {
      throw new Error('Function not implemented.');
    },
    onRowsPerPageChange: function (
      event: number | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void {
      throw new Error('Function not implemented.');
    }
  },
  appointmentFilter: {},
  setAppointmentFilter: () => {}
});

const AppointmentProvider = ({ children }: { children: ReactNode }) => {
  const getAppointmentListApi = useFunction(AppointmentApi.getAppointments);
  const [appointmentFilter, setAppointmentFilter] = useState<AppointmentFilter>({});
  const appointmentPagination = usePagination({
    count: getAppointmentListApi.data?.totalElements || 0
  });

  useEffect(() => {
    const formData = new FormData();
    Object.entries(appointmentFilter).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key === 'size' || key === 'page') {
          formData.append(key, value.toString());
        } else {
          if (key === 'filters') {
            value.forEach((filter: any) => {
              const value = `${filter.property}:${filter.rule}:${filter.value}`;
              formData.append('filter', value);
            });
          } else {
            formData.append(key, value.toString());
          }
        }
      }
    });
    getAppointmentListApi.call(formData);
  }, [appointmentFilter]);

  return (
    <AppointmentContext.Provider
      value={{
        getAppointmentListApi,
        appointmentPagination,
        appointmentFilter,
        setAppointmentFilter
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointmentContext = () => useContext(AppointmentContext);

export default AppointmentProvider;
