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

const InvoicedItems = (props) => {
  console.log(props);
  //make tools subscription
  //make invoicing
  //quantity per
  const router = useRouter();

  return (
    <React.Fragment>
      <Button
        icon="cart"
        disabled={props.isCartEmpty}
        color="green"
        floated="right"
        content="Invoice| Web Development "
        onClick={() => router.push("/payment")}
      />
    </React.Fragment>
  );
};

export default InvoicedItems;
