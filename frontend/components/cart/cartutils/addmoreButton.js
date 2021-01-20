import React, { useState, useEffect } from "react";
import { Divider, Button, Segment, Icon } from "semantic-ui-react";
import Toolstotal from "../cartutils/toolstotal";
import ServiceTotal from "../cartutils/servicetotal";
import EmiPlanPricing from "../emiplanpricing";
import { useRouter } from "next/router";
import "../../../static/styles.css";
import { API } from "../../../config";
import { isAuth, getCookie } from "../../../actions/setAuthToken";
const AddmoreButton = ({ toolscart, servicecart }) => {
  // console.log(servicecart);
  // console.log(toolscart);

  const [toolsAmount, setToolsAmount] = useState(0);
  const [serviceAmount, setServiceAmount] = useState(0);

  const router = useRouter();
  //console.log(router);

  useEffect(() => {
    if (toolscart) {
      const { toolstotal } = Toolstotal(toolscart);
      setToolsAmount(toolstotal);
    } else if (servicecart) {
      const { servicetotal } = ServiceTotal(servicecart);
      // console.log(servicetotal);
      setServiceAmount(servicetotal);
    }

    //setisCartEmpty(toolscart.length === 0 && servicecart.length === 0);
  }, []);
  const user = isAuth();
  let queryparams = encodeURIComponent(
    `${user._id}  & $${toolsAmount}  & ${user.email}`
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

          {toolscart ? (
            <>
              <div className="emi-plan-extend">
                <p>
                  <strong>Sub-Total:</strong>${toolsAmount}
                </p>
                <Button
                  icon="cart"
                  color="green"
                  floated="right"
                  content="Subscribe|Services|Tools"
                  onClick={() =>
                    router.push(`/payment/orders?q=${queryparams}`)
                  }
                />
              </div>
            </>
          ) : null}
          {servicecart ? (
            <div className="emi-plan">
              <EmiPlanPricing serviceAmount={serviceAmount} />
            </div>
          ) : null}

          <Divider />
        </Segment>
      </>
    </React.Fragment>
  );
};

export default AddmoreButton;
