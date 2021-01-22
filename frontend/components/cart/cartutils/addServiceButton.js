import React, { useState, useEffect } from "react";
import { Divider, Button, Segment, Icon } from "semantic-ui-react";

import ServiceTotal from "./servicetotal";
import EmiPlanPricing from "../emiplanpricing";
import { useRouter } from "next/router";
import "../../../static/styles.css";
import { API } from "../../../config";
import { isAuth } from "../../../actions/setAuthToken";
const AddServiceButton = ({ servicecart = [] }) => {
  console.log("the cart in service, render 5", servicecart);

  const [serviceAmount, setServiceAmount] = useState(0);

  const router = useRouter();
  //console.log(router);
  // console.log("toolscart essentials", toolscart);
  // console.log("servicecart essentials", servicecart);
  useEffect(() => {
    if (servicecart) {
      const { servicetotal } = ServiceTotal(servicecart);
      //console.log("servicetotal", servicetotal);
      console.log("is this running");
      setServiceAmount(servicetotal);
    }

    //setisCartEmpty(toolscart.length === 0 && servicecart.length === 0);
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

        {/* you need to restrict this bl;ock uncessarily to run unless the context is that of service
          you need to block this if you are done sending servicecart data to the backend */}
        {/* this could stop creating undefined value for data already in backend */}
        {/* here the toolcart and servicecart is always available so this condition not working */}

        <div className="emi-plan-extend">
          {servicecart == [] ? (
            <div>...Loading</div>
          ) : (
            <EmiPlanPricing
              serviceAmount={serviceAmount}
              serviceQueryparams={serviceQueryparams}
              servicecart={servicecart}
            />
          )}
        </div>
      </>
    </React.Fragment>
  );
};

export default AddServiceButton;
