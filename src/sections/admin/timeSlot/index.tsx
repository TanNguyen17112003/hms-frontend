import { Box, Button, Stack, Tab, Tabs } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import AdvancedFilter from 'src/components/advanced-filter/advanced-filter';
import { useTimeSlotContext } from 'src/contexts/timeSlot/timeSlot-context';
import getTimeSlotManagementTableConfig from './timeSlot-management-table-config';
import { CustomTable } from '@components';
import usePagination from 'src/hooks/use-pagination';
import { TimeSlot } from 'src/types/appointment';
import { getCurrentWeekOfYear } from 'src/utils/format-time-currency';
import { Filter } from 'src/types/filter';
import ContentHeader from 'src/components/content-header';
import { Add } from 'iconsax-react';
import TimeSlotAddDialogg from './timeSlot-add-dialog';
import { useAuth, useDialog } from '@hooks';
import useFunction from 'src/hooks/use-function';
import { LoadingProcess } from '@components';
import TimeSlotAssignDialog from './timeSlot-assign-dialog';
import { TimeSlotApi } from 'src/api/timeSlot';
import { UserDetail } from 'src/types/user';

function AdminTimeSlotManagement() {
  const { user } = useAuth();
  const { deleteTimeSlot } = useTimeSlotContext();
  const handleDeleteTimeSlot = useCallback(
    async (id: string) => {
      try {
        await deleteTimeSlot(id);
      } catch (error) {
        console.error('Error deleting time slot:', error);
      }
    },
    [deleteTimeSlot]
  );

  const handleDeleteTimeSlotHelper = useFunction(handleDeleteTimeSlot, {
    successMessage: 'Delete time slot successfully!'
  });

  const timeSlotAddDialog = useDialog();
  const timeSlotAssignDialog = useDialog<TimeSlot>();

  const timeSlotManagementTableConfig = getTimeSlotManagementTableConfig({
    onClickRemove: (data) => handleDeleteTimeSlotHelper.call(data.id as string),
    onClickAssign: (data) => timeSlotAssignDialog.handleOpen(data),
    user: user as UserDetail,
    isDoctorOwned: false
  });

  const [weekValue, setWeekValue] = useState<number>(getCurrentWeekOfYear());
  const listDateOfWeek = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];
  const [dateValue, setDateValue] = useState<string>(listDateOfWeek[0]);

  const tabs = [
    {
      label: 'Available',
      key: 'available'
    },
    {
      label: 'Unavailable',
      key: 'unavailable'
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

  const { getTimeSlotListApi, timeSlotFilter, setTimeSlotFilter } = useTimeSlotContext();
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
    if (tab === 'available') {
      return availableTimeSlots;
    } else if (tab === 'unavailable') {
      return unAvailableTimeSlots;
    }
    return null;
  }, [tab, availableTimeSlots, unAvailableTimeSlots]);

  const timeSlotPagination = usePagination({
    count: results?.length || 0
  });

  useEffect(() => {
    setTimeSlotFilter({
      ...timeSlotFilter,
      week: weekValue,
      date: dateValue
    });
  }, [weekValue, dateValue]);
  return (
    <>
      <ContentHeader
        title={'TimeSlot Managemment'}
        rightSection={
          <Button
            variant='contained'
            startIcon={<Add />}
            onClick={() => timeSlotAddDialog.handleOpen()}
          >
            Add TimeSlot
          </Button>
        }
        isInComponent
      />
      <Stack spacing={2} mt={2}>
        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
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
        <CustomTable
          rows={results || []}
          configs={timeSlotManagementTableConfig}
          pagination={timeSlotPagination}
        />
      </Stack>
      <TimeSlotAddDialogg open={timeSlotAddDialog.open} onClose={timeSlotAddDialog.handleClose} />
      <TimeSlotAssignDialog
        timeSlot={timeSlotAssignDialog.data as TimeSlot}
        open={timeSlotAssignDialog.open}
        onClose={timeSlotAssignDialog.handleClose}
      />
      {(handleDeleteTimeSlotHelper.loading || getTimeSlotListApi.loading) && <LoadingProcess />}
    </>
  );
}

export default AdminTimeSlotManagement;
