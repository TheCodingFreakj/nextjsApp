import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Header,
  Icon,
  Button,
  Segment,
  Dimmer,
  Loader,
} from "semantic-ui-react";

const SubscribedProducts = ({
  isCartEmpty,
  stripeAmount,
  loggedinUser,
  userId,
}) => {
  // console.log(stripeAmount, "", isCartEmpty, "", loggedinUser);
  const router = useRouter();
  return (
    <React.Fragment>
      <Button
        icon="cart"
        disabled={isCartEmpty}
        color="green"
        floated="right"
        content="Subscribe|Services|Tools"
        onClick={() =>
          router.push(
            `/payment/subscribe?user=${userId}&amttt=${stripeAmount}&email=${loggedinUser.email}`
          )
        }
      />
    </React.Fragment>
  );
};

export default SubscribedProducts;
