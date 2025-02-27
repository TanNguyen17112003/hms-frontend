import React from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import CalendarIcon from 'src/components/icons/CalendarIcon';
import TeamIcon from 'src/components/icons/TeamIcon';
import CashIcon from 'src/components/icons/CashIcon';

interface GreetingSectionProps {
  tagline?: string;
  heading?: string;
  serviceButtonText?: string;
  onServiceClick?: () => void;
}

const GreetingSection: React.FC<GreetingSectionProps> = ({
  tagline = 'HEALTHPRO',
  heading = 'Leading the Way\nin Medical Excellence',
  serviceButtonText = 'Our Services',
  onServiceClick = () => {}
}) => {
  return (
    <Box
      className='relative overflow-hidden bg-white w-full'
      sx={{ paddingBottom: { xs: '30px', sm: '50px' } }}
    >
      <Box
        className='absolute top-0 left-0 w-full z-0'
        sx={{
          height: { xs: '400px', sm: '450px', md: '500px', lg: '550px' },
          '@media (min-width: 1800px)': {
            height: '700px'
          }
        }}
        style={{
          backgroundImage: "url('/ui/Landing/banner.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      <Container maxWidth='lg' className='relative z-10'>
        <Box className='flex flex-col pt-0'>
          <Box
            className='max-w-[350px] sm:max-w-[450px] md:max-w-[600px]'
            sx={{
              marginTop: { xs: '80px', sm: '120px', md: '150px', lg: '180px' },
              '@media (min-width: 1800px)': {
                marginTop: '320px'
              }
            }}
          >
            <Typography
              className='font-bold text-[#159EEC] text-sm sm:text-base md:text-lg pb-5'
              sx={{ fontSize: { xs: '14px', sm: '16px', md: '18px' } }}
            >
              {tagline}
            </Typography>
            <Typography
              className='text-[#0E1680] font-semibold leading-tight pb-5'
              sx={{
                fontSize: { xs: '28px', sm: '36px', md: '48px' },
                lineHeight: { xs: '32px', sm: '40px', md: '52px' }
              }}
            >
              {heading}
            </Typography>
            <Button
              sx={{
                width: { xs: '140px', sm: '165px' },
                fontSize: { xs: '14px', sm: '16px' },
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

          <Box
            className='w-full'
            sx={{
              marginTop: { xs: '40px', sm: '60px', md: '80px', lg: '100px' }
            }}
          >
            <Grid container spacing={{ xs: 2, sm: 3 }}>
              <Grid item xs={12} sm={12} md={4}>
                <Button
                  variant='contained'
                  style={{
                    backgroundColor: '#0E1680',
                    color: 'white',
                    textTransform: 'none'
                  }}
                  className='rounded-lg p-3 h-20 sm:h-24 md:h-24 lg:h-[100px] w-full flex justify-between items-center'
                  endIcon={<CalendarIcon className='w-8 ml-3' />}
                  onClick={() => {}}
                >
                  <span className='text-sm sm:text-base'>Book an Appointment</span>
                </Button>
              </Grid>

              <Grid item xs={12} sm={12} md={4}>
                <Button
                  variant='contained'
                  endIcon={<TeamIcon className='w-8 ml-3' />}
                  style={{
                    backgroundColor: '#0E1680',
                    color: 'white',
                    textTransform: 'none'
                  }}
                  className='rounded-lg p-3 h-20 sm:h-24 md:h-24 lg:h-[100px] w-full flex justify-between items-center'
                >
                  <span className='text-sm sm:text-base'>Book an Appointment</span>
                </Button>
              </Grid>

              <Grid item xs={12} sm={12} md={4}>
                <Button
                  variant='contained'
                  endIcon={<CashIcon className='w-8 ml-3' />}
                  style={{
                    backgroundColor: '#0E1680',
                    color: 'white',
                    textTransform: 'none'
                  }}
                  className='rounded-lg p-3 h-20 sm:h-24 md:h-24 lg:h-[100px] w-full flex justify-between items-center'
                >
                  <span className='text-sm sm:text-base'>Book an Appointment</span>
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default GreetingSection;
