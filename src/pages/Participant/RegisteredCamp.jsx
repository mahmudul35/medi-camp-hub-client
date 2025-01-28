import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useContextt from "../../hooks/useContext";
const stripePromise = loadStripe(
  "pk_test_51Qj6TYR5A2VhwpSvMcd7oAYjQsyXv6pVD7mUJhdRjTXiRqMmUP7ipoKnfzAIrXiMxyIga84jqGw77Uf6bih0CcbV00iwed8jSS"
);

const FeedbackModal = ({ camp, onClose, onFeedbackSubmitted }) => {
  const [feedbackText, setFeedback] = useState("");
  const [rating, setRating] = useState("");
  console.log(camp);
  const handleFeedbackSubmit = async (event) => {
    event.preventDefault();

    const feedbackData = {
      campId: camp._id,
      campName: camp.campName,
      participantEmail: camp.participantEmail,
      feedbackText,
      rating,
      // date: new Date(),
    };

    try {
      const response = await axios.post(
        "https://medi-camp-hub-sever.vercel.app/submitFeedback",
        feedbackData
      );
      alert("Feedback submitted successfully!");
      onFeedbackSubmitted();
      onClose();
    } catch (error) {
      alert("Failed to submit feedback.");
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          Feedback for {camp.campName}
        </h2>
        {/* <p className="text-gray-600 mb-4">
          <strong>Date:</strong> {new Date(camp.dateTime).toLocaleDateString()}
        </p> */}
        <form onSubmit={handleFeedbackSubmit}>
          <textarea
            className="w-full border rounded p-2 mb-3"
            rows="4"
            placeholder="Write your feedback..."
            value={feedbackText}
            onChange={(e) => setFeedback(e.target.value)}
            required
          ></textarea>
          <input
            type="number"
            className="w-full border rounded p-2 mb-3"
            placeholder="Rate out of 5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
            required
          />
          <button
            type="submit"
            className="w-full bg-pink-800 text-white py-2 px-4 rounded hover:bg-pink-700"
          >
            Submit Feedback
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full mt-2 bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

const CheckoutForm = ({ amount, onClose, campName }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useContextt();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchClientSecret = async () => {
      const response = await axiosSecure.post("/create-payment-intent", {
        amount,
      });

      setClientSecret(response.data.clientSecret);
    };
    fetchClientSecret();
  }, [amount]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      setProcessing(false);
      return;
    }

    const { id } = paymentMethod;

    try {
      const response = await axiosSecure.post("/create-payment-intent", {
        amount: amount,
      });

      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: user?.displayName || "anonymous",
              email: user?.email || "anonymous",
            },
          },
        }
      );

      if (error) {
        setError(error.message);
        setProcessing(false);
        return;
      }
      if (paymentIntent.status === "succeeded") {
        setSuccess(true);

        setTransactionId(paymentIntent.id);

        Swal.fire({
          icon: "success",
          title: "Payment Successful",
          subtitle: `your transactionId is ${paymentIntent.id}`,
          showConfirmButton: false,
          timer: 1500,
        });

        const paymentInfo = {
          campName: campName,
          participantId: user.email,
          transactionId: paymentIntent.id,
          fees: amount,
          date: new Date(),
          paymentStatus: "Pending",
        };

        const res = await axiosSecure.post("/payment", paymentInfo);
        navigate("paymentHistory");
      } else {
        setError("Payment failed");
      }

      if (response.data.success) {
        setSuccess(true);
      } else {
        setError("Payment failed");
      }
    } catch (err) {
      setError("Payment failed");
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="border border-gray-300 p-2 rounded" />
      <button
        type="submit"
        disabled={!stripe || processing}
        className="bg-pink-800 text-white px-4 py-2 rounded hover:bg-pink-700"
      >
        {processing ? "Processing..." : `Pay $${amount}`}
      </button>
      {/* {error && <div className="text-red-500">{error}</div>} */}
      {transactionId && (
        <div className="text-green-500">
          Your Transaction ID: {transactionId}
        </div>
      )}
      {success && <div className="text-green-500">Payment Successful!</div>}
      <button
        type="button"
        onClick={onClose}
        className="text-gray-600 underline text-sm"
      >
        Close
      </button>
    </form>
  );
};

