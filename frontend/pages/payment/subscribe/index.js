import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Header,
  Icon,
  Button,
  Segment,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import Layout from "../../../components/Layout";
import { isAuth, getCookie } from "../../../actions/setAuthToken";
import { withRouter } from "next/router";
import CheckoutForm from "../../../components/payment/checkoutForm";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51HaLO5GERwFTkr9G4zOzmAbJmqkiO51f25Nk3gpg8FIlkbFK3QCtc1GF1Kv75TBzVUROT7NVHoS3QHXUf5gUvQmg00SYpumSjq"
);
const Subscribe = ({ router }) => {
  //get both the carts
  const user = isAuth();

  return (
    <Layout>
      <React.Fragment>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </React.Fragment>
    </Layout>
  );
};

export default withRouter(Subscribe);
