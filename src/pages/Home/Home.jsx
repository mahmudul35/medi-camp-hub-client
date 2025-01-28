import React from "react";
import Footer from "../../component/common/Footer";
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
      <Footer />
    </div>
  );
};

export default Home;
