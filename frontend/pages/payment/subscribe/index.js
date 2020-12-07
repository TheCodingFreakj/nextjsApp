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

const Subscribe = ({ router }) => {
  //get both the carts
  const user = isAuth();

  return (
    <Layout>
      <React.Fragment>
        <CheckoutForm />
      </React.Fragment>
    </Layout>
  );
};

export default withRouter(Subscribe);
