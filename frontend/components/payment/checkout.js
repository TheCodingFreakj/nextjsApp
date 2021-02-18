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
import { checkoutdataparser } from "../../components/utils/parseUrl";
import CheckoutForm from "../../components/payment/checkoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
//This is publishablekey
//This function returns a Promise that resolves with a newly created Stripe object once Stripe.js has loaded.
//The loadStripe() function is asynchronous and loads the stripe-js script with the Stripe object.

// const stripePromise = loadStripe(
//   "pk_test_51HaLO5GERwFTkr9G4zOzmAbJmqkiO51f25Nk3gpg8FIlkbFK3QCtc1GF1Kv75TBzVUROT7NVHoS3QHXUf5gUvQmg00SYpumSjq"
// );

// What it means is actually on each render you will get new promise object (new stripePromise) every time, that's exactly what <Element> component is complaining about.
// What you should do instead, to not get new instance all the time on render,
//  you should put loadStripe function in state,
//  but because it is a function, you actually need to wrap it up in another function
//  because of this
// - https://reactjs.org/docs/hooks-reference.html#lazy-initial-state.

const Checkout = () => {
  const [paymentData, setpaymentData] = useState({
    email: "",
    // phone: "",
    duration: "",
    orderstat: "",
    amttt: "",
    user: "",
  });
  const [stripePromise, setStripePromise] = useState(() =>
    loadStripe(
      "pk_test_51HaLO5GERwFTkr9G4zOzmAbJmqkiO51f25Nk3gpg8FIlkbFK3QCtc1GF1Kv75TBzVUROT7NVHoS3QHXUf5gUvQmg00SYpumSjq"
    )
  );

  if (typeof window !== "undefined") {
    useEffect(() => {
      if (window.location.search) {
        const response = checkoutdataparser(
          decodeURIComponent(window.location.search)
        );

        response ? (
          setpaymentData({
            email: response.params.productioninfo[2],
            duration: [response.params.duration[1]],
            orderstat: response.params.productioninfo[3],
            amttt: response.params.productioninfo[1],
            user: response.params.productioninfo[0],
          })
        ) : (
          <p>Please wait while we calculate your shopping summary</p>
        );
      }
    }, [window.location.search]);
  }
  // console.log(paymentData);
  return (
    <div className="checkout-comp">
      {/* Get the  products details,  and create the stripe post
      here this is stripe form to collection all details''  */}
      <Elements stripe={stripePromise}>
        <CheckoutForm paymentData={paymentData} />
      </Elements>
    </div>
  );
};
export default Checkout;
//Loading  Stripe.js as a module on this page
//After Loading need to create an instance of the Stripe object and initialize it
//The Stripe object is your entrypoint to the rest of the Stripe.js SDK.
//getting the key
//loadstripe returns a promise to be passed to the Element component of stripe
//https://davidwalsh.name/step-step-guide-stripe-payments-react
//https://www.pluralsight.com/guides/how-to-integrate-stripe-with-react
//https://blog.logrocket.com/building-payments-system-react-stripe/

// //customerId and PriceId
// const [paymentData, setpaymentData] = useState({
//   email: "",
//   phone: "",
//   billingAddress: "",
//   amttt: "",
//   user: "",
// });

// const [url, seturl] = useState("");
// console.log(url);
// const router = useRouter();
// useEffect(() => {
//   let urlParams = new URLSearchParams(window.location.search);
//   const response = parseMyUrl(urlParams);
//   // console.log(response.params.user);
//   // console.log(response.params.email, "", response.params.amttt);
//   setpaymentData({
//     ...paymentData,
//     email: response.params.email,
//     amttt: response.params.amttt,
//     user: response.params.user,
//   });
// }, []);

// const handleChange = (event) => {
//   console.log(event.target.value);
//   const { name, value } = event.target;
//   setpaymentData((prevState) => ({ ...prevState, [name]: value }));
// };

// const handleSubmit = async (event) => {
//   event.preventDefault();
//   console.log(paymentData);
//   let paymentdata;
//   paymentdata = {
//     ...paymentData,
//   };
//   //https://javascript.info/url
//   //https://www.geeksforgeeks.org/how-to-serialize-an-object-into-a-list-of-url-query-parameters-using-javascript/

//   console.log(paymentdata);

//   const stringurl = JSON.stringify(paymentdata);

//   const urlquery = Object.keys(paymentdata)
//     .map((ig_key) => {
//       return ig_key + "=" + paymentdata[ig_key];
//     })
//     .join("&");

//   console.log(urlquery);
//   // console.log(stringurl);

//   console.log(`${DOMAIN}`);

//   // let url = encodeURI(new URL(`${DOMAIN}`));
//   // console.log(url);
//   let query = encodeURIComponent(`${urlquery}`);
//   // url.searchParams.set("q", `${urlquery}!`);
//   console.log(query);
//   //url + "" +
//   const urlF = query;
//   console.log(urlF);
//   seturl(urlF);
// };

// <Segment
//     raised
//     padded="very"
//     compact
//     inverted
//     color="orange"
//     size="large"
//   >
//     <Header as="h3" block color="green">
//       <Icon name="address book" color="red" />
//       We encourage You To Update This Form
//     </Header>

//     <Form onSubmit={handleSubmit}>
//       <Form.Field
//         control={Input}
//         name="email"
//         label="Email Address"
//         placeholder="email"
//         value={paymentData.email || ""}
//         onChange={handleChange}
//       />

//       <Form.Field
//         control={Input}
//         name="phone"
//         label="Phone"
//         placeholder="phone"
//         value={paymentData.phone || ""}
//         onChange={handleChange}
//       />

//       <Form.Field
//         control={Input}
//         name="billingAddress"
//         label="BillingAddress"
//         placeholder="billingAddress"
//         value={paymentData.billingAddress || ""}
//         onChange={handleChange}
//       />

//       <Form.Field
//         control={Input}
//         name="amttt"
//         label="Amount"
//         placeholder="amttt"
//         value={paymentData.amttt || ""}
//         onChange={handleChange}
//       />
//       <Form.Field>
//         <Checkbox
//           label="I agree to the Terms and Conditions"
//           defaultIndeterminate
//         />
//       </Form.Field>
//       <Button
//         icon="shop"
//         color="green"
//         floated="right"
//         content="Confirm Data"
//         onClick={() => router.push(`/payment/subscribe?pay=${url}`)}
//       />
//     </Form>
//   </Segment>
