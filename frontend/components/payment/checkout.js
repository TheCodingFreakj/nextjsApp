import React, { useState, useEffect } from "react";
import { checkoutdataparser } from "../../components/utils/parseUrl";
import CheckoutForm from "../../components/payment/checkoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { createOrders } from "../../actions/shoppingcart";
import { getCookie } from "../../actions/setAuthToken";
const Checkout = () => {
  const [paymentData, setpaymentData] = useState({
    email: "",
    duration: "",
    orderstat: "",
    amttt: "",
    user: "",
  });
  const [stripePromise, setStripePromise] = useState(() =>
    loadStripe(
      "pk_test_51HaLO5GERwFTkr9G4zOzmAbJmqkiO51f25Nk3gpg8FIlkbFK3QCtc1GF1Kv75TBzVUROT7NVHoS3QHXUf5gUvQmg00SYpumSjq"
    )
  );
  const token = getCookie("token");
  if (typeof window !== "undefined") {
    useEffect(() => {
      if (window.location.search) {
        const response = checkoutdataparser(
          decodeURIComponent(window.location.search)
        );

        response ? (
          setpaymentData({
            email: response.params.productioninfo[2],
            duration: [response.params.duration[1]],
            orderstat: response.params.productioninfo[3],
            amttt: response.params.productioninfo[1],
            user: response.params.productioninfo[0],
          })
        ) : (
          <p>Please wait while we calculate your shopping summary</p>
        );
      }
    }, [window.location.search]);
  }

  return (
    <div className="checkout-comp">
      <Elements stripe={stripePromise}>
        <CheckoutForm paymentData={paymentData} />
      </Elements>
    </div>
  );
};
export default Checkout;
