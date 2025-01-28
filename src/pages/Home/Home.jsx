import React from "react";
import BannerSlider from "./shared/BannerSlider";
import FeedbackSection from "./shared/FeedBack";
import PopularCamps from "./shared/PopularCamps";
import VisionImpactSection from "./shared/VisionImpactSection ";

const Home = () => {
  return (
    <div className="container mx-auto h-[2000px] text-primary-color">
      <BannerSlider />
      <PopularCamps />
      <FeedbackSection />
      <VisionImpactSection />
    </div>
  );
};

export default Home;
