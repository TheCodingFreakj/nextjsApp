import React from "react";
import Link from "next/link";
import ToolShoppingCard from "../shopping/shoppingcard";

//bring components

const ShoppingTools = ({ service }) => {
  //reate a slider of tools to be choosen

  // console.log(service);
  return <ToolShoppingCard service={service} />;
};

export default ShoppingTools;
