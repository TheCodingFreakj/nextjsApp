import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Icon,
  Header,
  Segment,
  Checkbox,
} from "semantic-ui-react";
import { checkoutdataparser } from "../../components/utils/parseUrl";
import CheckoutForm from "../../components/payment/checkoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { createOrders } from "../../actions/shoppingcart";
import { getCookie } from "../../actions/setAuthToken";
//This is publishablekey
//This function returns a Promise that resolves with a newly created Stripe object once Stripe.js has loaded.
//The loadStripe() function is asynchronous and loads the stripe-js script with the Stripe object.

// const stripePromise = loadStripe(
//   "pk_test_51HaLO5GERwFTkr9G4zOzmAbJmqkiO51f25Nk3gpg8FIlkbFK3QCtc1GF1Kv75TBzVUROT7NVHoS3QHXUf5gUvQmg00SYpumSjq"
// );

// What it means is actually on each render you will get new promise object (new stripePromise) every time, that's exactly what <Element> component is complaining about.
// What you should do instead, to not get new instance all the time on render,
//  you should put loadStripe function in state,
//  but because it is a function, you actually need to wrap it up in another function
//  because of this
// - https://reactjs.org/docs/hooks-reference.html#lazy-initial-state.

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
//https://github.com/stripe-samples/accept-a-card-payment/blob/master/using-webhooks/server/node/server.js#L37-L40

//Loading  Stripe.js as a module on this page
//After Loading need to create an instance of the Stripe object and initialize it
//The Stripe object is your entrypoint to the rest of the Stripe.js SDK.
//getting the key
//loadstripe returns a promise to be passed to the Element component of stripe
//https://davidwalsh.name/step-step-guide-stripe-payments-react
//https://www.pluralsight.com/guides/how-to-integrate-stripe-with-react
//https://blog.logrocket.com/building-payments-system-react-stripe/
// const createOrders = (paymentData) => {
//   createOrders(paymentData, token).then((data) => {
//     console.log(data);
//   });
// };
// createOrders(paymentData);
