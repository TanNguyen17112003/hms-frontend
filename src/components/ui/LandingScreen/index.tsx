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
    <div className='w-full h-screen '>
      <AppBarSection />
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

export default LandingScreen;
