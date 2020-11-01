import React from "react";
import Link from "next/link";
import ToolShoppingCard from "../shopping/shoppingcard";

//bring components

const ShoppingTools = (props) => {
  //reate a slider of tools to be choosen

  //console.log(props);

  return <ToolShoppingCard service={props.service} />;
};

export default ShoppingTools;
