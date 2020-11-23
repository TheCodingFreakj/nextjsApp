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
const Invoice = ({ router }) => {
  //get both the carts
  const user = isAuth();
  //unit productcount
  //price policy: price per days
  return (
    <Layout>
      <React.Fragment>Invoice Route</React.Fragment>
    </Layout>
  );
};

export default withRouter(Invoice);
