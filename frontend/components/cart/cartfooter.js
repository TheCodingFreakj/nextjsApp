import React, { useState, useEffect } from "react";
import { Divider, Button, Segment, Icon } from "semantic-ui-react";
import calculateProductTotal from "../utils/calcCartTotal";
import calculateServiceTotal from "../utils/calcServiceCartTotal";

import { useRouter } from "next/router";
import { isAuth, getCookie } from "../../actions/setAuthToken";

const CartFooter = ({ carlist, handleCheckout }) => {
  console.log(carlist);
  const [cartAmount, setcartAmount] = useState(0);
  const [stripeAmount, setStripeAmount] = useState(0);
  const [isCartEmpty, setCartEmpty] = useState(false);
  const router = useRouter();
  const user = isAuth();
  console.log(user._id);
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
          <p>
            <strong>Sub-Total:</strong>${cartAmount}
          </p>

          <Divider />
          <div style={{ background: "green", padding: "1%" }}>
            <p style={{ color: "white" }}>
              <strong>Subscription 1st emi:</strong>${stripeAmount}
            </p>

            <div style={{ position: "absolute", top: "35%", left: "70%" }}>
              <Button
                icon="cart"
                disabled={isCartEmpty}
                color="green"
                floated="right"
                content="Subscribe|Services|Tools"
                onClick={() =>
                  router.push(
                    `/payment/subscribe?user=${user._id}&amttt=${stripeAmount}&email=${user.email}`
                  )
                }
              />
            </div>
          </div>

          <Divider />
          <div style={{ background: "green", padding: "1%" }}>
            <p style={{ color: "white" }}>
              <strong>Subscription 2st emi:</strong>${stripeAmount}
            </p>
            <div style={{ position: "absolute", top: "68%", left: "70%" }}>
              <Button
                icon="cart"
                disabled={isCartEmpty}
                color="green"
                floated="right"
                content="Subscribe|Services|Tools"
                onClick={() =>
                  router.push(
                    `/payment/subscribe?user=${user._id}&amttt=${stripeAmount}&email=${user.email}`
                  )
                }
              />
            </div>
          </div>
        </Segment>
      </>
    </React.Fragment>
  );
};

export default CartFooter;
//https://www.toptal.com/react/testing-react-hooks-tutorial
//https://stripe.com/docs/stripe-js/react
//https://blog.logrocket.com/integrating-stripe-react-stripe-js/
