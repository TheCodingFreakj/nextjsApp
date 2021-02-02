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
import { isAuth } from "../../../actions/setAuthToken";

import Checkout from "../../../components/payment/checkout";
const CheckoutProd = () => {
  const user = isAuth();

  return (
    <Layout>
      <React.Fragment>
        <Checkout />
      </React.Fragment>
    </Layout>
  );
};

export default CheckoutProd;
