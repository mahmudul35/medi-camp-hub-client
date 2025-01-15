import axios from "axios";
import React, { useEffect, useState } from "react";

const PopularCamps = () => {
  const [camps, setCamps] = useState([]);

  useEffect(() => {
    // Fetch popular camps from the backend
    axios
      .get("http://localhost:3000/popularCamps")
      .then((response) => setCamps(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-pink-800 mb-8">
          Popular Medical Camps
        </h2>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {camps.map((camp) => (
            <div
              key={camp._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <img
                src={camp.image}
                alt={camp.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {camp.name}
                </h3>
                <p className="text-gray-600 mb-1">
                  <strong>Location:</strong> {camp.location}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Fees:</strong> ${camp.fees}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Date:</strong> {camp.date}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Time:</strong> {camp.time}
                </p>
                <p className="text-gray-600 mb-3">
                  <strong>Participants:</strong> {camp.participantCount}
                </p>
                <p className="text-gray-600 mb-3">
                  <strong>Healthcare Professional:</strong>{" "}
                  {camp.healthcareProfessional}
                </p>
                <button
                  className="bg-pink-800 text-white py-2 px-4 rounded hover:bg-pink-700 transition-colors duration-300"
                  onClick={() =>
                    (window.location.href = `/camp-details/${camp._id}`)
                  }
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button
            className="bg-pink-800 text-white py-3 px-6 rounded hover:bg-pink-700 transition-colors duration-300"
            onClick={() => (window.location.href = "/available-camps")}
          >
            See All Camps
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularCamps;
