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
import { loadStripe } from "@stripe/stripe-js";
import Head from "next/head";
import { getCookie } from "../../actions/setAuthToken";
import { createSubsription, subscribesession } from "../../actions/payment";
import { useRouter } from "next/router";
import parseMyUrl from "../../components/utils/parseUrl";
const stripePromise = loadStripe(
  "pk_test_51HaLO5GERwFTkr9G4zOzmAbJmqkiO51f25Nk3gpg8FIlkbFK3QCtc1GF1Kv75TBzVUROT7NVHoS3QHXUf5gUvQmg00SYpumSjq"
);

const CheckoutForm = () => {
  //customerId and PriceId
  const [paymentData, setpaymentData] = useState({
    email: "",
    phone: "",
    billingAddress: "",
    amttt: "",
    user: "",
  });

  const head = () => (
    <Head>
      <script src="https://js.stripe.com/v3/"></script>
    </Head>
  );
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

    // Get Stripe.js instance
    const stripe = await stripePromise;

    // // Call your backend to create the subcriptiopon route Session
    const response = await createSubsription(paymentData, getCookie("token"));
    console.log(response);
    // const session = await response.json();

    // // When the customer clicks on the button, redirect them to Checkout.
    // const result = await stripe.redirectToCheckout({
    //   sessionId: session.id,
    // });

    // if (result.error) {
    //   // If `redirectToCheckout` fails due to a browser or network
    //   // error, display the localized error message to your customer
    //   // using `result.error.message`.
    // }
  };
  return (
    <React.Fragment>
      {head()}
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
        {/* success={success} onSubmit={handleSubmit} */}
        {/* onSubmit={handleSubmit} */}
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
