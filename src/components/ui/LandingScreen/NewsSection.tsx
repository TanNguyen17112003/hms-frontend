import NewSlider from '../NewSlider';
import NewsImg from 'public/ui/Landing/News.png';
import { FaEye, FaHeart } from 'react-icons/fa';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export type NewsType = {
  avt: StaticImport;
  title: string;
  time: string;
  author: string;
  view: number;
  like: number;
};

export const newsGroups: NewsType[][] = [
  [
    {
      avt: NewsImg,
      title: "This Article's Title goes Here, but not too long.",
      time: 'Monday 05, September 2021',
      author: 'Author',
      view: 68,
      like: 86
    },
    {
      avt: NewsImg,
      title: "This Article's Title goes Here, but not too long.",
      time: 'Monday 05, September 2021',
      author: 'Author',
      view: 68,
      like: 86
    },
    {
      avt: NewsImg,
      title: "This Article's Title goes Here, but not too long.",
      time: 'Monday 05, September 2021',
      author: 'Author',
      view: 68,
      like: 86
    },
    {
      avt: NewsImg,
      title: "This Article's Title goes Here, but not too long.",
      time: 'Monday 05, September 2021',
      author: 'Author',
      view: 68,
      like: 86
    }
  ],
  [
    {
      avt: NewsImg,
      title: "This Article's Title goes Here, but not too long.",
      time: 'Monday 05, September 2021',
      author: 'Author',
      view: 68,
      like: 86
    },
    {
      avt: NewsImg,
      title: "This Article's Title goes Here, but not too long.",
      time: 'Monday 05, September 2021',
      author: 'Author',
      view: 68,
      like: 86
    },
    {
      avt: NewsImg,
      title: "This Article's Title goes Here, but not too long.",
      time: 'Monday 05, September 2021',
      author: 'Author',
      view: 68,
      like: 86
    },
    {
      avt: NewsImg,
      title: "This Article's Title goes Here, but not too long.",
      time: 'Monday 05, September 2021',
      author: 'Author',
      view: 68,
      like: 86
    }
  ]
];

const NewsSection = () => {
  const NewsGroupCard = ({ props }: { props: any }) => {
    return (
      <div className='mx-3'>
        <div className='grid grid-cols-2 gap-3'>
          {props.map((item: NewsType) => (
            <div className='flex rounded-lg overflow-hidden' key={item.title}>
              <img src={item.avt.src} alt='' className='h-40' />
              <div className='p-5 bg-[#FCFEFE]'>
                <div className='text-[#159EEC] text-sm mb-3'>
                  <span>{item.time}</span> | <span>{item.author}</span>
                </div>
                <div className='text-[#212124] text-xl mb-3'>{item.title}</div>
                <div className='flex gap-5'>
                  <div className='flex gap-2 items-center text-sm'>
                    <FaEye className='text-[#526AE9]' /> {item.view}
                  </div>
                  <div className='flex gap-2 items-center text-sm'>
                    <FaHeart className='text-[#E2315C]' /> {item.like}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className='w-full flex justify-center bg-transparent bg-[#FAFDFE]'>
      <div className='w-full max-w-[1140px] p-20'>
        <div className='text-[#159EEC] text-lg font-semibold mb-5 w-full text-center uppercase'>
          Better information, Better health
        </div>
        <div className='text-[#0E1680] text-3xl w-full text-center mb-10'>News</div>
        <NewSlider
          list={newsGroups}
          component={NewsGroupCard}
          config={{
            arrows: false,
            dots: true,
            infinite: true,
            slidesToScroll: 1,
            slidesToShow: 1,
            customPaging: (i: number) => (
              <div className='bg-[#BFD2F8] w-3 h-3 rounded-full mx-1 mt-5 transition-all duration-300'></div>
            ),
            dotsClass: 'slick-dots custom-dots',
            responsive: [
              {
                breakpoint: 640,
                settings: {
                  slidesToShow: 1
                }
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 2
                }
              },
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3
                }
              }
            ]
          }}
        />
      </div>
    </div>
  );
};

export default NewsSection;
