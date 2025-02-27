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
    { id: 'neurology', name: 'Neurology', icon: <PsychologyIcon fontSize='large' /> },
    { id: 'bones', name: 'Bones', icon: <FitnessCenterIcon fontSize='large'/> },
    { id: 'oncology', name: 'Oncology', icon: <BiotechIcon fontSize='large'/> },
    { id: 'otorhinolaryngology', name: 'Otorhinolaryngology', icon: <HearingIcon fontSize='large'/> },
    { id: 'ophthalmology', name: 'Ophthalmology', icon: <VisibilityIcon fontSize='large'/> },
    { id: 'cardiovascular', name: 'Cardiovascular', icon: <FavoriteIcon fontSize='large'/> },
    { id: 'pulmonology', name: 'Pulmonology', icon: <AirIcon fontSize='large'/> },
    { id: 'renal-medicine', name: 'Renal Medicine', icon: <WaterDropIcon fontSize='large'/> },
    { id: 'gastroenterology', name: 'Gastroenterology', icon: <RestaurantIcon fontSize='large'/> },
    { id: 'urology', name: 'Urology', icon: <WaterDropIcon fontSize='large'/> },
    { id: 'dermatology', name: 'Dermatology', icon: <FaceIcon fontSize='large'/> },
    { id: 'gynaecology', name: 'Gynaecology', icon: <WcIcon fontSize='large'/> },
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
        <h6
          style={{ color: '#159EEC', fontSize: '18px', fontWeight: '400', marginBottom: '4px', textTransform: 'uppercase', textAlign: 'center' }}
        
        >
          {tagline}
        </h6>
        
        <h2 
          style={{ color: '#0E1680', fontSize: '32px', fontWeight: '600', textAlign: 'center' }}
        >
          {heading}
        </h2>

        <Grid container spacing={3}>
          {specialties.map((specialty) => (
            <Grid item xs={6} sm={4} md={3} key={specialty.id}>
              <Box 
                className={`flex flex-col items-center justify-center p-8 rounded-lg transition-all duration-300 cursor-pointer h-32 bg-transparent
                  hover:bg-[#0c1b7a]
                  hover:text-white
                  hover:transform hover:-translate-y-1`}
                onClick={() => handleSpecialtyClick(specialty.id)}
              >
                <Box 
                  className={`w-12 h-12 flex items-center justify-center mb-3
                    hover:text-white text-[#159EEC]`}
                >
                  {specialty.icon}
                </Box>
                <Typography 
                  className={`font-medium text-center
                   hover:text-white`}
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