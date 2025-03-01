import { FaClock, FaEnvelope, FaLocationDot, FaPhoneVolume } from 'react-icons/fa6';

const ContactSection = () => {
  return (
    <div className='w-full flex justify-center bg-transparent !bg-[#FCFEFE]'>
      <div className='w-full max-w-[1140px] py-20 p-4 sm:px-10 min-[1140px]:px-0'>
        <div className='text-[#159EEC] text-lg font-semibold mb-5 w-full text-center uppercase'>
          Get in touch
        </div>
        <div className='text-[#0E1680] text-3xl w-full text-center mb-10'>Contact</div>
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 min-[1140px]:grid-cols-4 gap-5'>
          <div className='bg-[#BFD2F8] px-8 py-12 rounded-md text-[#0E1680] transition duration-300 ease-in-out hover:-translate-y-2'>
            <FaPhoneVolume className='text-3xl mb-3' />
            <div className='uppercase font-semibold mb-3'>Emergency</div>
            <div className='text-sm mb-2'>(237) 681-812-255</div>
            <div className='text-sm'>(237) 666-331-894</div>
          </div>
          <div className='text-[#BFD2F8] px-8 py-12 rounded-md bg-[#0E1680] transition duration-300 ease-in-out hover:-translate-y-2'>
            <FaLocationDot className='text-3xl mb-3' />
            <div className='uppercase font-semibold mb-3'>Location</div>
            <div className='text-sm mb-2'>0123 Some place</div>
            <div className='text-sm'>9876 Some country</div>
          </div>
          <div className='bg-[#BFD2F8] px-8 py-12 rounded-md text-[#0E1680] transition duration-300 ease-in-out hover:-translate-y-2'>
            <FaEnvelope className='text-3xl mb-3' />
            <div className='uppercase font-semibold mb-3'>Email</div>
            <div className='text-sm mb-2'>fildineeesoe@gmil.com</div>
            <div className='text-sm'>myebstudios@gmail.com</div>
          </div>
          <div className='text-[#BFD2F8] px-8 py-12 rounded-md bg-[#0E1680] transition duration-300 ease-in-out hover:-translate-y-2'>
            <FaClock className='text-3xl mb-3' />
            <div className='uppercase font-semibold mb-3'>Working hours</div>
            <div className='text-sm mb-2'>Mon-Sat 09:00-20:00</div>
            <div className='text-sm'>Sunday Emergency only</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
