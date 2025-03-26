import React from 'react';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { IoArrowBackOutline, IoArrowForwardOutline } from 'react-icons/io5';
import './Slider.module.css';

// 🔹 Định nghĩa kiểu props cho nút điều hướng
interface ArrowButtonProps {
  onClick?: () => void;
}

// 🔹 Component nút "Prev"
const ArrowButtonPrev: React.FC<ArrowButtonProps> = ({ onClick }) => {
  return (
    <button
      className="hover:opacity-75 transition-all duration-300 !p-1 !w-6 !h-6 !text-white slick-prev !text-xl !after:content-[''] !flex justify-center items-center !bg-primary rounded-full !aspect-square"
      onClick={onClick}
    >
      <IoArrowBackOutline />
    </button>
  );
};

// 🔹 Component nút "Next"
const ArrowButtonNext: React.FC<ArrowButtonProps> = ({ onClick }) => {
  return (
    <button
      className="hover:opacity-75 transition-all duration-300 !p-1 !w-6 !h-6 !text-white slick-next !text-xl !after:content-[''] !flex justify-center items-center !bg-primary rounded-full !aspect-square"
      onClick={onClick}
    >
      <IoArrowForwardOutline />
    </button>
  );
};

// 🔹 Định nghĩa kiểu props cho `NewSlider`
interface NewSliderProps<T> {
  list: T[];
  config?: Partial<Settings>;
  component: React.ComponentType<{ props: T }>;
}

// 🔹 Cấu hình mặc định cho slider
const defaultSettings: Settings = {
  dots: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  arrows: true,
  swipeToSlide: true,
  lazyLoad: 'ondemand',
  infinite: false,
  prevArrow: <ArrowButtonPrev />,
  nextArrow: <ArrowButtonNext />
};

// 🔹 Component `NewSlider`
const NewSlider = <T,>({ list, config = {}, component: Component }: NewSliderProps<T>) => {
  const settings: Settings = { ...defaultSettings, ...config };

  return (
    <Slider {...settings} className='w-full'>
      {list.map((item, idx) => (
        <Component key={idx} props={item} />
      ))}
    </Slider>
  );
};

export default NewSlider;
