import React from 'react';
import { Chart } from 'src/components/chart';
import { Box, Typography, FormControl, Select, Stack, InputLabel, MenuItem } from '@mui/material';
import { useResponsive } from 'src/utils/use-responsive';
import { appointments } from 'src/utils/generate-mock';
import { barChartOptions, radialChartOptions } from 'src/utils/config-charts';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

function DashboardChart() {
  const [selectedType1, setSelectedType1] = React.useState('year');
  const [selectedType2, setSelectedType2] = React.useState('year');
  const { isMobile, isTablet, isDesktop } = useResponsive();

  const getAppointmentsData = (type: string) => {
    const data: { [key: string]: number } = {};
    appointments.forEach((appointment) => {
      const date = new Date(appointment.createdAt);
      const key =
        type === 'year'
          ? date.getFullYear().toString()
          : `${date.getFullYear()}-${date.getMonth() + 1}`;
      if (!data[key]) {
        data[key] = 0;
      }
      data[key]++;
    });
    return Object.entries(data).map(([key, value]) => ({ x: key, y: value }));
  };

  const getStatusData = () => {
    const statusData: { [key: string]: number } = {};
    appointments.forEach((appointment) => {
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
      categories: getAppointmentsData(selectedType1).map((data) => data.x)
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
            formatter: () => appointments.length.toString()
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
          <Typography variant={'h6'}>Doctor appointment</Typography>
          <FormControl variant='filled' size='small' className='w-1/5'>
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
