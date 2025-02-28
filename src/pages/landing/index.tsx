import React from 'react';
import { Box, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { Page } from 'src/types/page';
import AppBarSection from './AppBarSection';
import AppointmentSection from './AppointmentSection';
import ContactSection from './ContactSection';
import DoctorSection from './DoctorSection';
import LandingFooter from './LandingFooter';
import NewsSection from './NewsSection';
import OurServicesSection from './OurServicesSection';
import GreetingSection from './GreetingSection';
import WelcomeSection from './WelcomeSection';
import OurSpecialtiesSection from './OurSpecialtiesSection';

const LandingScreen = () => {
  return (
    <div className='w-full'>
      {/* <AppBarSection /> */}
      <GreetingSection />
      <WelcomeSection />
      <OurServicesSection />
      <OurSpecialtiesSection />
      <AppointmentSection />
      <DoctorSection />
      <NewsSection />
      <ContactSection />
      <LandingFooter />
    </div>
  );
};

const LandingPage: Page = () => {
  return (
    <Box className='landing'>
      <Typography>Chovy</Typography>
    </Box>
  );
};

LandingPage.getLayout = (page) => <LandingScreen />;

export default LandingPage;
