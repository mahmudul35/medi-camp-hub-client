import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useContextt from "../../hooks/useContext";
const RegisteredCamps = ({ participantId }) => {
  const navigate = useNavigate();
  const [camps, setCamps] = useState([]);
  const { user } = useContextt();
  useEffect(() => {
    fetchCamps();
  }, []);

  const fetchCamps = async () => {
    console.log(user.email);
    try {
      const response = await axios.get(
        `http://localhost:3000/registeredParticipants/${user.email}`
      );
      setCamps(response.data);
    } catch (error) {
      console.error("Error fetching camps:", error);
    }
  };

  //   const handlePay = async () => {
  //     navigate("/payment");
  //   };

  const handleCancel = async (participantId, paymentStatus) => {
    if (paymentStatus === "Paid") {
      alert("Cannot cancel a paid registration.");
      return;
    }

    if (window.confirm("Are you sure you want to cancel this registration?")) {
      try {
        await axios.delete(
          `http://localhost:3000/cancelRegistration/${participantId}`
        );
        alert("Registration canceled successfully!");
        fetchCamps();
      } catch (error) {
        console.error("Error canceling registration:", error);
        alert("Failed to cancel registration.");
      }
    }
  };

  const handleFeedback = async (campId) => {
    const feedback = prompt("Provide your feedback:");
    const rating = prompt("Rate the camp out of 5:");

    if (feedback && rating) {
      try {
        await axios.post("http://localhost:3000/submitFeedback", {
          campId,
          feedback,
          rating,
          date: new Date(),
        });
        alert("Feedback submitted successfully!");
      } catch (error) {
        console.error("Error submitting feedback:", error);
        alert("Failed to submit feedback.");
      }
    }
  };

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-pink-800 mb-12">
        Registered Camps
      </h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-lg rounded-lg">
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
            {camps.map((camp) => (
              <tr key={camp._id} className="border-b">
                <td className="px-4 py-2">{camp.campName}</td>
                <td className="px-4 py-2">${camp.campFees}</td>
                <td className="px-4 py-2">{camp.participantName}</td>
                <td className="px-4 py-2">{camp.paymentStatus || "Unpaid"}</td>
                <td className="px-4 py-2">
                  {camp.confirmationStatus || "Pending"}
                </td>
                <td className="px-4 py-2 space-x-2">
                  {camp.paymentStatus !== "Paid" && (
                    <Link
                      className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                      to="/dashboard/payment"
                    >
                      Pay
                    </Link>
                  )}
                  {camp.paymentStatus !== "Paid" && (
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                      onClick={() => handleCancel(camp.campId)}
                    >
                      Cancel
                    </button>
                  )}
                  {camp.paymentStatus === "Paid" &&
                    camp.confirmationStatus === "Confirmed" && (
                      <button
                        className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                        onClick={() => handleFeedback(camp._id)}
                      >
                        Feedback
                      </button>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegisteredCamps;
