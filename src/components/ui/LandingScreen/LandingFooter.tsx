import { FormControl, InputAdornment, OutlinedInput } from '@mui/material';
import Logo from 'public/ui/HEALTH360 LIGHT.png';
import { BsFillSendFill } from 'react-icons/bs';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';

const LandingFooter = () => {
  return (
    <div className='w-full flex justify-center bg-[#02053D] text-[#FCFEFE]'>
      <div className='w-full max-w-[1140px] p-20'>
        <div className='w-full grid grid-cols-12 gap-5 border-b-[1px] pb-10 border-[#BFD2F8]'>
          <div className='col-span-3'>
            <img src={Logo.src} alt='' className='w-48 mb-5' />
            <div>Leading the Way in Medical Execellence, Trusted Care.</div>
          </div>
          <div className='col-span-2'>
            <div className='mb-5 font-semibold'>Important Links</div>
            <a href='https://www.youtube.com/@hild_____' className='block mb-2'>
              Appointment
            </a>
            <a href='https://www.youtube.com/@hild_____' className='block mb-2'>
              Doctors
            </a>
            <a href='https://www.youtube.com/@hild_____' className='block mb-2'>
              Services
            </a>
            <a href='https://www.youtube.com/@hild_____' className='block'>
              About Us
            </a>
          </div>
          <div className='col-span-3'>
            <div className='mb-5 font-semibold'>Contact Us</div>
            <div className='mb-2'>Call: (237) 681-812-255</div>
            <div className='mb-2'>Email: health360@gmail.com</div>
            <div className='mb-2'>Some country</div>
          </div>
          <div className='col-span-4'>
            <div className='mb-7 font-semibold'>Newsletter</div>
            <FormControl className='bg-[#BFD2F8] text-[#0E1680] !border-none !outline-none rounded-xl w-full'>
              <OutlinedInput
                id='outlined-adornment-password'
                type='text'
                endAdornment={
                  <InputAdornment position='end'>
                    <button>
                      <BsFillSendFill className='text-[#0E1680] text-xl' />
                    </button>
                  </InputAdornment>
                }
                placeholder='Enter your email address'
              />
            </FormControl>
          </div>
        </div>
        <div className='pt-10 flex justify-between'>
          <div>{"© 2025 Hospital's name All Rights Reserved by Health360"}</div>
          <div className='flex justify-center gap-3'>
            <a
              href='https://www.youtube.com/@hild_____'
              className='bg-[#BFD2F8] text-[#0E1680] rounded-full p-2'
            >
              <FaLinkedinIn />
            </a>
            <a
              href='https://www.youtube.com/@hild_____'
              className='bg-[#BFD2F8] text-[#0E1680] rounded-full p-2'
            >
              <FaFacebookF />
            </a>
            <a
              href='https://www.youtube.com/@hild_____'
              className='bg-[#BFD2F8] text-[#0E1680] rounded-full p-2'
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
