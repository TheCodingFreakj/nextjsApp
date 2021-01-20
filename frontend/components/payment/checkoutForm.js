import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Icon,
  Header,
  Segment,
  Checkbox,
} from "semantic-ui-react";

import Head from "next/head";
import { getCookie } from "../../actions/setAuthToken";
import { createSubsription, subscribesession } from "../../actions/payment";
import { useRouter } from "next/router";
import parseMyUrl from "../../components/utils/parseUrl";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
const CheckoutForm = () => {
  //customerId and PriceId
  const [paymentData, setpaymentData] = useState({
    email: "",
    phone: "",
    billingAddress: "",
    amttt: "",
    user: "",
  });

  const [url, seturl] = useState("");
  console.log(url);
  const router = useRouter();
  useEffect(() => {
    let urlParams = new URLSearchParams(window.location.search);
    const response = parseMyUrl(urlParams);
    // console.log(response.params.user);
    // console.log(response.params.email, "", response.params.amttt);
    setpaymentData({
      ...paymentData,
      email: response.params.email,
      amttt: response.params.amttt,
      user: response.params.user,
    });
  }, []);

  const handleChange = (event) => {
    console.log(event.target.value);
    const { name, value } = event.target;
    setpaymentData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(paymentData);
    let paymentdata;
    paymentdata = {
      ...paymentData,
    };
    //https://javascript.info/url
    //https://www.geeksforgeeks.org/how-to-serialize-an-object-into-a-list-of-url-query-parameters-using-javascript/

    console.log(paymentdata);

    const stringurl = JSON.stringify(paymentdata);

    const urlquery = Object.keys(paymentdata)
      .map((ig_key) => {
        return ig_key + "=" + paymentdata[ig_key];
      })
      .join("&");

    console.log(urlquery);
    // console.log(stringurl);

    console.log(`${DOMAIN}`);

    // let url = encodeURI(new URL(`${DOMAIN}`));
    // console.log(url);
    let query = encodeURIComponent(`${urlquery}`);
    // url.searchParams.set("q", `${urlquery}!`);
    console.log(query);
    //url + "" +
    const urlF = query;
    console.log(urlF);
    seturl(urlF);
  };
  return (
    <React.Fragment>
      <Segment
        raised
        padded="very"
        compact
        inverted
        color="orange"
        size="large"
      >
        <Header as="h3" block color="green">
          <Icon name="address book" color="red" />
          We encourage You To Update This Form
        </Header>

        <Form onSubmit={handleSubmit}>
          <Form.Field
            control={Input}
            name="email"
            label="Email Address"
            placeholder="email"
            value={paymentData.email || ""}
            onChange={handleChange}
          />

          <Form.Field
            control={Input}
            name="phone"
            label="Phone"
            placeholder="phone"
            value={paymentData.phone || ""}
            onChange={handleChange}
          />

          <Form.Field
            control={Input}
            name="billingAddress"
            label="BillingAddress"
            placeholder="billingAddress"
            value={paymentData.billingAddress || ""}
            onChange={handleChange}
          />

          <Form.Field
            control={Input}
            name="amttt"
            label="Amount"
            placeholder="amttt"
            value={paymentData.amttt || ""}
            onChange={handleChange}
          />
          <Form.Field>
            <Checkbox
              label="I agree to the Terms and Conditions"
              defaultIndeterminate
            />
          </Form.Field>
          <Button
            icon="shop"
            color="green"
            floated="right"
            content="Confirm Data"
            onClick={() => router.push(`/payment/subscribe?pay=${url}`)}
          />
        </Form>
      </Segment>
    </React.Fragment>
  );
};

export default CheckoutForm;

//fill up this form
//go the check out pre build (Details of the object is stored)
//pay and go to the success url
//empty the cart on ce hit the success url and place an order with email and order id for the customer

////////////////////backend/////////////////////

//at create subscription
//get the customer from req user
//find the cart based on the customer or user
//caclc the cart totals again
//get the email from frontend
//see ifi tsi linked to stripe customer
//if not create the customer based on email
//create the subscription or
//add order to db
//empty the cart at backend
//send back order is to front end on the success url

//At the Backend
//https://stripe.com/docs/billing/prices-guide
//https://stripe.com/docs/billing/prices-guide
//https://stripe.com/docs/payments/accept-a-payment?integration=elements
//https://stripe.com/docs/billing/subscriptions/checkout/fixed-price

//posts//////
//https://blog.logrocket.com/building-payments-system-react-stripe/
//https://davidwalsh.name/step-step-guide-stripe-payments-react
//https://www.npmjs.com/package/react-script-loader
