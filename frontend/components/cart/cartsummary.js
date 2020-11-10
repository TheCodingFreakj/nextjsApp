import React, { useState, useEffect } from "react";
import { Divider, Button, Segment, Icon } from "semantic-ui-react";
import calculateProductTotal from "../utils/calcCartTotal";
const CartSummary = ({ products }) => {
  //console.log(product);
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
      </Segment>
    </>
  );
};

export default CartSummary;
