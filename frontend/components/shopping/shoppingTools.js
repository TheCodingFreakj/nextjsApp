import React from "react";
import ToolShoppingCard from "../shopping/shoppingcard";

//bring components

const ShoppingTools = (props) => {

  return <ToolShoppingCard service={props.service} />;
};

export default ShoppingTools;
