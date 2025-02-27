import React from 'react';
import { Box, Typography, Container, Grid, Button } from '@mui/material';
import { MedicalServices, MonitorHeart, Science, Bloodtype } from '@mui/icons-material';

interface ServiceFeatureItem {
  text: string;
}

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
}

interface OurServicesSectionProps {
  tagline?: string;
  heading?: string;
  subHeading?: string;
  description1?: string;
  description2?: string;
  serviceFeatures?: ServiceFeatureItem[];
  viewAllText?: string;
  onViewAllClick?: () => void;
}

const OurServicesSection: React.FC<OurServicesSectionProps> = ({
  tagline = 'CARE YOU CAN BELIEVE IN',
  heading = 'Our Services',
  subHeading = 'A passion for putting patients first.',
  description1 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare. Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim et.',
  description2 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare. Velit nascetur proin massa in.',
  serviceFeatures = [
    { text: 'A Passion for Healing' },
    { text: '5-Star Care' },
    { text: 'All our best' },
    { text: 'Believe in Us' },
    { text: 'A Legacy of Excellence' },
    { text: 'Always Caring' }
  ],
  viewAllText = 'View All',
  onViewAllClick = () => {}
}) => {
  const services: ServiceCardProps[] = [
    {
      icon: <MedicalServices fontSize="large" className='text-3xl'/>,
      title: 'Free Checkup'
    },
    { icon: <MonitorHeart fontSize="large" className='text-3xl' />, title: 'Cardiogram' },
    { icon: <Science fontSize="large" className='text-3xl' />, title: 'DNA Testing' },
    { icon: <Bloodtype fontSize="large" className='text-3xl' />, title: 'Blood Bank' }
  ];

  return (
    <Box className='py-16 bg-white'>
      <Container maxWidth='lg'>
        <Typography
          variant='subtitle1'
          className='text-center text-[#159EEC] font-bold text-[18px] mb-4 uppercase'
        >
          {tagline}
        </Typography>

        <Typography
          variant='h2'
          className='text-center text-[#0E1680] text-[32px] font-bold mb-12 text-indigo-900'
        >
          {heading}
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            {services.map((service, index) => (
              <Box
                key={index}
                className={`flex flex-col items-center p-5 transition-transform duration-300 border border-gray-100
                  ${index === 0 || index === 2 ? 'bg-[#0E1680]' : ''}`}
              >
                <Box
                  className={` w-16 h-16 flex items-center justify-center mb-4
                  ${index === 0 || index === 2 ? 'text-indigo-100' : 'text-indigo-900'}`}
                >
                  {service.icon}
                </Box>
                <Typography
                  variant='subtitle1'
                  className={`font-bold mb-2 ${index === 0 || index === 2 ? 'text-white' : 'text-gray-800'}`}
                >
                  {service.title}
                </Typography>
              </Box>
            ))}
            <Box className='text-center'>
              <Button
                onClick={onViewAllClick}
                style={{
                  backgroundColor: '#0E1680',
                  color: '#BFD2F8',
                  padding: '12px 20px',
                  textTransform: 'none',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {viewAllText}
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={5}>
            <Typography variant='h5' className='font-bold mb-5 text-xl text-gray-800'>
              {subHeading}
            </Typography>

            <Box className='mt-10 mb-8'>
              <Grid container spacing={2}>
                {serviceFeatures.map((feature, index) => (
                  <Grid item xs={6} key={index}>
                    <Box className='flex items-center gap-2'>
                      <Box className='w-2.5 h-2.5 rounded-full bg-blue-500'></Box>
                      <Typography variant='body2'>{feature.text}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Typography variant='body2' className='text-gray-600 leading-relaxed mb-5'>
              {description1}
            </Typography>
            <Typography variant='body2' className='text-gray-600 leading-relaxed mb-5'>
              {description2}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box
              component='img'
              src='/ui/Landing/OurServicesSection1.jpg'
              alt='Doctor with patient'
              className='w-full h-auto rounded-lg mb-4'
            />

            <Box
              component='img'
              src='/ui/Landing/OurServicesSection2.jpg'
              alt='Smiling doctor'
              className='w-full h-auto rounded-lg'
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default OurServicesSection;
