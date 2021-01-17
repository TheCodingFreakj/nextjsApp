import React from "react";
import PriceTotal from "../utils/PriceTotal";

const TotalEstimatedprice = (props) => {
  // console.log(props);
  let servicebaseprice = props.basePrice[0].discountedServiceCharges;
  return (
    <div>
      <PriceTotal
        servicebaseprice={servicebaseprice}
        checkedtoolinfo={props.checkedtoolinfo}
      />
      ;
    </div>
  );
};

export default TotalEstimatedprice;
