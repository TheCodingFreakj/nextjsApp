import React from "react";
import { Button } from "semantic-ui-react";
import "../../static/styles.css";
import { useRouter } from "next/router";

const EmiPlanPricing = ({ serviceAmount, serviceQueryparams }) => {
  const router = useRouter();
  return (
    <React.Fragment>
      <>
        <div className="btn">
          <strong>Subscription 1st emi:</strong>${serviceAmount}
        </div>
        <Button
          icon="cart"
          color="green"
          floated="right"
          content="Subscribe|Services"
          onClick={() =>
            router.push(`/payment/orders?q=${serviceQueryparams}  `)
          }
        />

        <div className="btn">
          <strong>Subscription 2st emi:</strong>${serviceAmount}
        </div>

        <Button
          icon="cart"
          color="green"
          floated="right"
          content="Subscribe|Services"
          onClick={() =>
            router.push(`/payment/orders?q=${serviceQueryparams}  `)
          }
        />
      </>
    </React.Fragment>
  );
};

export default EmiPlanPricing;
