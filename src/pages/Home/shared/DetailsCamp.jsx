import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useContextt from "../../../hooks/useContext";
const DetailsCamp = () => {
  const { user } = useContextt();
  const { id } = useParams();
  const [camp, setCamp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    participantName: user?.displayName,
    participantEmail: user?.email,
    age: "",
    phoneNumber: "",
    gender: "",
    emergencyContact: "",
  });

  useEffect(() => {
    axios
      .get(`https://medi-camp-hub-sever.vercel.app/camp/${id}`)
      .then((response) => {
        setCamp(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleJoinCamp = () => {
    const participantData = {
      campId: id,
      campName: camp.name,
      campFees: camp.fees,
      location: camp.location,
      healthcareProfessional: camp.healthcareProfessional,
      ...formData,
    };

    // Save participant data and update participant count
    axios
      .post(
        "https://medi-camp-hub-sever.vercel.app/registerParticipant",
        participantData
      )
      .then((response) => {
        // alert("Successfully registered for the camp!");

        Swal.fire({
          icon: "success",
          title: "Successfully registered for the camp!",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsModalOpen(false);
        setCamp((prevCamp) => ({
          ...prevCamp,
          participantCount: prevCamp.participantCount + 1,
        }));
      })
      .catch((error) => {
        alert("Failed to register for the camp. Please try again.");
      });
  };

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
              <span className="font-semibold">Date and Time:</span>{" "}
              {new Date(camp.dateTime).toLocaleDateString()}{" "}
              {new Date(camp.dateTime).toLocaleTimeString()}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Fees:</span>{" "}
              <span className="text-pink-800 font-bold">${camp.fees}</span>
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Participants:</span>{" "}
              {camp.participantCount}
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-6 w-full bg-pink-800 text-white py-3 px-6 rounded hover:bg-pink-700 transition duration-300"
            >
              Join Camp
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 text-xl">
          No camp details available.
        </p>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Join Camp</h2>
            <p className="text-gray-600 mb-2">
              <strong>Camp Name:</strong> {camp.name}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Fees:</strong> ${camp.fees}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Location:</strong> {camp.location}
            </p>
            <input
              type="text"
              name="participantName"
              disabled
              value={user?.displayName}
              onChange={handleInputChange}
              placeholder="Your Name"
              className="w-full border rounded mb-2 p-2"
            />
            <input
              type="email"
              name="participantEmail"
              value={user?.email}
              disabled
              onChange={handleInputChange}
              placeholder="Your Email"
              className="w-full border rounded mb-2 p-2"
            />
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="Your Age"
              className="w-full border rounded mb-2 p-2"
            />
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className="w-full border rounded mb-2 p-2"
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full border rounded mb-2 p-2"
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="text"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleInputChange}
              placeholder="Emergency Contact"
              className="w-full border rounded mb-4 p-2"
            />
            <button
              onClick={handleJoinCamp}
              className="w-full bg-pink-800 text-white py-2 px-4 rounded hover:bg-pink-700 transition duration-300"
            >
              Submit
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full mt-2 bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsCamp;
