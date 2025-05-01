import { createContext, ReactNode, useCallback, useEffect, useContext, useState } from 'react';
import {
  CreateTimeSlotRequest,
  TimeSlotApi,
  TimeSlotRequest,
  TimeSlotResponse
} from 'src/api/timeSlot';
import useFunction, {
  DEFAULT_FUNCTION_RETURN,
  UseFunctionReturnType
} from 'src/hooks/use-function';
import { useAuth } from '@hooks';
import { getCurrentWeekOfYear } from 'src/utils/format-time-currency';
import { TimeSlot } from 'src/types/appointment';

export const initialTimSlotFilter: TimeSlotRequest = {
  week: getCurrentWeekOfYear(),
  date: 'MONDAY'
};

interface ContextValue {
  getTimeSlotListApi: UseFunctionReturnType<TimeSlotRequest, TimeSlotResponse>;
  timeSlotFilter: TimeSlotRequest;
  setTimeSlotFilter: (filter: TimeSlotRequest) => void;
  createTimeSlot: (request: CreateTimeSlotRequest) => Promise<void>;
  deleteTimeSlot: (timeSlotId: string) => Promise<void>;
}

export const TimeSlotContext = createContext<ContextValue>({
  getTimeSlotListApi: DEFAULT_FUNCTION_RETURN,
  timeSlotFilter: initialTimSlotFilter,
  setTimeSlotFilter: () => {},
  createTimeSlot: async () => {},
  deleteTimeSlot: async () => {}
});

const TimeSlotProvider = ({ children }: { children: ReactNode }) => {
  const getTimeSlotListApi = useFunction(TimeSlotApi.getTimeSlots);
  const [timeSlotFilter, setTimeSlotFilter] = useState<TimeSlotRequest>(initialTimSlotFilter);
  const createTimeSlot = useCallback(
    async (request: CreateTimeSlotRequest) => {
      const response = await TimeSlotApi.createTimeSlot(request);
      if (response) {
        getTimeSlotListApi.setData({
          ...getTimeSlotListApi.data,
          week: getTimeSlotListApi.data?.week || request.week,
          date: getTimeSlotListApi.data?.date || request.date,
          availableTimeSlots: [...(getTimeSlotListApi.data?.availableTimeSlots || []), response],
          unavailableTimeSlots: getTimeSlotListApi.data?.unavailableTimeSlots || []
        });
      }
    },
    [getTimeSlotListApi]
  );

  const deleteTimeSlot = useCallback(
    async (timeSlotId: string) => {
      const response = await TimeSlotApi.deleteTimeSlot(timeSlotId);
      if (response) {
        getTimeSlotListApi.setData({
          ...getTimeSlotListApi.data,
          week: getTimeSlotListApi.data?.week || timeSlotFilter.week,
          date: getTimeSlotListApi.data?.date || timeSlotFilter.date,
          availableTimeSlots:
            getTimeSlotListApi.data?.availableTimeSlots.filter(
              (timeSlot: TimeSlot) => timeSlot.id !== timeSlotId
            ) || [],
          unavailableTimeSlots: getTimeSlotListApi.data?.unavailableTimeSlots || []
        });
      }
    },
    [getTimeSlotListApi, timeSlotFilter]
  );

  useEffect(() => {
    getTimeSlotListApi.call(timeSlotFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeSlotFilter]);

  return (
    <TimeSlotContext.Provider
      value={{
        getTimeSlotListApi,
        timeSlotFilter,
        setTimeSlotFilter,
        createTimeSlot,
        deleteTimeSlot
      }}
    >
      {children}
    </TimeSlotContext.Provider>
  );
};

export const useTimeSlotContext = () => useContext(TimeSlotContext);

export default TimeSlotProvider;
