import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Header,
  Button,
  Segment,
  Icon,
  Item,
  Divider,
} from "semantic-ui-react";
import "../../static/styles.css";
import { useRouter } from "next/router";

const EmiPlanPricing = ({
  serviceAmount,
  serviceQueryparams,
  serviceinfo,
  servicecart = [],
}) => {
  const router = useRouter();
  console.log("the cart in service, render 7", servicecart);

  // console.log("formattedData", formattedData[0].quant);
  // console.log("formattedData", formattedData[0].productinfo[0].discountrate);
  // console.log("formattedData", formattedData[0].productinfo[0].name);
  // console.log("formattedData", formattedData[0].productinfo[0].duration);

  //   //quantity
  //   //name
  // eminum
  // duration

  //checking if rthere is data or not in formattedData

  // console.log(serviceinfo);
  // console.log(serviceQueryparams);
  return (
    <React.Fragment>
      <>
        <p>
          <strong>Subscription 1st emi:</strong>${serviceAmount}
        </p>
        <Button
          icon="cart"
          color="green"
          floated="right"
          content="Subscribe|Services"
          onClick={() =>
            router.push(
              `/payment/orders?q=${serviceQueryparams} & ${serviceinfo}`
            )
          }
        />

        <p>
          <strong>Subscription 2st emi:</strong>${serviceAmount}
        </p>

        <Button
          icon="cart"
          color="green"
          floated="right"
          content="Subscribe|Services"
          onClick={() => router.push(`/payment/orders?q=${serviceQueryparams}`)}
        />
      </>
    </React.Fragment>
  );
};

export default EmiPlanPricing;
