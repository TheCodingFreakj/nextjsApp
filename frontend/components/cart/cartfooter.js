import React, { useState, useEffect } from "react";
import { Divider, Button, Segment, Icon } from "semantic-ui-react";
import calculateProductTotal from "../utils/calcCartTotal";
import calculateServiceTotal from "../utils/calcServiceCartTotal";
import SubscribedProducts from "../../components/payment/subscribe";
import InvoicedItems from "../../components/payment/invoice";
import { Router, useRouter } from "next/router";

const CartFooter = ({ carlist }) => {
  //console.log(carlist);
  const [cartAmount, setcartAmount] = useState(0);
  const [stripeAmount, setStripeAmount] = useState(0);
  const [isCartEmpty, setCartEmpty] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const { cartTotal, stripeTotal } = calculateProductTotal(carlist);
    const { servicecartTotal, servicestripeTotal } = calculateServiceTotal(
      carlist
    );

    const stripe = stripeTotal + servicestripeTotal;

    const cartPriceTotal = Math.round(cartTotal) + Math.round(servicecartTotal);
    setcartAmount(cartPriceTotal);
    setStripeAmount(stripe);
    setCartEmpty(
      carlist.serviceCarts.length === 0 && carlist.toolcarts.length === 0
    );
  }, []);

  return (
    <React.Fragment>
      <>
        <Divider />

        <Segment clearing size="large">
          <Button
            icon="shop"
            onClick={() => router.back()}
            color="green"
            floated="right"
            content="Add More"
          />
          <strong>Sub-Total:</strong>${cartAmount}
          <SubscribedProducts
            stripeAmount={stripeAmount}
            isCartEmpty={isCartEmpty}
          />
          {/* <InvoicedItems
            stripeAmount={stripeAmount}
            isCartEmpty={isCartEmpty}
          /> */}
        </Segment>
      </>
    </React.Fragment>
  );
};
//checkout?
export default CartFooter;
//https://www.toptal.com/react/testing-react-hooks-tutorial
