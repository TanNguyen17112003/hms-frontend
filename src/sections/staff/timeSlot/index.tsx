import { Box, Button, Stack, Tab, Tabs } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import AdvancedFilter from 'src/components/advanced-filter/advanced-filter';
import { useTimeSlotContext } from 'src/contexts/timeSlot/timeSlot-context';
import getTimeSlotManagementTableConfig from 'src/sections/admin/timeSlot/timeSlot-management-table-config';
import { CustomTable } from '@components';
import usePagination from 'src/hooks/use-pagination';
import { TimeSlot } from 'src/types/appointment';
import { getCurrentWeekOfYear } from 'src/utils/format-time-currency';
import { Filter } from 'src/types/filter';
import ContentHeader from 'src/components/content-header';
import { useAuth } from '@hooks';
import { UserDetail } from 'src/types/user';
import { useDialog } from '@hooks';
import { TimeSlotApi } from 'src/api/timeSlot';
import TimeSlotRegisterDialog from './timeSlot-register-dialog';
import useFunction from 'src/hooks/use-function';
import getDoctorTimeslotResponseItemOwnedManagementTableConfig from './timeSlotOwned-management-table-config';

function StaffTimeSlotManagement() {
  const { user } = useAuth();

  const [weekValue, setWeekValue] = useState<number>(getCurrentWeekOfYear());
  const listDateOfWeek = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];
  const [dateValue, setDateValue] = useState<string>(listDateOfWeek[0]);
  const timeSlotRegisterDialog = useDialog<TimeSlot>();

  const handleRegisterTimeSlot = useCallback(async () => {
    try {
      await TimeSlotApi.registerTimeSlot({
        maxAppointmentsPerTimeSlot: timeSlotRegisterDialog.data?.totalMaxAppointment as number,
        timeSlotIds: [timeSlotRegisterDialog.data?.id as string],
        doctorId: user?.id as string
      });
    } catch (error) {
      throw error;
    }
  }, [timeSlotRegisterDialog.data]);

  const tabs = [
    {
      label: 'All Timeslots',
      key: 'all'
    },
    {
      label: 'My Timeslots',
      key: 'owned'
    }
  ];

  const filters: Filter[] = [
    {
      type: 'number',
      title: 'Week',
      value: weekValue,
      onChange: (value: number) => setWeekValue(value)
    },
    {
      type: 'select',
      title: 'Date of Week',
      value: dateValue,
      onChange: (value: string) => setDateValue(value),
      options: listDateOfWeek.map((day) => ({
        label: day,
        value: day
      }))
    }
  ];

  const [tab, setTab] = React.useState(tabs[0].key);

  const timeSlotManagementTableConfig = getTimeSlotManagementTableConfig({
    onClickRemove: (data) => console.log('Remove', data),
    onClickAssign: (data) => timeSlotRegisterDialog.handleOpen(data),
    user: user as UserDetail,
    isDoctorOwned: tab === 'all'
  });

  const ownedTimeSlotManagementTableConfig =
    getDoctorTimeslotResponseItemOwnedManagementTableConfig({
      onClickRemove: (data) => console.log('Remove', data),
      onClickAssign: (data) => console.log('Assign', data)
    });
  const { getTimeSlotListApi, timeSlotFilter, setTimeSlotFilter } = useTimeSlotContext();
  const getOwnedTimeSlotListApi = useFunction(TimeSlotApi.getDoctorTimeSlots);

  const ownedTimeSlots = useMemo(() => {
    return getOwnedTimeSlotListApi.data || null;
  }, [getOwnedTimeSlotListApi.data]);

  const timeSlots = useMemo(() => {
    return getTimeSlotListApi.data || null;
  }, [getTimeSlotListApi.data]);

  const availableTimeSlots = useMemo(() => {
    return timeSlots?.availableTimeSlots;
  }, [timeSlots]);

  const unAvailableTimeSlots = useMemo(() => {
    return timeSlots?.unavailableTimeSlots;
  }, [timeSlots]);

  const results = useMemo(() => {
    if (tab === 'all') {
      return availableTimeSlots;
    } else if (tab === 'owned') {
      return unAvailableTimeSlots;
    }
    return null;
  }, [tab, availableTimeSlots, unAvailableTimeSlots]);

  const timeSlotPagination = usePagination({
    count: results?.length || 0
  });

  const ownedTimeSlotPagination = usePagination({
    count: ownedTimeSlots?.length || 0
  });

  useEffect(() => {
    setTimeSlotFilter({
      ...timeSlotFilter,
      week: weekValue,
      date: dateValue
    });
  }, [weekValue, dateValue]);

  useEffect(() => {
    getOwnedTimeSlotListApi.call(user?.id as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);
  return (
    <Stack spacing={2}>
      <ContentHeader title={'TimeSlot Managemment'} />
      <Box paddingX={4} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
        <Tabs
          value={tab}
          onChange={(_, value) => setTab(value)}
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: 'blue'
            },
            '& .MuiTab-root': {
              color: 'blue',
              '&.Mui-selected': {
                color: 'blue'
              }
            }
          }}
        >
          {tabs.map((tab) => (
            <Tab key={tab.key} label={tab.label} value={tab.key} />
          ))}
        </Tabs>
        <AdvancedFilter filters={filters} />
      </Box>
      <Box className='px-4'>
        {tab === 'owned' && (
          <CustomTable
            rows={ownedTimeSlots || []}
            configs={ownedTimeSlotManagementTableConfig}
            pagination={ownedTimeSlotPagination}
          />
        )}
        {tab === 'all' && (
          <CustomTable
            rows={results || []}
            configs={timeSlotManagementTableConfig}
            pagination={timeSlotPagination}
          />
        )}
      </Box>
      <TimeSlotRegisterDialog
        open={timeSlotRegisterDialog.open}
        timeSlot={timeSlotRegisterDialog.data as TimeSlot}
        onClose={timeSlotRegisterDialog.handleClose}
        onConfirm={handleRegisterTimeSlot}
      />
    </Stack>
  );
}

export default StaffTimeSlotManagement;
