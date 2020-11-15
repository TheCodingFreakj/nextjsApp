import React, { useState, useEffect } from "react";
import { Divider, Button, Segment, Icon } from "semantic-ui-react";
import calculateProductTotal from "../utils/calcCartTotal";
import calculateServiceTotal from "../utils/calcServiceCartTotal";
import StripeCheckout from "react-stripe-checkout";
import { useRouter } from "next/router";
import { removeLocatStorage } from "../../actions/setAuthToken";
const CartSummary = ({ services, products }) => {
  const [cartAmount, setcartAmount] = useState(0);
  const [stripeAmount, setStripeAmount] = useState(0);
  const [isCartEmpty, setCartEmpty] = useState(false);

  const router = useRouter();
  useEffect(() => {
    const { cartTotal, stripeTotal } = calculateProductTotal(products);
    const { servicecartTotal, servicestripeTotal } = calculateServiceTotal(
      services
    );
    const cartPriceTotal = Math.round(cartTotal) + Math.round(servicecartTotal);
    setcartAmount(cartPriceTotal);
    setStripeAmount(stripeTotal);
    setCartEmpty(products.length === 0 && services.length === 0);
  }, [products, services]);
  return (
    <>
      <Divider />

      <Segment clearing size="large">
        <Button
          icon="shop"
          onClick={() => router.back()}
          color="green"
          floated="right"
          content="Click To Add More"
        />
        <Button
          icon="shop"
          onClick={() => router.reload()}
          color="yellow"
          floated="left"
          content="Reload"
        />
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
