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

import Subscribe from "../../../components/payment/subscribe";
const Subscriptions = () => {
  //get both the carts
  const user = isAuth();

  return (
    <Layout>
      <React.Fragment>
        <Subscribe />
      </React.Fragment>
    </Layout>
  );
};

export default Subscriptions;
