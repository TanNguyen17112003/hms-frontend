import NewSlider from '../NewSlider';
import Doctor1 from 'public/ui/Landing/Doctor1.png';
import Doctor2 from 'public/ui/Landing/Doctor2.png';
import Doctor3 from 'public/ui/Landing/Doctor3.png';
import { FaLinkedinIn, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export type DoctorType = {
  avt: StaticImport;
  name: string;
  speciality: string;
  linkedin: string;
  facebook: string;
  instagram: string;
};

export const doctors: DoctorType[] = [
  {
    avt: Doctor1,
    name: 'Justin Bieber',
    speciality: 'Cardiologist',
    linkedin: '/',
    facebook: '/',
    instagram: '/'
  },
  {
    avt: Doctor2,
    name: 'Huy Le Dinh',
    speciality: 'Dermatologist',
    linkedin: '/',
    facebook: '/',
    instagram: '/'
  },
  {
    avt: Doctor3,
    name: 'Lisa Blackpink',
    speciality: 'Endocrinologist ',
    linkedin: '/',
    facebook: '/',
    instagram: '/'
  },
  {
    avt: Doctor1,
    name: 'Justin Bieber',
    speciality: 'Cardiologist',
    linkedin: '/',
    facebook: '/',
    instagram: '/'
  },
  {
    avt: Doctor2,
    name: 'Huy Le Dinh',
    speciality: 'Dermatologist',
    linkedin: '/',
    facebook: '/',
    instagram: '/'
  },
  {
    avt: Doctor3,
    name: 'Lisa Blackpink',
    speciality: 'Endocrinologist ',
    linkedin: '/',
    facebook: '/',
    instagram: '/'
  },
  {
    avt: Doctor1,
    name: 'Justin Bieber',
    speciality: 'Cardiologist',
    linkedin: '/',
    facebook: '/',
    instagram: '/'
  },
  {
    avt: Doctor2,
    name: 'Huy Le Dinh',
    speciality: 'Dermatologist',
    linkedin: '/',
    facebook: '/',
    instagram: '/'
  },
  {
    avt: Doctor3,
    name: 'Lisa Blackpink',
    speciality: 'Endocrinologist ',
    linkedin: '/',
    facebook: '/',
    instagram: '/'
  }
];

const DoctorSection = () => {
  const DoctorCard = ({ props }: { props: any }) => {
    return (
      <div className='mx-3'>
        <div className='flex flex-col justify-center items-center w-full rounded-lg '>
          <img className='w-full object-contain' src={props.avt.src} alt='' />
          <div className='bg-[#BFD2F8] p-4 w-full text-center text-[#0E1680]'>
            <div className='mb-3'>{props.name}</div>
            <div className='uppercase font-bold text-lg mb-3'>{props.speciality}</div>
            <div className='flex justify-center gap-3'>
              <a
                href={props.linkedin}
                className='bg-[#0E1680] text-[#BFD2F8] rounded-full p-2 transition duration-300 ease-in-out hover:-translate-y-1'
              >
                <FaLinkedinIn />
              </a>
              <a
                href={props.facebook}
                className='bg-[#0E1680] text-[#BFD2F8] rounded-full p-2 transition duration-300 ease-in-out hover:-translate-y-1'
              >
                <FaFacebookF />
              </a>
              <a
                href={props.instagram}
                className='bg-[#0E1680] text-[#BFD2F8] rounded-full p-2 transition duration-300 ease-in-out hover:-translate-y-1'
              >
                <FaInstagram />
              </a>
            </div>
          </div>
          <button className='w-full p-5 bg-[#0E1680] text-[#BFD2F8] hover:opacity-70'>
            View Profile
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className='w-full flex justify-center bg-[#FCFEFE]'>
      <div className='w-full max-w-[1140px] py-20 px-10 sm:p-20'>
        <div className='text-[#159EEC] text-lg font-semibold mb-5 w-full text-center'>
          TRUSTED CARE
        </div>
        <div className='text-[#0E1680] text-3xl w-full text-center mb-10'>Our Doctors</div>
        <NewSlider
          list={doctors}
          component={DoctorCard}
          config={{
            arrows: false,
            dots: true,
            slidesToScroll: 3,
            slidesToShow: 3,
            infinite: true,
            customPaging: (i: number) => (
              <div className='bg-[#BFD2F8] w-3 h-3 rounded-full mx-1 mt-10 sm:mt-5 transition-all duration-300'></div>
            ),
            dotsClass: 'slick-dots custom-dots',
            responsive: [
              {
                breakpoint: 640,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2
                }
              }
            ]
          }}
        />
      </div>
    </div>
  );
};

export default DoctorSection;
