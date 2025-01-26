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
    image: "https://via.placeholder.com/800x400",
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
    <div className="container mx-auto my-8">
      <Slider {...settings}>
        {successStories.map((story, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg shadow-lg"
          >
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-4">
              <h2 className="text-2xl font-bold text-white mb-2">
                {story.title}
              </h2>
              <p className="text-white text-sm">{story.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerSlider;
