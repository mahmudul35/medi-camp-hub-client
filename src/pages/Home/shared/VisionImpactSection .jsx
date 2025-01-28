import React from "react";
import { FaCampground, FaHandHoldingHeart, FaUsers } from "react-icons/fa";

const VisionImpactSection = () => {
  const stats = [
    {
      id: 1,
      icon: <FaCampground className="h-12 w-12 text-pink-800" />,
      title: "Camps Organized",
      value: "150+",
    },
    {
      id: 2,
      icon: <FaUsers className="h-12 w-12 text-pink-800" />,
      title: "Participants",
      value: "12,000+",
    },
    {
      id: 3,
      icon: <FaHandHoldingHeart className="h-12 w-12 text-pink-800" />,
      title: "Healthcare Professionals",
      value: "500+",
    },
  ];

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-pink-800 mb-12">
        Our Vision and Impact
      </h1>

      {/* Mission Statement */}
      <div className="bg-gray-100 rounded-lg shadow-lg p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Transforming Lives Through Healthcare
        </h2>
        <p className="text-gray-600 text-center">
          Our mission is to make healthcare accessible to underserved
          communities by organizing medical camps that provide free
          consultations, treatments, and health education. Together, we aim to
          build a healthier and more informed society.
        </p>
      </div>

      {/* Key Achievements */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition duration-300"
          >
            <div className="mb-4">{stat.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {stat.title}
            </h3>
            <p className="text-3xl font-extrabold text-pink-800">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisionImpactSection;
