import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const imageHostingApi = `https://api.imgbb.com/1/upload?key=4276e99e16c8c70522c44d4e9b5eb595`;

const AddCamp = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const campData = { ...data, participantCount: 0 }; // Ensure it starts at 0

      // Prepare the image for upload
      const formData = new FormData();
      formData.append("image", campData.image[0]);

      // Upload image to imgbb
      const imageRes = await axios.post(imageHostingApi, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (imageRes.data?.data?.url) {
        campData.image = imageRes.data.data.url; // Add image URL to camp data

        // Send data to the backend
        const response = await axios.post(
          "https://medi-camp-hub-sever.vercel.app/admin/camps",
          campData
        );

        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Camp added successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          reset(); // Reset form after success
        }
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error Adding Camp",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-pink-800 mb-8">
        Add A New Camp
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-xl rounded-lg p-8"
      >
        {/* Camp Name */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">Camp Name</label>
          <input
            type="text"
            {...register("name", { required: "Camp Name is required" })}
            className="w-full border rounded-lg p-2"
            placeholder="Enter camp name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">
            Upload Image
          </label>
          <input
            type="file"
            {...register("image", { required: "Image is required" })}
            className="w-full border rounded-lg p-2"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>

        {/* Camp Fees */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">
            Camp Fees ($)
          </label>
          <input
            type="number"
            {...register("fees", { required: "Camp Fees is required" })}
            className="w-full border rounded-lg p-2"
            placeholder="Enter camp fees"
          />
          {errors.fees && (
            <p className="text-red-500 text-sm">{errors.fees.message}</p>
          )}
        </div>

        {/* Date & Time */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">
            Date & Time
          </label>
          <input
            type="datetime-local"
            {...register("dateTime", { required: "Date & Time is required" })}
            className="w-full border rounded-lg p-2"
          />
          {errors.dateTime && (
            <p className="text-red-500 text-sm">{errors.dateTime.message}</p>
          )}
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">Location</label>
          <input
            type="text"
            {...register("location", { required: "Location is required" })}
            className="w-full border rounded-lg p-2"
            placeholder="Enter location"
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location.message}</p>
          )}
        </div>

        {/* Healthcare Professional */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">
            Healthcare Professional Name
          </label>
          <input
            type="text"
            {...register("healthcareProfessional", {
              required: "Healthcare Professional Name is required",
            })}
            className="w-full border rounded-lg p-2"
            placeholder="Enter professional's name"
          />
          {errors.healthcareProfessional && (
            <p className="text-red-500 text-sm">
              {errors.healthcareProfessional.message}
            </p>
          )}
        </div>

        {/* Participant Count (Fixed at 0) */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">
            Participant Count (Starts at 0)
          </label>
          <input
            type="number"
            value={0}
            disabled
            className="w-full border rounded-lg p-2 bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full border rounded-lg p-2"
            placeholder="Enter description"
            rows="3"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-800 text-white py-3 px-6 rounded-lg hover:bg-pink-700 transition duration-300"
        >
          {loading ? "Adding Camp..." : "Add Camp"}
        </button>
      </form>
    </div>
  );
};

export default AddCamp;
