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
// import parseMyUrl from "../../components/utils/parseUrl";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import CardSection from "../../components/payment/cardsection";
const CheckoutForm = () => {
  useEffect(() => {
    // console.log("This is running");

    //we set state of mounted to true.
    const mounted = { current: true };

    if (mounted.current) {
      //parse the url here and supply the values
      console.log("This is to be done");
    }

    return () => {
      mounted.current = false;
    };
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();

    // handle payment request
  };
  return (
    <React.Fragment>
      <div className="checkoutform">
        <div className="product-info">
          <h3 className="product-title">Apple MacBook Pro</h3>
          <h3 className="product-title">Name: That's your email </h3>
          <h3 className="product-title">Name: That's your number </h3>
          <h3 className="product-title">Confirming business address</h3>
          <h4 className="product-price">Price: $999</h4>
        </div>
        <form className="form-custom" onSubmit={handleSubmit}>
          <CardSection />

          <div className="click-pay">
            <Button
              icon="cart"
              color="yellow"
              floated="right"
              content="Pay 999"
              // onClick={() => router.push(`/payment/subscribe `)}
            />
          </div>
        </form>
      </div>
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
