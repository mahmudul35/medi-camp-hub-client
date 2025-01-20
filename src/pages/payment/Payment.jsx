import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React, { useState } from "react";

const stripePromise = loadStripe(
  "pk_test_51Qj6TYR5A2VhwpSvMcd7oAYjQsyXv6pVD7mUJhdRjTXiRqMmUP7ipoKnfzAIrXiMxyIga84jqGw77Uf6bih0CcbV00iwed8jSS"
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);

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
      const response = await axios.post("/", {
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
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || processing}>
        {processing ? "Processing..." : "Pay"}
      </button>
      {error && <div>{error}</div>}
      {success && <div>Payment Successful!</div>}
    </form>
  );
};

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Payment;
