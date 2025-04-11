import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
// import { normalize } from 'path';
import { Pencil } from 'lucide-react';
import AddPatientDialog from '../admin/patient-management/add-patient-dialog';
import { useDialog } from '@hooks';

interface GeneralInfoCardProps {
  generalInfo: any;
}

const GeneralInfoCard: React.FC<GeneralInfoCardProps> = (props) => {
  const { generalInfo } = props;
  const dialog = useDialog();

  return (
    <Card className='w-full lg:p-5 '>
      <CardContent className='p-4' style={{ justifyContent: 'normal', padding: 0, margin: 0 }}>
        <AddPatientDialog type='edit' open={dialog.open} onClose={dialog.handleClose} />
        <Box className='grid grid-cols-10 gap-5'>
          <Box className='col-span-4 lg:col-span-2'>
            <Box className='h-full flex flex-col items-center justify-center mb-4 md:mr-4 lg:mr-0'>
              {/* Profile Image with Blue Tick */}
              <Box className='relative'>
                <Box
                  component='img'
                  src='/ui/PatientDetail/avt-photo-blue-tick.png'
                  alt={`${generalInfo.name}'s profile`}
                  className='w-24 h-24 rounded-full object-cover'
                />
              </Box>

              {/* Patient Name and Basic Info */}
              <Box className='text-center'>
                <Typography variant='h5' className='font-bold' sx={{ color: '#101828', mb: 1 }}>
                  {generalInfo.name}
                </Typography>
                <Typography variant='subtitle1' sx={{ color: '#475467' }}>
                  {`${generalInfo.age} Years, ${generalInfo.gender}`}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className='col-span-6 lg:col-span-8'>
            {/* Contact and Medical Info */}
            <Box className='w-full flex justify-end mb-3'>
              <button
                className='rounded-full bg-[#0E1680] text-white p-2 hover:opacity-90'
                onClick={() => dialog.handleOpen()}
              >
                <Pencil className='size-5' />
              </button>
            </Box>
            <Box className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4'>
              <Box>
                <Typography variant='body2' sx={{ color: '#475467', mb: 1 }}>
                  SSN
                </Typography>
                <Typography variant='body1' sx={{ color: '#101828' }}>
                  {generalInfo.ssn}
                </Typography>
              </Box>
              <Box>
                <Typography variant='body2' sx={{ color: '#475467', mb: 1 }}>
                  Date of Birth
                </Typography>
                <Typography variant='body1' sx={{ color: '#101828' }}>
                  {generalInfo.dateOfBirth}
                </Typography>
              </Box>
              <Box>
                <Typography variant='body2' sx={{ color: '#475467', mb: 1 }}>
                  Email
                </Typography>
                <Typography variant='body1' sx={{ color: '#101828' }}>
                  {generalInfo.email}
                </Typography>
              </Box>
              <Box>
                <Typography variant='body2' sx={{ color: '#475467', mb: 1 }}>
                  Phone
                </Typography>
                <Typography variant='body1' sx={{ color: '#101828' }}>
                  {generalInfo.phone}
                </Typography>
              </Box>
              <Box>
                <Typography variant='body2' sx={{ color: '#475467', mb: 1 }}>
                  Address
                </Typography>
                <Typography variant='body1' sx={{ color: '#101828' }}>
                  {generalInfo.address}
                </Typography>
              </Box>
              <Box>
                <Typography variant='body2' sx={{ color: '#475467', mb: 1 }}>
                  Job
                </Typography>
                <Typography variant='body1' sx={{ color: '#101828' }}>
                  {generalInfo.job}
                </Typography>
              </Box>
              <Box>
                <Typography variant='body2' sx={{ color: '#475467', mb: 1 }}>
                  Marital status
                </Typography>
                <Typography variant='body1' sx={{ color: '#101828' }}>
                  {generalInfo.maritalStatus}
                </Typography>
              </Box>
              <Box>
                <Typography variant='body2' sx={{ color: '#475467', mb: 1 }}>
                  Nationality
                </Typography>
                <Typography variant='body1' sx={{ color: '#101828' }}>
                  {generalInfo.nationality}
                </Typography>
              </Box>
              {/* <Box>
              <Typography variant='body2' sx={{ color: '#475467', mb: 1 }}>
                Diseases
              </Typography>
              <Typography variant='body1' sx={{ color: '#101828' }}>
                {generalInfo.patientDiseases}
              </Typography>
            </Box> */}
            </Box>

            {/* <Divider style={{ marginBottom: 10 }} color='gray' /> */}
          </Box>
        </Box>
        {/* Profile Section */}
      </CardContent>
    </Card>
  );
};

export default GeneralInfoCard;
