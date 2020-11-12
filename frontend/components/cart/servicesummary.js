import React, { useState, useEffect } from "react";
import { Divider, Button, Segment, Icon } from "semantic-ui-react";
import calculateProductTotal from "../utils/calcCartTotal";
import StripeCheckout from "react-stripe-checkout";
const ServiceSummary = ({ products }) => {
  console.log(products);
  const [cartAmount, setcartAmount] = useState(0);
  const [stripeAmount, setStripeAmount] = useState(0);
  const [isCartEmpty, setCartEmpty] = useState(false);
  useEffect(() => {
    const { cartTotal, stripeTotal } = calculateProductTotal(products);
    setcartAmount(cartTotal);
    setStripeAmount(stripeTotal);
    setCartEmpty(products.length === 0);
  }, [products]);
  return (
    <>
      <Divider />
      <Segment clearing size="large">
        <strong>Sub-Total:</strong>${cartAmount}
        <Button
          icon="cart"
          disabled={isCartEmpty}
          color="green"
          floated="right"
          content="checkout"
        />
        {/* <StripeCheckout
          name="Marketing Solution App"
          amount={stripeAmount}
          currency="USD"
          shippingAddress={true}
          billingAddress={true}
          zipCode={true}
          token={handleCheckOut}
          triggerEvent="onClick"
          stripeKey="pk_test_51HaLO5GERwFTkr9G4zOzmAbJmqkiO51f25Nk3gpg8FIlkbFK3QCtc1GF1Kv75TBzVUROT7NVHoS3QHXUf5gUvQmg00SYpumSjq"
        >
          
        </StripeCheckout> */}
      </Segment>
    </>
  );
};

export default ServiceSummary;
