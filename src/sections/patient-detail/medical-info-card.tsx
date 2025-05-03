import React from 'react';
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
// import { normalize } from 'path';
import { ChevronUp, HeartPulse, Pencil, TrendingDown, TrendingUp } from 'lucide-react';
import { useDialog } from '@hooks';
import EditMedicalInfoModal from './edit-medical-info';
import { MedicalInformation } from 'src/types/medical-information';
import { MedicalInformationRequest } from 'src/api/medical-record';

interface MedicalInfoCardProps {
  medicalInfo: MedicalInformation;
  updateMedicalInfo?: (values: MedicalInformationRequest) => Promise<void>;
}

const MedicalInfoCard: React.FC<MedicalInfoCardProps> = (props) => {
  const { medicalInfo } = props;
  const dialog = useDialog();

  return (
    <Card className='w-full p-5 '>
      <CardContent className='p-4' style={{ justifyContent: 'normal', padding: 0, margin: 0 }}>
        <EditMedicalInfoModal
          open={dialog.open}
          onClose={dialog.handleClose}
          onConfirm={props.updateMedicalInfo!}
        />
        <Box>
          <Box className='w-full flex justify-between mb-4 text-[#0E1680]'>
            <Box className='flex gap-3 items-center'>
              <HeartPulse />
              <div className='font-semibold text-lg'>Medical Info</div>
            </Box>
            <button
              className='rounded-full bg-[#0E1680] text-white p-2 hover:opacity-90'
              onClick={() => dialog.handleOpen()}
            >
              <Pencil className='size-5' />
            </button>
          </Box>
          <Divider style={{ marginBottom: 10 }} color='gray' />
          <Box className='flex flex-col gap-2'>
            <Box className='grid grid-cols-2 gap-3'>
              <Box className='bg-blue-50 p-3 rounded-lg col-span-2'>
                <Box className='flex justify-between items-center w-full mb-1'>
                  <Typography
                    variant='body2'
                    sx={{
                      color: '#475467'
                    }}
                  >
                    BMI
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant='h5'
                    sx={{
                      color: '#101828',
                      fontWeight: 'bold'
                    }}
                  >
                    {(
                      (medicalInfo?.weight / (medicalInfo?.height * medicalInfo?.height)) *
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
                </Box>
                <Box className='flex gap-2 items-end'>
                  <Typography
                    variant='h5'
                    sx={{
                      color: '#101828',
                      fontWeight: 'bold'
                    }}
                  >
                    {medicalInfo?.height}
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
                    Weight
                  </Typography>
                </Box>
                <Box className='flex gap-2 items-end'>
                  <Typography
                    variant='h5'
                    sx={{
                      color: '#101828',
                      fontWeight: 'bold'
                    }}
                  >
                    {medicalInfo?.weight}
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
                </Box>
                <Box className='flex gap-2 items-end'>
                  <Typography
                    variant='h5'
                    sx={{
                      color: '#101828',
                      fontWeight: 'bold'
                    }}
                  >
                    {medicalInfo?.bloodPressure}
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
                    Blood Type
                  </Typography>
                </Box>
                <Box className='flex gap-2 items-end'>
                  <Typography
                    variant='h5'
                    sx={{
                      color: '#101828',
                      fontWeight: 'bold'
                    }}
                  >
                    {medicalInfo?.bloodType}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MedicalInfoCard;
