import React, { useState, useEffect } from "react";
import { Divider, Button, Segment, Icon } from "semantic-ui-react";
import Toolstotal from "../cartutils/toolstotal";
import ServiceTotal from "../cartutils/servicetotal";
import EmiPlanPricing from "../emiplanpricing";
import { useRouter } from "next/router";

const AddmoreButton = ({ toolscart, servicecart }) => {
  const [toolsAmount, setToolsAmount] = useState(0);
  const [serviceAmount, setServiceAmount] = useState(0);

  const router = useRouter();

  useEffect(() => {
    if (toolscart) {
      const { toolstotal } = Toolstotal(toolscart);
      setToolsAmount(toolstotal);
    } else if (servicecart) {
      const { servicetotal } = ServiceTotal(servicecart);
      console.log(servicetotal);
      setServiceAmount(servicetotal);
    }
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

          {toolscart ? (
            <p>
              <strong>Sub-Total:</strong>${toolsAmount}
            </p>
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
