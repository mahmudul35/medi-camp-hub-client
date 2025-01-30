import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useContextt from "../../hooks/useContext";

const imageHostingApi = `https://api.imgbb.com/1/upload?key=4276e99e16c8c70522c44d4e9b5eb595`;

const OrganizerProfile = () => {
  const { user } = useContextt();
  const [organizer, setOrganizer] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    contact: "",
  });
  const [imageFile, setImageFile] = useState(null); // To store the uploaded file

  useEffect(() => {
    fetchOrganizerProfile();
  }, []);

  const fetchOrganizerProfile = async () => {
    try {
      const response = await axios.get(
        `https://medi-camp-hub-sever.vercel.app/users/${user?.email}`
      );
      setOrganizer(response.data);
      setFormData({
        name: response.data.name || "",
        image: response.data.image || "",
        contact: response.data.contact || "",
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); // Store the file
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    let updatedData = { ...formData };

    try {
      // If a new image is uploaded, upload to ImgBB first
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const imageRes = await axios.post(imageHostingApi, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (imageRes.data?.data?.url) {
          updatedData.image = imageRes.data.data.url; // Save uploaded image URL
        }
      }

      // Update profile in the database
      await axios.put(
        `https://medi-camp-hub-sever.vercel.app/users/${user?.email}`,
        updatedData
      );

      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your profile details have been successfully updated.",
        timer: 1500,
        showConfirmButton: false,
      });

      setOrganizer(updatedData);
      setEditing(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed!",
        text: "There was an error updating your profile.",
      });
    }
  };

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-pink-800 mb-12">
        Profile
      </h1>

      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
        {!editing ? (
          <>
            <div className="flex justify-center mb-6">
              <img
                src={organizer?.image || user?.photoURL || user?.photo} // Show default image if none exists
                alt={organizer?.name}
                className="w-32 h-32 object-cover rounded-full shadow-md"
              />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
              {organizer?.name}
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Contact: {organizer?.contact || "Not Provided"}
            </p>
            <button
              onClick={() => setEditing(true)}
              className="w-full bg-pink-800 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition duration-300"
            >
              Update Profile
            </button>
          </>
        ) : (
          <form onSubmit={handleUpdate}>
            {/* Name */}
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

            {/* Image Upload */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border rounded-lg p-2"
              />
            </div>

            {/* Contact */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Contact Information
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

            {/* Save Changes Button */}
            <button
              type="submit"
              className="w-full bg-pink-800 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition duration-300"
            >
              Save Changes
            </button>

            {/* Cancel Button */}
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

export default OrganizerProfile;
