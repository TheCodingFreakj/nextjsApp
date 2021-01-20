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
//import CheckoutForm from "../../../components/payment/checkoutForm";
import OrderSummary from "../../../components/payment/orders/ordersummary";
const Subscribe = () => {
  //get both the carts
  const user = isAuth();

  return (
    <Layout>
      <React.Fragment>
        <OrderSummary />
        {/* <CheckoutForm /> */}
      </React.Fragment>
    </Layout>
  );
};

export default Subscribe;
