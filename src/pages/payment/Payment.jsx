import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";

const stripePromise = loadStripe(
  "pk_test_51Qj6TYR5A2VhwpSvMcd7oAYjQsyXv6pVD7mUJhdRjTXiRqMmUP7ipoKnfzAIrXiMxyIga84jqGw77Uf6bih0CcbV00iwed8jSS"
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);

  const fetchClientSecret = async () => {
    const response = await axios.post("/api/payment-intent", {
      amount: 1000,
    });
    setClientSecret(response.data.clientSecret);
  };
  useEffect(() => {
    fetchClientSecret();
  }, []);

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
      const response = await axios.post("/api/payment", {
        amount: 1000,
        id,
      });

      if (response.data.success) {
        setSuccess(true);
      } else {
        setError("Payment failed");
      }
    } catch (error) {
      setError("Payment failed");
    }

    setProcessing(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow-md w-full max-w-md"
    >
      <h2 className="text-2xl font-semibold text-gray-800">Complete Payment</h2>
      <CardElement
        className="p-3 border border-gray-300 rounded-lg shadow-sm"
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full py-2 px-4 bg-pink-800 text-white font-semibold rounded-lg hover:bg-pink-700 transition duration-300 disabled:bg-gray-400"
      >
        {processing ? "Processing..." : "Pay $10.00"}
      </button>
      {error && <div className="text-red-600">{error}</div>}
      {success && (
        <div className="text-green-600 font-medium">Payment Successful!</div>
      )}
    </form>
  );
};

const Payment = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          &times;
        </button>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
