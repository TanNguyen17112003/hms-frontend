import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import type { Page as PageType } from 'src/types/page';
import AppointmentProvider from 'src/contexts/appointment/appointment-context';
import UserProvider from 'src/contexts/user/user-context';
import { Box, Stack } from '@mui/material';
import { useAuth } from '@hooks';
import ContentHeader from 'src/components/content-header';
import DateRangePickerTextField from 'src/components/date-range-picker-textfield';
import { DateRangeProps } from 'src/types/date-range';
import { useCallback, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import DashboardHome from 'src/sections/admin';

const Page: PageType = () => {
  const { user } = useAuth();
  const [dateRange, setDateRange] = useState<DateRangeProps>({
    startDate: null,
    endDate: null
  });
  const handleDateRangeChange = useCallback((dateRange: DateRangeProps) => {
    setDateRange(dateRange);
  }, []);
  return (
    <Box className='h-auto'>
      <ContentHeader
        title={'Dashboard'}
        rightSection={
          <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <Box display={'flex'} gap={1}>
              <Box className='border p-1 border-gray-200 rounded-md cursor-pointer'>
                <ChevronLeft color='gray' />
              </Box>
              <Box className='border p-1 border-gray-200 rounded-md cursor-pointer'>
                <ChevronRight color='gray' />
              </Box>
            </Box>
            <DateRangePickerTextField
              initialDateRange={{
                startDate: dateRange.startDate ?? undefined,
                endDate: dateRange.endDate ?? undefined
              }}
              onChange={(dateRange) => handleDateRangeChange(dateRange as DateRangeProps)}
              labelHolder='Date Filter'
            />
          </Stack>
        }
      />
      <DashboardHome />
    </Box>
  );
};
Page.getLayout = (page) => (
  <DashboardLayout>
    <AppointmentProvider>
      <UserProvider>{page}</UserProvider>
    </AppointmentProvider>
  </DashboardLayout>
);

export default Page;
