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

//decode everything
//store tools and service data in state

const OrderSummary = () => {
  const [tools, setTools] = useState();
  const [services, setServices] = useState();
  useEffect(() => {
    const response = parsedataUrl(decodeURIComponent(window.location.search));
    //console.log("This is params response", response.params);
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
      <p>
        Confirm the tool name discountrate, amount and pricing model
        subscription for duration
      </p>
      <p>Confirm the service name discountrate, amount as per emi initial</p>
      <p>Confirm the service name discountrate, amount as per emi last</p>
      <p>create a starts the tools subscription </p>
      <p>
        create a component that create charges as emi ask to set reminder for
        next emi
      </p>
    </div>
  );
};

export default OrderSummary;
