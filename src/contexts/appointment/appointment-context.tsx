import { createContext, ReactNode, useCallback, useEffect, useContext } from 'react';
import { AppointmentApi } from 'src/api/appointment';
import useFunction, {
  DEFAULT_FUNCTION_RETURN,
  UseFunctionReturnType
} from 'src/hooks/use-function';
import { AppointmentDetail } from 'src/types/appointment';
import { useAuth } from '@hooks';

interface ContextValue {
  getListAppointmentsApi: UseFunctionReturnType<FormData, AppointmentDetail[]>;
}

export const AppointmentContext = createContext<ContextValue>({
  getListAppointmentsApi: DEFAULT_FUNCTION_RETURN
});

const AppointmentProvider = ({ children }: { children: ReactNode }) => {
  const getListAppointmentsApi = useFunction(AppointmentApi.getAppointments);

  const { user } = useAuth();

  useEffect(() => {
    if (user?.role === 'ADMIN') {
      getListAppointmentsApi.call(new FormData());
    }
  }, [user]);

  return (
    <AppointmentContext.Provider
      value={{
        getListAppointmentsApi
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointmentContext = () => useContext(AppointmentContext);

export default AppointmentProvider;
