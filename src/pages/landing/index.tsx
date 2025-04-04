import React from 'react';
import { Box } from '@mui/material';
import { useAuth } from '@hooks';
import { Page as PageType } from 'src/types/page';
import AppointmentSection from '../../sections/landing/AppointmentSection';
import ContactSection from '../../sections/landing/ContactSection';
import DoctorSection from '../../sections/landing/DoctorSection';
import LandingFooter from '../../sections/landing/LandingFooter';
import NewsSection from '../../sections/landing/NewsSection';
import OurServicesSection from '../../sections/landing/OurServicesSection';
import GreetingSection from '../../sections/landing/GreetingSection';
import WelcomeSection from '../../sections/landing/WelcomeSection';
import OurSpecialtiesSection from '../../sections/landing/OurSpecialtiesSection';

const LandingPage: PageType = () => {
  return (
    <Box className='w-full'>
      <GreetingSection />
      <WelcomeSection />
      <OurServicesSection />
      <OurSpecialtiesSection />
      <AppointmentSection />
      <DoctorSection />
      <NewsSection />
      <ContactSection />
      <LandingFooter />
    </Box>
  );
};

LandingPage.getLayout = (page) => <LandingPage />;

export default LandingPage;
