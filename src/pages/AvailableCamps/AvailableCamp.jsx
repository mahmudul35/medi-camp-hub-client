import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const AvailableCamp = () => {
  const [camps, setCamps] = useState([]);

  useEffect(() => {
    // Fetch popular camps from the backend
    axios
      .get("http://localhost:3000/availableCamps")
      .then((response) => setCamps(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-pink-800 mb-12">
        Explore Our Camps
      </h1>
      {/* {JSON.stringify(camps[12])} */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {camps.map((camp) => (
          <div
            key={camp._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 hover:shadow-2xl transition-transform duration-300"
          >
            <img src={camp.image} alt={camp.name} className="h-56 w-full" />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">
                {camp.name}
              </h3>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Location:</span> {camp.location}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Fees:</span> ${camp.fees}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Date:</span>{" "}
                {new Date(camp.dateTime).toLocaleDateString()}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Time:</span>{" "}
                {new Date(camp.dateTime).toLocaleTimeString()}
              </p>

              {/* <p className="text-gray-600 mb-1">
                <span className="font-semibold">Time:</span> {camp.time}
              </p> */}
              <p className="text-gray-600 mb-3">
                <span className="font-semibold">Participants:</span>{" "}
                {camp.participantCount}
              </p>
              <p className="text-gray-600 mb-3">
                <span className="font-semibold">Healthcare Professional:</span>{" "}
                {camp.healthcareProfessional}
              </p>
              <Link
                className="inline-block bg-pink-800 text-white font-medium py-2 px-4 rounded hover:bg-pink-700 transition duration-300 text-center"
                to={`/camp-details/${camp._id}`}
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableCamp;
