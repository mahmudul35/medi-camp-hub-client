import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailsCamp = () => {
  const { id } = useParams();
  const [camp, setCamp] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(camp);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/camp/${id}`)
      .then((response) => {
        setCamp(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-6 font-sans">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Camp Details
      </h1>
      {camp ? (
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex items-center justify-center">
            <img
              src={camp.image}
              alt={camp.name}
              className="w-full h-96 object-cover"
            />
          </div>

          <div className="p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {camp.name}
            </h2>
            <p className="text-gray-600 mb-4">{camp.description}</p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Location:</span> {camp.location}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Date:</span> {camp.date}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Fees:</span>{" "}
              <span className="text-pink-800 font-bold">${camp.fees}</span>
            </p>
            <button className="mt-6 w-full bg-pink-800 text-white py-3 px-6 rounded hover:bg-pink-700 transition duration-300">
              Join Camp
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 text-xl">
          No camp details available.
        </p>
      )}
    </div>
  );
};

export default DetailsCamp;
