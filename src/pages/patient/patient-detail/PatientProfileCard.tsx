import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { styled } from '@mui/system';

// Styled Card with Tailwind classes for responsiveness
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: '100%',
  margin: '0 auto',
  backgroundColor: '#1A202C',
  color: '#FFFFFF',
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.down('sm')]: {
    padding: '1rem',
  },
}));

// Styled Box for the profile image
const ProfileImage = styled('img')({
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  objectFit: 'cover',
  marginBottom: '1rem',
});

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
    patientHeartRate,
  } = props;
  return (
    <StyledCard className="w-full max-w-md mx-auto bg-gray-900 text-white p-4 md:p-6 lg:p-8">
      <CardContent className="flex flex-col items-center text-center">
        {/* Profile Image */}
        <ProfileImage
          src="https://via.placeholder.com/100" // Replace with actual image URL or dynamic prop if available
          alt={`${patientName}'s profile`}
          className="mb-4"
        />

        {/* Patient Name and Basic Info */}
        <Typography variant="h5" component="div" className="font-bold mb-2">
          {patientName}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" className="mb-4">
          {`${patientOld} Years, ${patientSexual}`}
        </Typography>

        {/* Current Status Section */}
        <Box className="w-full mb-4 bg-gray-800 p-3 rounded-lg">
          <Typography variant="subtitle2" className="font-semibold mb-2">
            Current Status
          </Typography>
          <div className="flex flex-col gap-2">
            <Chip
              label="Room Number: 28B"
              color="primary"
              variant="outlined"
              className="bg-gray-700 text-white"
            />
            <Chip
              label="Risky"
              color="warning"
              className="bg-yellow-600 text-white"
            />
            <Chip
              label="Under Treatment"
              color="secondary"
              className="bg-blue-600 text-white"
            />
          </div>
        </Box>

        {/* Contact and Medical Info */}
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <Box>
            <Typography variant="body2" className="font-medium mb-1">
              Email
            </Typography>
            <Typography variant="body1">{patientEmail}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" className="font-medium mb-1">
              Phone
            </Typography>
            <Typography variant="body1">{patientPhone}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" className="font-medium mb-1">
              Date of Birth
            </Typography>
            <Typography variant="body1">{patientDateOfBirth}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" className="font-medium mb-1">
              Diseases
            </Typography>
            <Typography variant="body1">{patientDiseases}</Typography>
          </Box>
        </Box>

        {/* Vital Stats */}
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
          <Box className="bg-gray-800 p-3 rounded-lg">
            <Typography variant="body2" className="font-medium mb-1">
              Blood Pressure
            </Typography>
            <Typography variant="body1">{patientBloodPressure}</Typography>
            <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
              <div
                className="bg-blue-500 h-2.5 rounded-full"
                style={{ width: '30%' }}
              ></div>
            </div>
          </Box>
          <Box className="bg-gray-800 p-3 rounded-lg">
            <Typography variant="body2" className="font-medium mb-1">
              Heart Rate
            </Typography>
            <Typography variant="body1">{patientHeartRate}</Typography>
            <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
              <div
                className="bg-blue-500 h-2.5 rounded-full"
                style={{ width: '30%' }}
              ></div>
            </div>
          </Box>
          <Box className="bg-gray-800 p-3 rounded-lg">
            <Typography variant="body2" className="font-medium mb-1">
              Body Height
            </Typography>
            <Typography variant="body1">{patientHeight}</Typography>
            <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
              <div
                className="bg-blue-500 h-2.5 rounded-full"
                style={{ width: '30%' }}
              ></div>
            </div>
          </Box>
          <Box className="bg-gray-800 p-3 rounded-lg">
            <Typography variant="body2" className="font-medium mb-1">
              Body Weight
            </Typography>
            <Typography variant="body1">{patientWeight}</Typography>
            <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
              <div
                className="bg-blue-500 h-2.5 rounded-full"
                style={{ width: '30%' }}
              ></div>
            </div>
          </Box>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default PatientProfileCard;