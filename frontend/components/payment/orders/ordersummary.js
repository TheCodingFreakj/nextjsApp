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
  const [paymentData, setpaymentData] = useState({});
  // useEffect(() => {
  //   console.log(window.location.search);
  //   const response = parsedataUrl(decodeURIComponent(window.location.search));
  //   console.log("This is params object response", response.params);
  //   let dataforbackend = Object.values(response.params).map((p, i) => {
  //     return p;
  //   });
  //   console.log("This is the data array for backend", dataforbackend);

  //   // think of adding data to state until the confirm button is hit
  //   setpaymentData(response.params);
  //   console.log(paymentData);
  // }, []);

  // const showdata = (data) => {
  //   return (
  //     <>
  //       {" "}
  //       <div>{data[1]}</div>
  //       <div>{data[2]}</div>
  //       <div>{data[3]}</div>
  //       <div>{data[4]}</div>
  //       <div>{data[5]}</div>
  //       <div>{data[6]}</div>{" "}
  //     </>
  //   );
  // };
  return (
    <div>
      Display Order Summary Show a button to tha payment form for confirmation
      of details
      {/* {showdata(paymentData)} */}
      {/* <p>
        Confirm the tool name discountrate, amount and pricing model
        subscription for duration
      </p>
      <p>Confirm the service name discountrate, amount as per emi initial</p>
      <p>Confirm the service name discountrate, amount as per emi last</p>
      <p>create a starts the tools subscription </p>
      <p>
        create a component that create charges as emi ask to set reminder for
        next emi
      </p> */}
    </div>
  );
};

export default OrderSummary;
