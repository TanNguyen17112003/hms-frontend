import React, { useEffect, useMemo, useState } from 'react';
import { Chart } from 'src/components/chart';
import { Box, Typography, FormControl, Select, Stack, InputLabel, MenuItem } from '@mui/material';
import { useResponsive } from 'src/utils/use-responsive';
import { barChartOptions, radialChartOptions } from 'src/utils/config-charts';
import { ApexOptions } from 'apexcharts';
import { AppointmentApi } from 'src/api/appointment';
import { useAuth } from '@hooks';
import { Appointment } from 'src/types/appointment';

function DashboardChart() {
  const { user } = useAuth();
  const { isMobile, isTablet } = useResponsive();

  const [appointments, setAppointments] = useState<any[]>([]);
  const [selectedType1, setSelectedType1] = useState('year');
  const [selectedMonth, setSelectedMonth] = useState('01'); // Default to January
  const [selectedType2, setSelectedType2] = useState('year');

  // Filter appointments based on user role
  const filteredAppointments = useMemo(() => {
    let filtered = appointments;

    if (user?.role === 'PATIENT') {
      filtered = filtered.filter((appointment) => appointment?.patientSsn === user?.ssn);
    } else if (user?.role === 'DOCTOR' || user?.role === 'STAFF') {
      filtered = filtered.filter((appointment) => appointment?.doctor?.id === user?.id);
    }

    if (selectedType1 === 'month') {
      filtered = filtered.filter((appointment) => {
        const appointmentDate = new Date(appointment.createAt);
        return String(appointmentDate.getMonth() + 1).padStart(2, '0') === selectedMonth;
      });
    }

    return filtered;
  }, [appointments, user?.role, selectedType1, selectedMonth]);

  // Fetch all appointments
  const fetchAllAppointments = async () => {
    try {
      const pageSize = 5;
      let currentPage = 0;
      let totalAppointments: any[] = [];
      let totalPages = 1;

      while (currentPage < totalPages) {
        const response = await AppointmentApi.getAppointments({
          page: currentPage,
          size: pageSize
        });

        totalAppointments = [...totalAppointments, ...response.content];
        totalPages = Math.ceil((response?.totalElements || 0) / pageSize);
        currentPage++;
      }

      setAppointments(totalAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  useEffect(() => {
    fetchAllAppointments();
  }, []);

  // Use filteredAppointments for chart data
  const getAppointmentsData = (type: string) => {
    const data: { [key: string]: number } = {};
    filteredAppointments.forEach((appointment: any) => {
      const date = new Date(appointment.createAt);
      const key =
        type === 'year'
          ? date.getFullYear().toString()
          : `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
              date.getDate()
            ).padStart(2, '0')}`;
      if (!data[key]) {
        data[key] = 0;
      }
      data[key]++;
    });
    return Object.entries(data).map(([key, value]) => ({ x: key, y: value }));
  };

  const getStatusData = () => {
    const statusData: { [key: string]: number } = {};
    filteredAppointments.forEach((appointment: Appointment) => {
      if (!statusData[appointment.status]) {
        statusData[appointment.status] = 0;
      }
      statusData[appointment.status]++;
    });
    return Object.entries(statusData).map(([key, value]) => ({ x: key, y: value }));
  };

  const configbarChartOptions: ApexOptions = {
    ...barChartOptions,
    xaxis: {
      categories: getAppointmentsData(selectedType1).map((data) => data.x),
      labels: {
        rotate: -45,
        formatter: (value: string) => value
      },
      title: {
        text: 'Date'
      }
    }
  };

  const barChartSeries = [
    {
      name: 'Appointments',
      data: getAppointmentsData(selectedType1).map((data) => data.y)
    }
  ];

  const configRadialChartOptions: ApexOptions = {
    ...radialChartOptions,
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: '22px'
          },
          value: {
            fontSize: '16px'
          },
          total: {
            show: true,
            label: 'Appointment',
            formatter: () => filteredAppointments.length.toString()
          }
        }
      }
    },
    labels: getStatusData().map((data) => data.x)
  };

  const radialChartSeries = getStatusData().map((data) => data.y);

  const statusColors = ['#0E1680', '#646ED8', '#CCD0F8'];

  return (
    <Stack
      direction={isMobile ? 'column' : 'row'}
      spacing={2}
      alignItems={isMobile ? '' : 'center'}
    >
      <Box flex={isTablet ? 0.55 : 0.6} className='px-5 py-3 border rounded-lg shadow-lg bg-white'>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography variant={'h6'}>Appointment</Typography>
          <Stack direction='row' spacing={2}>
            <FormControl variant='filled' size='small'>
              <InputLabel id='type-select-label'>Select Type</InputLabel>
              <Select
                labelId='type-select-label'
                value={selectedType1}
                onChange={(event) => setSelectedType1(event.target.value)}
                label='Select Type'
                defaultValue='year'
              >
                <MenuItem value='year'>Year</MenuItem>
                <MenuItem value='month'>Month</MenuItem>
              </Select>
            </FormControl>
            {selectedType1 === 'month' && (
              <FormControl variant='filled' size='small'>
                <InputLabel id='month-select-label'>Select Month</InputLabel>
                <Select
                  labelId='month-select-label'
                  value={selectedMonth}
                  onChange={(event) => setSelectedMonth(event.target.value)}
                  label='Select Month'
                  defaultValue='01'
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <MenuItem key={i} value={String(i + 1).padStart(2, '0')}>
                      {new Date(0, i).toLocaleString('default', { month: 'long' })}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Stack>
        </Stack>
        <Chart options={configbarChartOptions} series={barChartSeries} type='bar' height={250} />
      </Box>
      <Box flex={isTablet ? 0.45 : 0.4} className='px-5 py-3 border rounded-lg shadow-lg bg-white'>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography variant='h6'>Appointment Status</Typography>
          <FormControl variant='filled' size='small' className='w-1/5'>
            <InputLabel id='type-select-label'>Select Type</InputLabel>
            <Select
              labelId='type-select-label'
              value={selectedType2}
              onChange={(event) => setSelectedType2(event.target.value)}
              label='Select Type'
              defaultValue='year'
            >
              <MenuItem value='year'>Year</MenuItem>
              <MenuItem value='month'>Month</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Chart
          options={configRadialChartOptions}
          series={radialChartSeries}
          type='radialBar'
          height={250}
        />
        <Box display={'flex'} justifyContent={'center'} gap={1}>
          {getStatusData().map((data, index) => (
            <Stack direction='row' alignItems='center' spacing={1} key={index}>
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  backgroundColor: statusColors[index],
                  borderRadius: '50%'
                }}
              />
              <Typography variant='body2'>{data.x}</Typography>
            </Stack>
          ))}
        </Box>
      </Box>
    </Stack>
  );
}

export default DashboardChart;
