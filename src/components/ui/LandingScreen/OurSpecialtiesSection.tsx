import React, { useState } from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PsychologyIcon from '@mui/icons-material/Psychology';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HearingIcon from '@mui/icons-material/Hearing';
import BiotechIcon from '@mui/icons-material/Biotech';
import FaceIcon from '@mui/icons-material/Face';
import WcIcon from '@mui/icons-material/Wc';

interface Specialty {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface OurSpecialtiesSectionProps {
  tagline?: string;
  heading?: string;
  onSpecialtyClick?: (specialtyId: string) => void;
}

const OurSpecialtiesSection: React.FC<OurSpecialtiesSectionProps> = ({
  tagline = 'ALWAYS CARING',
  heading = 'Our Specialties',
  onSpecialtyClick,
}) => {
  const specialties: Specialty[] = [
    { id: 'neurology', name: 'Neurology', icon: <PsychologyIcon /> },
    { id: 'bones', name: 'Bones', icon: <FitnessCenterIcon /> },
    { id: 'oncology', name: 'Oncology', icon: <BiotechIcon /> },
    { id: 'otorhinolaryngology', name: 'Otorhinolaryngology', icon: <HearingIcon /> },
    { id: 'ophthalmology', name: 'Ophthalmology', icon: <VisibilityIcon /> },
    { id: 'cardiovascular', name: 'Cardiovascular', icon: <FavoriteIcon /> },
    { id: 'pulmonology', name: 'Pulmonology', icon: <AirIcon /> },
    { id: 'renal-medicine', name: 'Renal Medicine', icon: <WaterDropIcon /> },
    { id: 'gastroenterology', name: 'Gastroenterology', icon: <RestaurantIcon /> },
    { id: 'urology', name: 'Urology', icon: <WaterDropIcon /> },
    { id: 'dermatology', name: 'Dermatology', icon: <FaceIcon /> },
    { id: 'gynaecology', name: 'Gynaecology', icon: <WcIcon /> },
  ];

  const [activeSpecialty, setActiveSpecialty] = useState<string>('');

  const handleSpecialtyClick = (id: string) => {
    setActiveSpecialty(id);
    if (onSpecialtyClick) {
      onSpecialtyClick(id);
    }
  };

  return (
    <Box className="py-16 bg-white">
      <Container maxWidth="lg">
        <Typography 
          variant="subtitle1" 
          className="text-blue-500 font-bold mb-4 text-center uppercase"
        >
          {tagline}
        </Typography>
        
        <Typography 
          variant="h2" 
          className="text-[#0c1b7a] font-bold mb-12 text-2xl text-center"
        >
          {heading}
        </Typography>

        <Grid container spacing={3}>
          {specialties.map((specialty) => (
            <Grid item xs={6} sm={4} md={3} key={specialty.id}>
              <Box 
                className={`flex flex-col items-center justify-center p-8 rounded-lg transition-all duration-300 cursor-pointer h-32 bg-transparent
                  hover:bg-[#0c1b7a]
                  hover:transform hover:-translate-y-1`}
                onClick={() => handleSpecialtyClick(specialty.id)}
              >
                <Box 
                  className={`w-12 h-12 flex items-center justify-center mb-3
                    ${activeSpecialty === specialty.id ? 'text-white' : 'text-blue-500'}`}
                >
                  {specialty.icon}
                </Box>
                <Typography 
                  className={`font-medium text-center
                    ${activeSpecialty === specialty.id ? 'text-white' : 'text-gray-800'}`}
                >
                  {specialty.name}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default OurSpecialtiesSection;