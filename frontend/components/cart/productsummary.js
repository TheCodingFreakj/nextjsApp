import React, { useState, useEffect } from "react";
import { Divider, Button, Segment, Icon } from "semantic-ui-react";
import calculateProductTotal from "../utils/calcCartTotal";
import { useRouter } from "next/router";
import { removeLocatStorage } from "../../actions/setAuthToken";
const ProductSummary = ({ products }) => {
  console.log(products);
  const [cartAmount, setcartAmount] = useState(0);
  const [stripeAmount, setStripeAmount] = useState(0);
  const [isCartEmpty, setCartEmpty] = useState(false);

  const router = useRouter();
  useEffect(() => {
    //const { cartTotal, stripeTotal } = calculateProductTotal(products);
    const cartPriceTotal = Math.round(cartTotal);
    setcartAmount(cartPriceTotal);
    setStripeAmount(stripeTotal);
    setCartEmpty(products.length === 0);
  }, [products]);
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

export default ProductSummary;
