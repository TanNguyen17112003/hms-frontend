import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { CalendarToday, PeopleAlt, Payment } from '@mui/icons-material'; // MUI Icons

interface GreetingSectionProps {
  tagline?: string;
  heading?: string;
  serviceButtonText?: string;
  onServiceClick?: () => void;
}

const GreetingSection: React.FC<GreetingSectionProps> = ({
  tagline = 'CARING FOR LIFE',
  heading = 'Leading the Way\nin Medical Excellence',
  serviceButtonText = 'Our Services',
  onServiceClick = () => {}
}) => {
  return (
    <Box className='relative bg-gradient-to-r from-[#f0f6ff] to-transparent pb-10 overflow-hidden'>
      <Box
        className='relative bg-cover bg-center h-[900px] z-0'
        style={{
          backgroundImage: "url('/ui/Landing/GreetingLanding.jpg')" // Your image URL
        }}
      >
        <Container maxWidth='lg' className='relative z-10'>
          <Box className='flex h-full flex-col'>
            <Box className='max-w-[600px]   mt-80'>
              <Typography className='font-bold text-[#159EEC]' sx={{ fontSize: '18px' }}>
                {tagline}
              </Typography>
              <Typography className='text-[#0E1680] font-semibold' sx={{ fontSize: '48px' }}>
                {heading}
              </Typography>
              <Button
                sx={{
                  width: '165px',
                  fontSize: '16px',
                  backgroundColor: '#BFD2F8',
                  paddingTop: '13px',
                  paddingBottom: '13px',
                  gap: '10px',
                  borderRadius: '50px'
                }}
                onClick={onServiceClick}
              >
                {serviceButtonText}
              </Button>
            </Box>
            <Box className='flex flex-row mt-80 gap-80'>
              <Button
                variant='contained'
                className='bg-[#0E1680] text-white py-3 px-5 rounded-lg text-transform-none w-[550px] flex items-center justify-between'
                startIcon={<CalendarToday />}
                onClick={() => {}}
              >
                Book an Appointment
              </Button>

              <Button
                variant='contained'
                startIcon={<CalendarToday />}
                className='bg-[#0E1680] text-white py-3 px-5 rounded-lg text-transform-none w-[550px] flex items-center justify-between'
              >
                Book an Appointment
              </Button>

              <Button
                variant='contained'
                startIcon={<CalendarToday />}
                className='bg-[#0E1680] text-white py-3 px-5 rounded-lg text-transform-none w-[550px] flex items-center justify-between'
              >
                Book an Appointment
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default GreetingSection;
