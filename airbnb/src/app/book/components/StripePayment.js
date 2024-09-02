"use client";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useEffect, useState } from "react";
import axiosClient from "@/api/axiosClient";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY, {
  locale: "eng",
});

export default function StripePayment({
  idProperty,
  totalPrice,
  user,
  calendar,
  quantityTypeGuest,
  clientSecret,
  setClientSecret,
  setIsLoading,
}) {
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    axiosClient
      .post("/payment/create-payment-intent", {
        infoPayment: [
          {
            id: idProperty,
            totalPrice,
            customerEmail: user.email,
            customerName: user.username,
            customerId: user.id,
            checkIn: calendar[0].startDate,
            checkOut: calendar[0].endDate,
            guestTypes: { ...quantityTypeGuest },
          },
        ],
      })
      .then((response) => {
        // Xử lý dữ liệu từ phản hồi của API
        setClientSecret(response.clientSecret);
        setIsLoading(false);
      })

      .catch((error) => {
        // Xử lý lỗi
        console.error("Error creating PaymentIntent:", error);
      });
  }, [calendar, idProperty, quantityTypeGuest, totalPrice, user]);
  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="py-5">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
