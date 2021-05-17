import React, { useState, useEffect } from "react";
import { getCookie } from "../../actions/setAuthToken";
import { createOrders } from "../../actions/shoppingcart";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
export default function CheckoutForm({ paymentData }) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [successMessage, setsuccessMesaage] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      setsuccessMesaage("Payment has been done");
    }
  };

  const token = getCookie("token");

  const confirmOrder = async (paymentData) => {
    await createOrders(paymentData, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setClientSecret(data.secret);
        setsuccessMesaage(data.msg);
        sessionStorage.setItem(clientSecret, clientSecret);
        //https://stripe.com/docs/payments/accept-a-payment?platform=web&ui=elements#web-fulfillment
      }
    });
  };

  return (
    <>
      <div className="checkoutform">
        <div className="product-info">
          <h3 className="product-title">Summary-Services and Tools </h3>
          <p className="product-duration">
            For Duration {paymentData.duration[0]} days respectively
          </p>
          <h3 className="product-title">Name: {paymentData.email} </h3>

          <h4 className="product-price">Price: {paymentData.amttt}</h4>
          <button onClick={() => confirmOrder(paymentData)}>
            Confirm Order
          </button>
          {successMessage ? (
            <h2 className="notification-note">{successMessage}</h2>
          ) : null}
        </div>
      </div>
      <form id="payment-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
        <button disabled={processing || disabled || succeeded} id="submit">
          <span id="button-text">
            {processing ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
        {/* Show any error that happens when processing the payment */}
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        {/* Show a success message upon completion */}
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          Payment succeeded, see the result in your
          <a href={`https://dashboard.stripe.com/test/payments`}>
            Stripe dashboard.
          </a>
          Refresh the page to pay again.
        </p>
      </form>
    </>
  );
}
