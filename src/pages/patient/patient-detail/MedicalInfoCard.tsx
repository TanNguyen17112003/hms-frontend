import React from 'react';
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
// import { normalize } from 'path';
import { ChevronUp, HeartPulse, Pencil, TrendingDown, TrendingUp } from 'lucide-react';

interface MedicalInfoCardProps {
  medicalInfo: any;
}

const MedicalInfoCard: React.FC<MedicalInfoCardProps> = (props) => {
  const { medicalInfo } = props;

  return (
    <Card className='w-full lg:p-5 '>
      <CardContent className='p-4' style={{ justifyContent: 'normal', padding: 0, margin: 0 }}>
        <Box>
          <Box className='w-full flex justify-between mb-4 text-[#0E1680]'>
            <Box className='flex gap-3 items-center'>
              <HeartPulse />
              <div className='font-semibold text-lg'>Medical Info</div>
            </Box>
            <button className='rounded-full bg-[#0E1680] text-white p-2 hover:opacity-90'>
              <Pencil className='size-5' />
            </button>
          </Box>
          <Divider style={{ marginBottom: 10 }} color='gray' />
          <Box className='flex flex-col gap-2'>
            <Box className='grid grid-cols-2 gap-3 mb-3'>
              <Box className='bg-blue-50 p-3 rounded-lg'>
                <Box className='flex justify-between items-center w-full mb-1'>
                  <Typography
                    variant='body2'
                    sx={{
                      color: '#475467'
                    }}
                  >
                    BMI
                  </Typography>
                  <div className='flex gap-2 text-[#09A909]'>
                    <TrendingUp />
                    <div>10</div>
                  </div>
                </Box>

                {/* <Box className='flex items-center justify-between mb-1'>
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
              </Box> */}
                <Box>
                  <Typography
                    variant='h5'
                    sx={{
                      color: '#101828',
                      fontWeight: 'bold'
                    }}
                  >
                    {(
                      (medicalInfo.weight / (medicalInfo.height * medicalInfo.height)) *
                      10000
                    ).toFixed(2)}
                  </Typography>
                </Box>
              </Box>

              <Box className='bg-blue-50 p-3 rounded-lg'>
                <Box className='flex justify-between items-center w-full mb-1'>
                  <Typography
                    variant='body2'
                    sx={{
                      color: '#475467'
                    }}
                  >
                    Height
                  </Typography>
                  <div className='flex gap-2 text-[#09A909]'>
                    <TrendingUp />
                    <div>5</div>
                  </div>
                </Box>
                <Box className='flex gap-2 items-end'>
                  <Typography
                    variant='h5'
                    sx={{
                      color: '#101828',
                      fontWeight: 'bold'
                    }}
                  >
                    {medicalInfo.height}
                  </Typography>
                  <Typography
                    sx={{
                      color: '#475467'
                    }}
                  >
                    cm
                  </Typography>
                </Box>
              </Box>
              <Box className='bg-blue-50 p-3 rounded-lg'>
                <Box className='flex justify-between items-center w-full mb-1'>
                  <Typography
                    variant='body2'
                    sx={{
                      color: '#475467'
                    }}
                  >
                    BMI
                  </Typography>
                  <div className='flex gap-2 text-red-500'>
                    <TrendingDown />
                    <div>10</div>
                  </div>
                </Box>
                <Box className='flex gap-2 items-end'>
                  <Typography
                    variant='h5'
                    sx={{
                      color: '#101828',
                      fontWeight: 'bold'
                    }}
                  >
                    {medicalInfo.weight}
                  </Typography>
                  <Typography
                    sx={{
                      color: '#475467'
                    }}
                  >
                    kg
                  </Typography>
                </Box>
              </Box>
              <Box className='bg-blue-50 p-3 rounded-lg'>
                <Box className='flex justify-between items-center w-full mb-1'>
                  <Typography
                    variant='body2'
                    sx={{
                      color: '#475467'
                    }}
                  >
                    Blood Pressure
                  </Typography>
                  <div className='flex gap-2 text-red-500'>
                    <TrendingDown />
                    <div>10</div>
                  </div>
                </Box>
                <Box className='flex gap-2 items-end'>
                  <Typography
                    variant='h5'
                    sx={{
                      color: '#101828',
                      fontWeight: 'bold'
                    }}
                  >
                    {medicalInfo.bloodPressure}
                  </Typography>
                </Box>
              </Box>
              {/* <Box className='bg-blue-50 p-3 rounded-lg'>
                <Typography
                  variant='body2'
                  sx={{
                    color: '#475467',
                    mb: 1
                  }}
                >
                  Blood Type
                </Typography>
                <Box className='flex gap-2 items-end'>
                  <Typography
                    variant='h5'
                    sx={{
                      color: '#101828',
                      fontWeight: 'bold'
                    }}
                  >
                    {medicalInfo.bloodType}
                  </Typography>
                </Box>
              </Box> */}
            </Box>
            <Box className='col-span-2 grid grid-cols-2 gap-5'>
              <Box>
                <Typography variant='body2' sx={{ color: '#475467', mb: 1 }}>
                  Blood Type
                </Typography>
                <Typography variant='body1' sx={{ color: '#101828' }}>
                  {medicalInfo.bloodType}
                </Typography>
              </Box>
              <Box>
                <Typography variant='body2' sx={{ color: '#475467', mb: 1 }}>
                  Insurance Type
                </Typography>
                <Typography variant='body1' sx={{ color: '#101828' }}>
                  {medicalInfo.insuranceType}
                </Typography>
              </Box>
              <Box>
                <Typography variant='body2' sx={{ color: '#475467', mb: 1 }}>
                  Insurance Card Number
                </Typography>
                <Typography variant='body1' sx={{ color: '#101828' }}>
                  {medicalInfo.insuranceCardNumber}
                </Typography>
              </Box>
              <Box>
                <Typography variant='body2' sx={{ color: '#475467', mb: 1 }}>
                  Insurance Period
                </Typography>
                <Typography variant='body1' sx={{ color: '#101828' }}>
                  {medicalInfo.insurancePeriod}
                </Typography>
              </Box>
              {/* <Box>
                <Typography variant='body2' sx={{ color: '#475467', mb: 1 }}>
                  Allergies
                </Typography>
                <Typography variant='body1' sx={{ color: '#101828' }}>
                  {medicalInfo.allergies}
                </Typography>
              </Box>
              <Box>
                <Typography variant='body2' sx={{ color: '#475467', mb: 1 }}>
                  Vaccinations
                </Typography>
                {medicalInfo.vaccination?.map((item: any) => (
                  <Box className='flex items-center justify-between' key={item.name}>
                    <Typography variant='body1' sx={{ color: '#101828', mb: 1 }}>
                      - {item.name}
                    </Typography>
                    <Typography variant='body1' sx={{ color: '#475467', mb: 1 }}>
                      {item.date}
                    </Typography>
                  </Box>
                ))}
              </Box> */}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MedicalInfoCard;
