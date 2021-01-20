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
import { parsedataUrl } from "../../../components/utils/parseUrl";

const OrderSummary = () => {
  useEffect(() => {
    const response = parsedataUrl(decodeURIComponent(window.location.search));
    console.log(response.params);
    // console.log(response.params.user);
    // console.log(response.params.email, "", response.params.amttt);
    // setpaymentData({
    //   ...paymentData,
    //   email: response.params.email,
    //   amttt: response.params.amttt,
    //   user: response.params.user,
    // });
  }, []);
  return (
    <div>
      Display Order Summary Show a button to tha payment form for confirmation
      of details
    </div>
  );
};

export default OrderSummary;
