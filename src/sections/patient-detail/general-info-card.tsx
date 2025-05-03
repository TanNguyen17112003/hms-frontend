import React, { useMemo } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
// import { normalize } from 'path';
import { Pencil } from 'lucide-react';
import AddPatientDialog from '../admin/patient-management/add-patient-dialog';
import { useDialog } from '@hooks';
import { UserDetail } from 'src/types/user';
import { UpdatePatientRequest } from 'src/api/medical-record';

interface GeneralInfoCardProps {
  generalInfo: UserDetail;
  updateGeneralInfo?: (values: UpdatePatientRequest) => Promise<void>;
}

const GeneralInfoCard: React.FC<GeneralInfoCardProps> = (props) => {
  const { generalInfo } = props;
  const dialog = useDialog();

  const patientAge = useMemo(() => {
    return generalInfo?.dateOfBirth
      ? new Date().getFullYear() - new Date(generalInfo?.dateOfBirth).getFullYear()
      : 0;
  }, [generalInfo]);

  return (
    <Card className='w-full p-5 '>
      <CardContent className='p-4' style={{ justifyContent: 'normal', padding: 0, margin: 0 }}>
        <AddPatientDialog
          type='edit'
          open={dialog.open}
          onClose={dialog.handleClose}
          onConfirm={props.updateGeneralInfo!}
        />
        <Box className='grid grid-cols-10 gap-5'>
          <Box className='col-span-4 lg:col-span-2'>
            <Box className='h-full flex flex-col items-center justify-center mb-4 md:mr-4 lg:mr-0'>
              {/* Profile Image with Blue Tick */}
              <Box className='relative'>
                <Box
                  component='img'
                  src='/ui/PatientDetail/avt-photo-blue-tick.png'
                  alt={`${generalInfo?.fullName}'s profile`}
                  className='w-24 h-24 rounded-full object-cover'
                />
              </Box>

              <Box className='text-center'>
                <Typography variant='h5' className='font-bold' sx={{ color: '#101828', mb: 1 }}>
                  {generalInfo?.fullName}
                </Typography>
                <Typography variant='subtitle1' sx={{ color: '#475467' }}>
                  {`${patientAge} Years, ${generalInfo?.sex}`}
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
                  {generalInfo?.ssn}
                </Typography>
              </Box>
              <Box>
                <Typography variant='body2' sx={{ color: '#475467', mb: 1 }}>
                  Date of Birth
                </Typography>
                <Typography variant='body1' sx={{ color: '#101828' }}>
                  {generalInfo?.dateOfBirth}
                </Typography>
              </Box>
              <Box>
                <Typography variant='body2' sx={{ color: '#475467', mb: 1 }}>
                  Email
                </Typography>
                <Typography variant='body1' sx={{ color: '#101828' }}>
                  {generalInfo?.email || 'Not provided'}
                </Typography>
              </Box>
              <Box>
                <Typography variant='body2' sx={{ color: '#475467', mb: 1 }}>
                  Phone
                </Typography>
                <Typography variant='body1' sx={{ color: '#101828' }}>
                  {generalInfo?.phoneNumber}
                </Typography>
              </Box>
              <Box>
                <Typography variant='body2' sx={{ color: '#475467', mb: 1 }}>
                  Address
                </Typography>
                <Typography variant='body1' sx={{ color: '#101828' }}>
                  {generalInfo?.address}
                </Typography>
              </Box>
              <Box>
                <Typography variant='body2' sx={{ color: '#475467', mb: 1 }}>
                  Job
                </Typography>
                <Typography variant='body1' sx={{ color: '#101828' }}>
                  {generalInfo?.occupation}
                </Typography>
              </Box>
              <Box>
                <Typography variant='body2' sx={{ color: '#475467', mb: 1 }}>
                  Marital status
                </Typography>
                <Typography variant='body1' sx={{ color: '#101828' }}>
                  {generalInfo?.maritalStatus}
                </Typography>
              </Box>
              <Box>
                <Typography variant='body2' sx={{ color: '#475467', mb: 1 }}>
                  Nationality
                </Typography>
                <Typography variant='body1' sx={{ color: '#101828' }}>
                  {generalInfo?.nationality}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default GeneralInfoCard;
