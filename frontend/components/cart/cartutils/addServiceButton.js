import React, { useState, useEffect } from "react";
import { Divider, Button, Segment, Icon } from "semantic-ui-react";

import ServiceTotal from "./servicetotal";
import EmiPlanPricing from "../emiplanpricing";
import { useRouter } from "next/router";
import "../../../static/styles.css";
import { API } from "../../../config";
import { isAuth } from "../../../actions/setAuthToken";
import { dataExtracter } from "../../utils/parseUrl";
const AddServiceButton = ({ servicecart = [] }) => {
  console.log("the cart in service, render 5", servicecart);

  const [serviceAmount, setServiceAmount] = useState(0);
  const [data, setData] = useState();
  const [formattedData, setformattedData] = useState();

  const router = useRouter();
  //console.log(router);
  // console.log("toolscart essentials", toolscart);
  // console.log("servicecart essentials", servicecart);

  useEffect(() => {
    const mounted = { current: true };

    if (mounted.current) {
      if (servicecart) {
        const { servicetotal } = ServiceTotal(servicecart);
        //console.log("servicetotal", servicetotal);
        console.log("is this running");
        setServiceAmount(servicetotal);
        const productinfo = dataExtracter(servicecart);
        console.log("productinfo", productinfo);
        const transformed = { ...productinfo.productin };

        if (typeof transformed == "undefined") {
          <p>...Loading</p>;
        } else {
          transformed ? setformattedData(transformed) : <p>No data Yet</p>;
        }
      }
    }

    return () => {
      mounted.current = false;
    };
  }, [servicecart]);

  const user = isAuth();

  // let toolinfo = encodeURIComponent(
  //   //quantity
  //   //name
  //eminum
  //duration
  //   `${user._id}  & $${serviceAmount}  & ${user.email}`
  // );
  let serviceQueryparams = encodeURIComponent(
    `${user._id}  & $${serviceAmount}  & ${user.email}`
  );

  let serviceinfo = "";
  formattedData
    ? (serviceinfo = encodeURIComponent(
        `${formattedData[0].quant}  & ${formattedData[0].productinfo[0].discountrate}  & ${formattedData[0].productinfo[0].name}& ${formattedData[0].productinfo[0].duration} `
      ))
    : null;

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
        </Segment>

        <Divider />

        <div className="emi-plan-extend">
          {servicecart == [] ? (
            <div>...Loading</div>
          ) : (
            <EmiPlanPricing
              serviceAmount={serviceAmount}
              serviceQueryparams={serviceQueryparams}
              servicecart={servicecart}
              serviceinfo={serviceinfo}
            />
          )}
        </div>
      </>
    </React.Fragment>
  );
};

export default AddServiceButton;
//how to implement error handle in react js
