import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

const AddCamp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Include participantCount as 0
      const campData = { ...data, participantCount: 0 };

      // Send data to the backend
      const response = await axios.post(
        "http://localhost:3000/admin/camps",
        campData
      );
      if (response.status === 200) {
        alert("Camp added successfully!");
        // reset(); // Reset the form
      }
    } catch (error) {
      console.error("Failed to add camp", error);
      alert("Error adding camp. Please try again.");
    }
  };

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Add A Camp
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8"
      >
        {/* Camp Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Camp Name
          </label>
          <input
            type="text"
            {...register("name", { required: "Camp Name is required" })}
            className={`w-full border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded-lg p-2`}
            placeholder="Enter camp name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Image */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Image URL
          </label>
          <input
            type="text"
            {...register("image", { required: "Image URL is required" })}
            className={`w-full border ${
              errors.image ? "border-red-500" : "border-gray-300"
            } rounded-lg p-2`}
            placeholder="Enter image URL"
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        {/* Camp Fees */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Camp Fees ($)
          </label>
          <input
            type="number"
            {...register("fees", { required: "Camp Fees is required" })}
            className={`w-full border ${
              errors.fees ? "border-red-500" : "border-gray-300"
            } rounded-lg p-2`}
            placeholder="Enter camp fees"
          />
          {errors.fees && (
            <p className="text-red-500 text-sm mt-1">{errors.fees.message}</p>
          )}
        </div>

        {/* Date & Time */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Date & Time
          </label>
          <input
            type="datetime-local"
            {...register("dateTime", { required: "Date & Time is required" })}
            className={`w-full border ${
              errors.dateTime ? "border-red-500" : "border-gray-300"
            } rounded-lg p-2`}
          />
          {errors.dateTime && (
            <p className="text-red-500 text-sm mt-1">
              {errors.dateTime.message}
            </p>
          )}
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Location
          </label>
          <input
            type="text"
            {...register("location", { required: "Location is required" })}
            className={`w-full border ${
              errors.location ? "border-red-500" : "border-gray-300"
            } rounded-lg p-2`}
            placeholder="Enter location"
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">
              {errors.location.message}
            </p>
          )}
        </div>

        {/* Healthcare Professional */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Healthcare Professional
          </label>
          <input
            type="text"
            {...register("healthcareProfessional", {
              required: "Healthcare Professional is required",
            })}
            className={`w-full border ${
              errors.healthcareProfessional
                ? "border-red-500"
                : "border-gray-300"
            } rounded-lg p-2`}
            placeholder="Enter professional's name"
          />
          {errors.healthcareProfessional && (
            <p className="text-red-500 text-sm mt-1">
              {errors.healthcareProfessional.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className={`w-full border ${
              errors.description ? "border-red-500" : "border-gray-300"
            } rounded-lg p-2`}
            placeholder="Enter description"
            rows="4"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-pink-800 text-white py-3 px-6 rounded-lg hover:bg-pink-700 transition duration-300"
        >
          Add Camp
        </button>
      </form>
    </div>
  );
};

export default AddCamp;
