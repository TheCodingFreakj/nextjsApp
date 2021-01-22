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
import { dataExtracter } from "../utils/parseUrl";

const EmiPlanPricing = ({
  serviceAmount,
  serviceQueryparams,
  servicecart = [],
}) => {
  const router = useRouter();
  console.log("the cart in service, render 7", servicecart);
  //extract the quantity and slug or service name
  //see how the undefined value need to be handle
  const [data, setData] = useState();
  const [formattedData, setformattedData] = useState();

  useEffect(() => {
    const mounted = { current: true };

    if (mounted.current) {
      setData(servicecart);
      console.log(data);
      const productinfo = dataExtracter(data);
      console.log(productinfo);
      const transformed = { ...productinfo.productin };

      if (typeof transformed == "undefined") {
        <p>...Loading</p>;
      } else {
        setformattedData(transformed);
        console.log(transformed);
      }
    }

    return () => {
      mounted.current = false;
    };
  }, []);

  // console.log("formattedData", formattedData[0].quant);
  // console.log("formattedData", formattedData[0].productinfo[0].discountrate);
  // console.log("formattedData", formattedData[0].productinfo[0].name);
  // console.log("formattedData", formattedData[0].productinfo[0].duration);

  //   //quantity
  //   //name
  // eminum
  // duration

  // let serviceinfo = encodeURIComponent(
  //   `${formattedData[0].quant}  & ${formattedData[0].productinfo[0].discountrate}  & ${formattedData[0].productinfo[0].name}& ${formattedData[0].productinfo[0].duration} `
  // );

  // console.log(serviceinfo);
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
          onClick={() => router.push(`/payment/orders?q=${serviceQueryparams}`)}
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
