import AppointmentSection from './AppointmentSection';
import ContactSection from './ContactSection';
import DoctorSection from './DoctorSection';
import LandingFooter from './LandingFooter';
import NewsSection from './NewsSection';

const LandingScreen = () => {
  return (
    <div className='w-full h-screen '>
      <AppointmentSection />
      <DoctorSection />
      <NewsSection />
      <ContactSection />
      <LandingFooter />
    </div>
  );
};

export default LandingScreen;
