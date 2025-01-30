import axios from "axios";
import React, { useEffect, useState } from "react";
import useContextt from "../../hooks/useContext";

const ManageRegisteredCamps = () => {
  const [participants, setParticipants] = useState([]);
  const { user } = useContextt();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    try {
      const response = await axios.get(
        `https://medi-camp-hub-sever.vercel.app/registeredParticipants`
      );
      setParticipants(response.data);
    } catch (error) {}
  };

  const filteredParticipants = participants.filter(
    (participant) =>
      participant.campName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      participant.date?.includes(searchQuery) ||
      participant.healthcareProfessional
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredParticipants.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentParticipants = filteredParticipants.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-pink-800 mb-8">
        Manage Registered Camps
      </h1>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center items-center space-x-2">
        <input
          type="text"
          placeholder="Search by Camp Name, Date, or Healthcare Professional"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-800"
        />
        <button
          onClick={() => setSearchQuery("")}
          className="bg-pink-800 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition"
        >
          Clear
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-pink-800 text-white">
            <tr>
              <th className="px-4 py-2">Camp Name</th>
              <th className="px-4 py-2">Fees</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Participant Name</th>
              <th className="px-4 py-2">Payment Status</th>
              <th className="px-4 py-2">Confirmation Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          {/* {JSON.stringify(participants)} */}
          <tbody>
            {currentParticipants.length > 0 ? (
              currentParticipants.map((participant) => (
                <tr key={participant._id} className="border-b">
                  <td className="px-4 py-2">{participant.campName}</td>
                  <td className="px-4 py-2">${participant.campFees}</td>
                  <td className="px-4 py-2">{participant.location}</td>
                  <td className="px-4 py-2">{participant.participantName}</td>
                  <td className="px-4 py-2">
                    {participant.paymentStatus || "Unpaid"}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className={`py-1 px-3 rounded ${
                        participant.confirmationStatus === "Confirmed"
                          ? "bg-green-500 text-white"
                          : "bg-yellow-500 text-white hover:bg-yellow-600"
                      }`}
                      disabled={participant.confirmationStatus === "Confirmed"}
                    >
                      {participant.confirmationStatus || "Pending"}
                    </button>
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                      onClick={() =>
                        handleCancelRegistration(
                          participant._id,
                          participant.paymentStatus,
                          participant.confirmationStatus
                        )
                      }
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageRegisteredCamps;
