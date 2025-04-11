import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slider.module.css"
import { IoArrowBackOutline, IoArrowForwardOutline } from 'react-icons/io5';

const ArrowButtonPrev = ({ onClick }) => {
    return (
        <button className="hover:opacity-75 transition-all duration-300 !p-1 !w-6 !h-6 !text-white slick-prev !text-xl !after:content-[''] !flex justify-center items-center !bg-primary rounded-full !aspect-square" onClick={onClick}>
            <IoArrowBackOutline />
        </button>
    );
};

const ArrowButtonNext = ({ onClick }) => {
    return (
        <button className="hover:opacity-75 transition-all duration-300 !p-1 !w-6 !h-6 !text-white slick-next !text-xl !after:content-[''] !flex justify-center items-center !bg-primary rounded-full !aspect-square" onClick={onClick}>
            <IoArrowForwardOutline />
        </button>
    );
};

const defaultSettings = {
    dots: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    swipeToSlide: true,
    lazyLoad: true,
    infinite: false,
    prevArrow: <ArrowButtonPrev />,
    nextArrow: <ArrowButtonNext />,
};

const NewSlider = ({ list, config = {}, component: Component, type = "" }) => {
    const settings = { ...defaultSettings, ...config };

    return (
        <Slider {...settings} className={`w-full ${type == "award" && "px-[25px]"}`}>
            {
                list.map((item, idx) => (
                    <Component key={idx} props={item}/>
                ))
            }
        </Slider>
    );
};

export default NewSlider;
