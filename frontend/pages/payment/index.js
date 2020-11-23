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
import Layout from "../../components/Layout";
import { isAuth, getCookie } from "../../actions/setAuthToken";
import SubscribedProducts from "../../components/payment/subscribe";
import InvoicedItems from "../../components/payment/invoice";
const Payment = (props) => {
  //get both the carts
  const user = isAuth();
  console.log(props);
  return (
    <Layout>
      <React.Fragment></React.Fragment>
    </Layout>
  );
};

export default Payment;
