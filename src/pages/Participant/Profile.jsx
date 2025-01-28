import axios from "axios";
import React, { useEffect, useState } from "react";
import useContextt from "../../hooks/useContext";
const ParticipantProfile = ({ participantId }) => {
  const { user } = useContextt();
  const [participant, setParticipant] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    photo: "",
    contact: "",
  });

  useEffect(() => {
    fetchParticipantProfile();
  }, []);

  const fetchParticipantProfile = async () => {
    try {
      const response = await axios.get(
        `https://medi-camp-hub-sever.vercel.app/users/${user?.email}`
      );
      setParticipant(response.data);
      setFormData({
        name: response.data.name || "",
        image: response.data.image || "",
        contact: response.data.contact || "",
      });
    } catch (error) {}
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `https://medi-camp-hub-sever.vercel.app/users/${user?.email}`,
        formData
      );
      alert("Profile updated successfully!");
      setParticipant((prev) => ({ ...prev, ...formData }));
      setEditing(false);
    } catch (error) {
      alert("Failed to update profile.");
    }
  };

  //   if (!participant) {
  //     return (
  //       <div className="flex justify-center items-center min-h-screen">
  //         <p className="text-gray-500 text-xl">Loading...</p>
  //       </div>
  //     );
  //   }

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-pink-800 mb-12">
        Participant Profile
      </h1>
      {/* {JSON.stringify(participant)} */}
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
        {!editing ? (
          <>
            <div className="flex justify-center mb-6">
              <img
                src={participant?.photo}
                alt={participant?.name}
                className="w-32 h-32 object-cover rounded-full shadow-md"
              />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
              {participant?.name}
            </h2>
            <p className="text-gray-600 text-center mb-6">
              {participant?.contact}
            </p>
            <button
              onClick={() => setEditing(true)}
              className="w-full bg-pink-800 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition duration-300"
            >
              Edit Profile
            </button>
          </>
        ) : (
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border rounded-lg p-2"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Image URL
              </label>
              <input
                type="text"
                name="photo"
                value={formData.photo}
                onChange={handleInputChange}
                className="w-full border rounded-lg p-2"
                placeholder="Enter image URL"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Contact
              </label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                className="w-full border rounded-lg p-2"
                placeholder="Enter contact details"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-pink-800 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition duration-300"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="w-full mt-2 bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ParticipantProfile;
