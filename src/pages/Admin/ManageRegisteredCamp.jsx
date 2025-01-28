import axios from "axios";
import React, { useEffect, useState } from "react";
import useContextt from "../../hooks/useContext";
const ManageRegisteredCamps = () => {
  const [participants, setParticipants] = useState([]);
  const { user } = useContextt();

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

  const handleConfirmPayment = async (participantId) => {
    console.log(participantId);
    try {
      await axios.patch(
        `https://medi-camp-hub-sever.vercel.app/confirmPayment/${participantId}`
      );
      alert("Payment confirmed successfully!");
      fetchParticipants();
    } catch (error) {
      alert("Failed to confirm payment.");
    }
  };

  const handleCancelRegistration = async (
    participantId,
    paymentStatus,
    confirmationStatus
  ) => {
    if (paymentStatus === "Paid" && confirmationStatus === "Confirmed") {
      alert("Cannot cancel a confirmed and paid registration.");
      return;
    }

    if (window.confirm("Are you sure you want to cancel this registration?")) {
      try {
        await axios.delete(
          `https://medi-camp-hub-sever.vercel.app/cancelRegistration/${participantId}`
        );
        alert("Registration canceled successfully!");
        fetchParticipants();
      } catch (error) {
        alert("Failed to cancel registration.");
      }
    }
  };

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-pink-800 mb-12">
        Manage Registered Camps
      </h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-pink-800 text-white">
            <tr>
              <th className="px-4 py-2">Camp Name</th>
              <th className="px-4 py-2">Fees</th>
              <th className="px-4 py-2">Participant Name</th>
              <th className="px-4 py-2">Payment Status</th>
              <th className="px-4 py-2">Confirmation Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((participant) => (
              <tr key={participant._id} className="border-b">
                <td className="px-4 py-2">{participant.campName}</td>
                <td className="px-4 py-2">${participant.campFees}</td>
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
                    onClick={() =>
                      participant.confirmationStatus !== "Confirmed" &&
                      handleConfirmPayment(participant._id)
                    }
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRegisteredCamps;
