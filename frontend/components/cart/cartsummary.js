import React from "react";
import { Divider, Button, Segment, Icon } from "semantic-ui-react";
const CartSummary = () => {
  //console.log(product);

  return (
    <>
      <Divider />
      <Segment clearing size="large">
        <strong>Sub-Total:</strong>$0.00
        <Button icon="cart" color="green" floated="right" content="checkout" />
      </Segment>
    </>
  );
};

export default CartSummary;