const RegisteredCamps = ({ participantId }) => {
  const navigate = useNavigate();
  const [camps, setCamps] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const { user } = useContextt();

  useEffect(() => {
    fetchCamps();
  }, []);

  const fetchCamps = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/registeredParticipants/${user.email}`
      );
      setCamps(response.data);
    } catch (error) {
      console.error("Error fetching camps:", error);
    }
  };

  const openFeedbackModal = (camp) => {
    setSelectedCamp(camp);
    setIsFeedbackModalOpen(true);
  };

  // const handleCancel = async (participantId, paymentStatus) => {
  //   if (paymentStatus === "Paid") {
  //     alert("Cannot cancel a paid registration.");
  //     return;
  //   }

  //   if (window.confirm("Are you sure you want to cancel this registration?")) {
  //     try {
  //       await axios.delete(
  //         `https://medi-camp-hub-sever.vercel.app/cancelRegistration/${participantId}`
  //       );
  //       alert("Registration canceled successfully!");
  //       fetchCamps();
  //     } catch (error) {
  //       alert("Failed to cancel registration.");
  //     }
  //   }
  // };

  const handleCancel = async (participantId, paymentStatus) => {
    if (paymentStatus === "Paid") {
      Swal.fire({
        icon: "warning",
        title: "Cannot Cancel",
        text: "This registration has already been paid and cannot be canceled.",
      });
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You are about to cancel this registration.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `http://localhost:3000/cancelRegistration/${participantId}`
          );
          Swal.fire(
            "Canceled!",
            "The registration has been canceled.",
            "success"
          );
          fetchCamps();
        } catch (error) {
          Swal.fire("Error!", "Failed to cancel the registration.", "error");
        }
      }
    });
  };

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-pink-800 mb-12">
        Registered Camps
      </h1>
      <div className="overflow-x-auto">
        {/* <table className="table-auto w-full bg-white shadow-lg rounded-lg">
          <thead className="bg-pink-800 text-white">
            <tr>
              <th className="px-4 py-2">Camp Name</th>
              <th className="px-4 py-2">Fees</th>
              <th className="px-4 py-2">Participant Name</th>
              <th className="px-4 py-2">Payment Status</th>
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
                <td className="px-4 py-2 space-x-2">
                  {camp.paymentStatus !== "Paid" && (
                    <button
                      className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                      onClick={() => {
                        setSelectedCamp(camp);
                        setIsModalOpen(true);
                      }}
                    >
                      Pay
                    </button>
                  )}
                  {camp.paymentStatus !== "Paid" && (
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                      onClick={() => handleCancel(camp.campId)}
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
        {/* Table */}
        <table className="table-auto w-full bg-white shadow-lg rounded-lg">
          {camps.length > 0 ? (
            <thead className="bg-pink-800 text-white">
              <tr>
                <th className="px-4 py-2">Camp Name</th>
                <th className="px-4 py-2">Fees</th>
                <th className="px-4 py-2">Participant Name</th>
                <th className="px-4 py-2">Payment Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
          ) : (
            <h1>No registered camp available</h1>
          )}
          <tbody>
            {camps.map((camp) => (
              <tr key={camp._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{camp.campName}</td>
                <td className="px-4 py-2">${camp.campFees}</td>
                <td className="px-4 py-2">{camp.participantName}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full ${
                      camp.paymentStatus === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {camp.paymentStatus || "Unpaid"}
                  </span>
                </td>
                <td className="px-4 py-2 space-x-2">
                  {camp.paymentStatus !== "Paid" && (
                    <button
                      className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                      onClick={() => {
                        setSelectedCamp(camp);
                        setIsModalOpen(true);
                      }}
                    >
                      Pay
                    </button>
                  )}
                  {camp.paymentStatus !== "Paid" && (
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                      onClick={() =>
                        handleCancel(camp.campId, camp.paymentStatus)
                      }
                    >
                      Cancel
                    </button>
                  )}
                  {camp.paymentStatus === "Paid" && (
                    <button
                      className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                      onClick={() => openFeedbackModal(camp)}
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

      {/* Payment Modal */}
      {isModalOpen && selectedCamp && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              Payment for {selectedCamp.campName}
            </h2>
            <Elements stripe={stripePromise}>
              <CheckoutForm
                amount={selectedCamp.campFees}
                campName={selectedCamp.campName}
                onClose={() => setIsModalOpen(false)}
              />
            </Elements>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {isFeedbackModalOpen && selectedCamp && (
        <FeedbackModal
          camp={selectedCamp}
          onClose={() => setIsFeedbackModalOpen(false)}
          onFeedbackSubmitted={fetchCamps}
        />
      )}
    </div>
  );
};

export default RegisteredCamps;
