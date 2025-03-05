import React from 'react';
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
import { normalize } from 'path';

interface PatientProfileCardProps {
  patientName: string;
  patientOld: string;
  patientSexual: string;
  patientEmail: string;
  patientPhone: string;
  patientDateOfBirth: string;
  patientDiseases: string;
  patientBloodPressure: string;
  patientHeight: string;
  patientWeight: string;
  patientHeartRate: string;
}

const PatientProfileCard: React.FC<PatientProfileCardProps> = (props) => {
  const {
    patientName,
    patientOld,
    patientSexual,
    patientEmail,
    patientPhone,
    patientDateOfBirth,
    patientDiseases,
    patientBloodPressure,
    patientHeight,
    patientWeight,
    patientHeartRate
  } = props;

  return (
    <Card className='w-[500px] lg:p-4 '>
      <CardContent className='p-4 lg:flex lg:flex-col lg:justify-center md:flex md:flex-row md:justify-center' style = {{ justifyContent: 'normal', padding: 0, margin: 0}}>
        {/* Profile Section */}
        <Box className='flex flex-col items-center mb-4 md:mr-4 lg:mr-0'>
          {/* Profile Image with Blue Tick */}
          <Box className='relative mb-4'>
            <Box
              component='img'
              src='/ui/PatientDetail/avt-photo-blue-tick.png'
              alt={`${patientName}'s profile`}
              className='w-24 h-24 rounded-full object-cover'
            />
          </Box>

          {/* Patient Name and Basic Info */}
          <Box className='text-center'>
            <Typography variant='h5' className='font-bold' sx={{ color: '#101828', mb: 1 }}>
              {patientName}
            </Typography>
            <Typography variant='subtitle1' sx={{ color: '#475467' }}>
              {`${patientOld} Years, ${patientSexual}`}
            </Typography>
          </Box>
        </Box>
        <Divider style={{marginBottom: 10}} color='gray' />
        {/* Contact and Medical Info */}
        <Box className='grid grid-cols-2 gap-4 mb-4'>
          <Box>
            <Typography variant='body2' sx={{ color: '#475467', mb: 1 }}>
              Email
            </Typography>
            <Typography variant='body1' sx={{ color: '#101828' }}>
              {patientEmail}
            </Typography>
          </Box>
          <Box>
            <Typography variant='body2' sx={{ color: '#475467', mb: 1 }}>
              Phone
            </Typography>
            <Typography variant='body1' sx={{ color: '#101828' }}>
              {patientPhone}
            </Typography>
          </Box>
          <Box>
            <Typography variant='body2' sx={{ color: '#475467', mb: 1 }}>
              Date of Birth
            </Typography>
            <Typography variant='body1' sx={{ color: '#101828' }}>
              {patientDateOfBirth}
            </Typography>
          </Box>
          <Box>
            <Typography variant='body2' sx={{ color: '#475467', mb: 1 }}>
              Diseases
            </Typography>
            <Typography variant='body1' sx={{ color: '#101828' }}>
              {patientDiseases}
            </Typography>
          </Box>
        </Box>

        <Divider style={{marginBottom: 10}} color='gray' />

        {/* Vital Stats */}
        <Box className='grid grid-cols-2 gap-4'>
          {/* Blood Pressure */}
          <Box className='bg-blue-50 p-3 rounded-lg'>
            <Typography
              variant='body2'
              sx={{
                color: '#475467',
                mb: 1
              }}
            >
              Blood Pressure
            </Typography>
            <Box className='flex items-center justify-between mb-1'>
              <Typography
                variant='body2'
                sx={{
                  color: '#101828',
                  fontWeight: 'bold'
                }}
              >
                30%
              </Typography>
              <Box className='w-full bg-blue-100 rounded-full h-2 ml-2'>
                <Box className='bg-blue-500 h-2 rounded-full' style={{ width: '30%' }}></Box>
              </Box>
            </Box>
            <Box className='flex justify-end items-center'>
              <Typography
                variant='body1'
                sx={{
                  color: '#101828',
                  fontWeight: 'bold'
                }}
              >
                {patientBloodPressure}
              </Typography>
            </Box>
          </Box>

          {/* Heart Rate Unit */}
          <Box className='bg-blue-50 p-3 rounded-lg'>
            <Typography
              variant='body2'
              sx={{
                color: '#475467',
                mb: 1
              }}
            >
              Heart Rate
            </Typography>
            <Box className='flex items-center justify-between mb-1'>
              <Typography
                variant='body2'
                sx={{
                  color: '#101828',
                  fontWeight: 'bold'
                }}
              >
                30%
              </Typography>
              <Box className='w-full bg-blue-100 rounded-full h-2 ml-2'>
                <Box className='bg-blue-500 h-2 rounded-full' style={{ width: '30%' }}></Box>
              </Box>
            </Box>
            <Box className='flex justify-end items-center'>
              <Typography
                variant='body1'
                sx={{
                  color: '#101828',
                  fontWeight: 'bold'
                }}
              >
                {patientHeartRate}
              </Typography>
            </Box>
          </Box>

          {/* Body Height */}
          <Box className='bg-blue-50 p-3 rounded-lg'>
            <Typography
              variant='body2'
              sx={{
                color: '#475467',
                mb: 1
              }}
            >
              Body Height
            </Typography>
            <Box className='flex items-center justify-between mb-1'>
              <Typography
                variant='body2'
                sx={{
                  color: '#101828',
                  fontWeight: 'bold'
                }}
              >
                30%
              </Typography>
              <Box className='w-full bg-blue-100 rounded-full h-2 ml-2'>
                <Box className='bg-blue-500 h-2 rounded-full' style={{ width: '30%' }}></Box>
              </Box>
            </Box>
            <Box className='flex justify-end items-center'>
              <Typography
                variant='body1'
                sx={{
                  color: '#101828',
                  fontWeight: 'bold'
                }}
              >
                {patientHeight}
              </Typography>
            </Box>
          </Box>

          {/* Body Weight */}
          <Box className='bg-blue-50 p-3 rounded-lg'>
            <Typography
              variant='body2'
              sx={{
                color: '#475467',
                mb: 1
              }}
            >
              Body Weight
            </Typography>
            <Box className='flex items-center justify-between mb-1'>
              <Typography
                variant='body2'
                sx={{
                  color: '#101828',
                  fontWeight: 'bold'
                }}
              >
                30%
              </Typography>
              <Box className='w-full bg-blue-100 rounded-full h-2 ml-2'>
                <Box className='bg-blue-500 h-2 rounded-full' style={{ width: '30%' }}></Box>
              </Box>
            </Box>
            <Box className='flex justify-end items-center'>
              <Typography
                variant='body1'
                sx={{
                  color: '#101828',
                  fontWeight: 'bold'
                }}
              >
                {patientWeight}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PatientProfileCard;