import { createContext, ReactNode, useCallback, useEffect, useContext, useState } from 'react';
import {
  AppointmentApi,
  AppointmentAssignRequest,
  AppointmentRequest,
  AppointmentResponse
} from 'src/api/appointment';
import useFunction, {
  DEFAULT_FUNCTION_RETURN,
  UseFunctionReturnType
} from 'src/hooks/use-function';
import { AppointmentDetail, AppointmentFilter, AppointmentStatus } from 'src/types/appointment';
import { useAuth } from '@hooks';
import { ChangeEvent } from 'react';
import { UsePaginationResult } from '@hooks';
import usePagination from 'src/hooks/use-pagination';

interface ContextValue {
  getAppointmentListApi: UseFunctionReturnType<FormData, AppointmentResponse>;
  appointmentPagination: UsePaginationResult;
  appointmentFilter: AppointmentFilter;
  setAppointmentFilter: (filter: AppointmentFilter) => void;
  rejectAppointment: (id: string) => Promise<void>;
  approveAppointment: (id: string) => Promise<void>;
  cancelAppointment: (id: string) => Promise<void>;
  completeAppointment: (id: string) => Promise<void>;
  rescheduleAppointment: (id: string, timeslotId: string) => Promise<void>;
  assignAppointment: (request: AppointmentAssignRequest) => Promise<void>;
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
  setAppointmentFilter: () => {},
  rejectAppointment: async () => {},
  approveAppointment: async () => {},
  cancelAppointment: async () => {},
  completeAppointment: async () => {},
  rescheduleAppointment: async () => {},
  assignAppointment: async () => {}
});

const AppointmentProvider = ({ children }: { children: ReactNode }) => {
  const getAppointmentListApi = useFunction(AppointmentApi.getAppointments);
  const [appointmentFilter, setAppointmentFilter] = useState<AppointmentFilter>({});
  const appointmentPagination = usePagination({
    count: getAppointmentListApi.data?.totalElements || 0
  });

  const rejectAppointment = useCallback(
    async (id: string) => {
      try {
        const response = await AppointmentApi.rejectAppointment(id);
        if (response) {
          getAppointmentListApi.setData({
            ...getAppointmentListApi.data,
            content: (getAppointmentListApi.data?.content || []).map((appointment) => {
              if (appointment.id === id) {
                return { ...appointment, status: 'REJECTED' as AppointmentStatus };
              }
              return appointment;
            })
          });
        }
      } catch (error) {
        throw error;
      }
    },
    [getAppointmentListApi]
  );

  const approveAppointment = useCallback(
    async (id: string) => {
      try {
        const response = await AppointmentApi.acceptAppointment(id);
        if (response) {
          getAppointmentListApi.setData({
            ...getAppointmentListApi.data,
            content: (getAppointmentListApi.data?.content || []).map((appointment) => {
              if (appointment.id === id) {
                return { ...appointment, status: 'ACCEPTED' as AppointmentStatus };
              }
              return appointment;
            })
          });
        }
      } catch (error) {
        throw error;
      }
    },
    [getAppointmentListApi]
  );

  const cancelAppointment = useCallback(
    async (id: string) => {
      try {
        const response = await AppointmentApi.cancelAppointment(id);
        if (response) {
          getAppointmentListApi.setData({
            ...getAppointmentListApi.data,
            content: (getAppointmentListApi.data?.content || []).map((appointment) => {
              if (appointment.id === id) {
                return { ...appointment, status: 'CANCELLED' as AppointmentStatus };
              }
              return appointment;
            })
          });
        }
      } catch (error) {
        throw error;
      }
    },
    [getAppointmentListApi]
  );

  const completeAppointment = useCallback(
    async (id: string) => {
      try {
        const response = await AppointmentApi.completeAppointment(id);
        if (response) {
          getAppointmentListApi.setData({
            ...getAppointmentListApi.data,
            content: (getAppointmentListApi.data?.content || []).map((appointment) => {
              if (appointment.id === id) {
                return { ...appointment, status: 'COMPLETED' as AppointmentStatus };
              }
              return appointment;
            })
          });
        }
      } catch (error) {
        throw error;
      }
    },
    [getAppointmentListApi]
  );

  const rescheduleAppointment = useCallback(
    async (id: string, timeslotId: string) => {
      try {
        const response = await AppointmentApi.rescheduleAppointment(id, timeslotId);
        if (response) {
          getAppointmentListApi.setData({
            ...getAppointmentListApi.data,
            content: (getAppointmentListApi.data?.content || []).map((appointment) => {
              if (appointment.id === id) {
                return { ...appointment, status: 'RESCHEDULED' as AppointmentStatus };
              }
              return appointment;
            })
          });
        }
      } catch (error) {
        throw error;
      }
    },
    [getAppointmentListApi]
  );

  const assignAppointment = useCallback(
    async (request: AppointmentAssignRequest) => {
      try {
        const response = await AppointmentApi.assignAppointment(request);
        if (response) {
          getAppointmentListApi.setData({
            ...getAppointmentListApi.data,
            content: (getAppointmentListApi.data?.content || []).map((appointment) => {
              if (appointment.id === request.appointmentId) {
                return {
                  ...appointment,
                  status: 'PENDING' as AppointmentStatus,
                  doctor: response.doctor
                };
              }
              return appointment;
            })
          });
        }
      } catch (error) {
        throw error;
      }
    },
    [getAppointmentListApi]
  );

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
  }, []);

  return (
    <AppointmentContext.Provider
      value={{
        getAppointmentListApi,
        appointmentPagination,
        appointmentFilter,
        setAppointmentFilter,
        rejectAppointment,
        approveAppointment,
        cancelAppointment,
        completeAppointment,
        rescheduleAppointment,
        assignAppointment
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointmentContext = () => useContext(AppointmentContext);

export default AppointmentProvider;
