import { createContext, ReactNode, useCallback, useEffect, useContext } from 'react';
import { AppointmentApi, AppointmentRequest } from 'src/api/appointment';
import useFunction, {
  DEFAULT_FUNCTION_RETURN,
  UseFunctionReturnType
} from 'src/hooks/use-function';
import { AppointmentDetail } from 'src/types/appointment';
import { useAuth } from '@hooks';

interface ContextValue {
  // getListAppointmentsApi: UseFunctionReturnType<FormData, AppointmentDetail[]>;
  getAppointmentListApi: UseFunctionReturnType<Record<string, any>, any>;
}

export const AppointmentContext = createContext<ContextValue>({
  // getListAppointmentsApi: DEFAULT_FUNCTION_RETURN,
  getAppointmentListApi: DEFAULT_FUNCTION_RETURN
});

const AppointmentProvider = ({ children }: { children: ReactNode }) => {
  // const getListAppointmentsApi = useFunction(AppointmentApi.getAppointments);
  const getAppointmentListApi = useFunction(AppointmentApi.getAppointments);

  useEffect(() => {
    getAppointmentListApi.call(new FormData());
  }, []);

  return (
    <AppointmentContext.Provider
      value={{
        // getListAppointmentsApi,
        getAppointmentListApi
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointmentContext = () => useContext(AppointmentContext);

export default AppointmentProvider;
