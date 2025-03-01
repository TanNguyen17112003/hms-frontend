import { FormControl, InputAdornment, OutlinedInput } from '@mui/material';
import Logo from 'public/logo-text.png';
import { BsFillSendFill } from 'react-icons/bs';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';

const LandingFooter = () => {
  return (
    <div className='w-full flex justify-center bg-[#02053D] text-[#FCFEFE]'>
      <div className='w-full max-w-[1140px] py-16 p-4 sm:px-10 min-[1140px]:px-0'>
        <div className='w-full grid grid-cols-12 gap-5 border-b-[1px] pb-10 border-[#BFD2F8]'>
          <div className='col-span-12 sm:col-span-3'>
            <img src={Logo.src} alt='' className='w-48 mb-5' />
            <div>Leading the Way in Medical Execellence, Trusted Care.</div>
          </div>
          <div className='col-span-12 sm:col-span-2'>
            <div className='mb-5 font-semibold'>Important Links</div>
            <a
              href='https://www.youtube.com/@hild_____'
              className='block mb-2 transition duration-300 ease-in-out hover:-translate-y-1'
            >
              Appointment
            </a>
            <a
              href='https://www.youtube.com/@hild_____'
              className='block mb-2 transition duration-300 ease-in-out hover:-translate-y-1'
            >
              Doctors
            </a>
            <a
              href='https://www.youtube.com/@hild_____'
              className='block mb-2 transition duration-300 ease-in-out hover:-translate-y-1'
            >
              Services
            </a>
            <a
              href='https://www.youtube.com/@hild_____'
              className='block transition duration-300 ease-in-out hover:-translate-y-1'
            >
              About Us
            </a>
          </div>
          <div className='col-span-12 sm:col-span-3'>
            <div className='mb-5 font-semibold'>Contact Us</div>
            <div className='mb-2'>Call: (237) 681-812-255</div>
            <div className='mb-2'>Email: healthpro@gmail.com</div>
            <div className='mb-2'>Some country</div>
          </div>
          <div className='col-span-12 sm:col-span-4'>
            <div className='mb-7 font-semibold'>Newsletter</div>
            <div className='relative'>
              <input
                type='email'
                className='bg-[#BFD2F8] w-full text-[#0E1680] !rounded-xl h-14 p-5'
                placeholder='Enter your email address'
              ></input>
              <button className='absolute right-5 top-5'>
                <BsFillSendFill className='text-[#0E1680] hover:opacity-70 text-xl' />
              </button>
            </div>
            {/* <OutlinedInput
              id='outlined-adornment-password'
              type='text'
              endAdornment={
                <InputAdornment position='end'>
                  <button>
                    <BsFillSendFill className='text-[#0E1680] hover:opacity-70 text-xl' />
                  </button>
                </InputAdornment>
              }
              placeholder='Enter your email address'
              className='bg-[#BFD2F8] w-full text-[#0E1680] !rounded-xl'
            /> */}
          </div>
        </div>
        <div className='pt-10 flex flex-col items-center sm:flex-row justify-between'>
          <div className='mb-5 sm:mb-0 text-center sm:text-start'>
            {"© 2025 Hospital's name All Rights Reserved by HealthPro"}
          </div>
          <div className='flex justify-center gap-3'>
            <a
              href='https://www.youtube.com/@hild_____'
              className='bg-[#BFD2F8] text-[#0E1680] rounded-full p-2 transition duration-300 ease-in-out hover:-translate-y-1'
            >
              <FaLinkedinIn />
            </a>
            <a
              href='https://www.youtube.com/@hild_____'
              className='bg-[#BFD2F8] text-[#0E1680] rounded-full p-2 transition duration-300 ease-in-out hover:-translate-y-1'
            >
              <FaFacebookF />
            </a>
            <a
              href='https://www.youtube.com/@hild_____'
              className='bg-[#BFD2F8] text-[#0E1680] rounded-full p-2 transition duration-300 ease-in-out hover:-translate-y-1'
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingFooter;
