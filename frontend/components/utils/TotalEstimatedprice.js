import React from "react";
import PriceTotal from "../utils/PriceTotal";

const TotalEstimatedprice = (props) => {
  console.log(props);
  console.log(props.basePrice);
  // convert array to th object
  let transformedtoppingoptions = Object.keys(props.basePrice[0]);

  console.log(transformedtoppingoptions);
  //   return <PriceTotal property={price} value={props.basePrice[0][price]} />;
  return <div>{transformedtoppingoptions}</div>;
};

export default TotalEstimatedprice;
