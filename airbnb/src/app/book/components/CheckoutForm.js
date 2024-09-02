import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { radio } from "@nextui-org/react";
import { BeatLoader } from "react-spinners";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if (!clientSecret) {
      console.log("Vào đây");
      return;
    }

    console.log("check");

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://google.com",
      },
      redirect: "if_required",
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.

    // if (error.type === "card_error" || error.type === "validation_error") {
    //   setMessage(error.message);
    // } else {
    //   setMessage("An unexpected error occurred.");

    console.log(paymentIntent);
    // }
    if (error) {
      console.error("error", error);
      // handleError();
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setMessage("Payment succeeded");
      // handleSuccess();
    } else {
      setMessage("Payment failed");
      // handleOther();
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: {
      type: "tabs", // Puede ser 'accordion' o 'tabs'
      defaultCollapsed: false,
      radios: false,
    },
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement
        id="payment-element"
        options={paymentElementOptions}
        className="border-0"
      />
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 my-2 rounded-md min-w-[220px] max-h-14 text-white font-bold"
      >
        <span id="button-text ">
          {isLoading ? <BeatLoader color="#000000" /> : "Request to book"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
