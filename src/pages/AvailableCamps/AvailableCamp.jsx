import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AvailableCamp = () => {
  const [camps, setCamps] = useState([]);
  const [filteredCamps, setFilteredCamps] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [isTwoColumnLayout, setIsTwoColumnLayout] = useState(false);

  useEffect(() => {
    // Fetch camps from the backend
    axios
      .get("http://localhost:3000/availableCamps")
      .then((response) => {
        setCamps(response.data);
        setFilteredCamps(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  // Handle search
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = camps.filter((camp) =>
      camp.name.toLowerCase().includes(query)
    );
    setFilteredCamps(filtered);
  };

  // Handle sorting
  const handleSort = (criteria) => {
    setSortBy(criteria);

    const sortedCamps = [...filteredCamps];
    if (criteria === "mostRegistered") {
      sortedCamps.sort((a, b) => b.participantCount - a.participantCount);
    } else if (criteria === "campFees") {
      sortedCamps.sort((a, b) => a.fees - b.fees);
    } else if (criteria === "alphabetical") {
      sortedCamps.sort((a, b) => a.name.localeCompare(b.name));
    }
    setFilteredCamps(sortedCamps);
  };

  // Toggle layout
  const toggleLayout = () => {
    setIsTwoColumnLayout(!isTwoColumnLayout);
  };

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-5xl font-extrabold text-center text-pink-800 mb-12">
        Explore Our Camps
      </h1>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search camps..."
          value={searchQuery}
          onChange={handleSearch}
          className="flex-grow border border-gray-300 rounded-lg px-4 py-3 shadow focus:ring focus:ring-pink-300"
        />

        {/* Sort Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => handleSort(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-3 shadow focus:ring focus:ring-pink-300"
        >
          <option value="">Sort By</option>
          <option value="mostRegistered">Most Registered</option>
          <option value="campFees">Camp Fees</option>
          <option value="alphabetical">Alphabetical Order</option>
        </select>

        {/* Layout Toggle */}
        <button
          onClick={toggleLayout}
          className="bg-pink-800 text-white px-6 py-3 rounded-lg shadow hover:bg-pink-700 transition duration-300"
        >
          {isTwoColumnLayout ? "Three Columns" : "Two Columns"}
        </button>
      </div>

      {/* Camps Grid */}
      <div
        className={`grid gap-8 ${
          isTwoColumnLayout
            ? "md:grid-cols-2"
            : "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        }`}
      >
        {filteredCamps.map((camp) => (
          <div
            key={camp._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 hover:shadow-2xl transition-transform duration-300"
          >
            <img
              src={camp.image}
              alt={camp.name}
              className="h-56 w-full object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
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
              <p className="text-gray-600 mb-3">
                <span className="font-semibold">Participants:</span>{" "}
                {camp.participantCount}
              </p>
              <p className="text-gray-600 mb-3">
                <span className="font-semibold">Healthcare Professional:</span>{" "}
                {camp.healthcareProfessional}
              </p>
              <Link
                className="block bg-pink-800 text-white font-medium py-2 px-4 rounded-lg text-center hover:bg-pink-700 transition duration-300"
                to={`/camp-details/${camp._id}`}
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredCamps.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          No camps found. Try adjusting your search or filters.
        </p>
      )}
    </div>
  );
};

export default AvailableCamp;
