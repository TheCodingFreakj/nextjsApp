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

const EmiPlanPricing = ({ serviceAmount }) => {
  return (
    <React.Fragment>
      <div className="emi-plan-extend">
        <p>
          <strong>Subscription 1st emi:</strong>${serviceAmount}
        </p>
        <Button
          icon="cart"
          //disabled={isCartEmpty}
          color="green"
          floated="right"
          content="Subscribe|Services|Tools"
          // onClick={() =>
          //   router.push(
          //     `/payment/subscribe?user=${user._id}&amttt=${stripeAmount}&email=${user.email}`
          //   )
          // }
        />

        <p>
          <strong>Subscription 2st emi:</strong>${serviceAmount}
        </p>

        <Button
          icon="cart"
          //disabled={isCartEmpty}
          color="green"
          floated="right"
          content="Subscribe|Services|Tools"
          // onClick={() =>
          //   router.push(
          //     `/payment/subscribe?user=${user._id}&amttt=${stripeAmount}&email=${user.email}`
          //   )
          // }
        />
      </div>
    </React.Fragment>
  );
};

export default EmiPlanPricing;
