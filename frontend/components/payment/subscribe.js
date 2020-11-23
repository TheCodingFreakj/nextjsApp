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

const SubscribedProducts = ({ isCartEmpty, stripeAmount }) => {
  console.log(stripeAmount, "", isCartEmpty);
  const router = useRouter();
  return (
    <React.Fragment>
      <Button
        icon="cart"
        disabled={isCartEmpty}
        color="green"
        floated="right"
        content="Subscribe|Services|Tools"
        onClick={() => router.push("/payment/subscribe")}
      />
    </React.Fragment>
  );
};

export default SubscribedProducts;
