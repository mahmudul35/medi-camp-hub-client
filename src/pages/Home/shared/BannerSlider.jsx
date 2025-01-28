import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const successStories = [
  {
    image: "https://i.ibb.co.com/qFFY04Q/medi1.jpg",
    title: "Medical Camp in Rural Areas",
    description:
      "Over 500 people received free medical checkups and consultations.",
  },
  {
    image:
      "https://i.ibb.co.com/fQq6SHM/medium-shot-therapist-measuring-blood-ressure-patient-consultation.jpg",
    title: "Child Healthcare Initiative",
    description:
      "Improved the lives of 300 children with vaccinations and health education.",
  },
  {
    image: "https://i.ibb.co.com/fqp5nC0/CMG-English.jpg",
    title: "Emergency Response Program",
    description:
      "Provided immediate care to disaster-affected regions, saving countless lives.",
  },
];

const BannerSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  return (
    <div className="container mx-auto my-12">
      <Slider {...settings}>
        {successStories.map((story, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg shadow-xl transition-transform duration-300 hover:scale-105"
          >
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-[600px] object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end items-center text-center p-8">
              <h2 className="text-3xl font-extrabold text-pink-800 mb-4 drop-shadow-lg">
                {story.title}
              </h2>
              <p className="text-white text-lg font-medium mb-4">
                {story.description}
              </p>
              <button className="px-6 py-2 bg-pink-800 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 transition">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerSlider;
