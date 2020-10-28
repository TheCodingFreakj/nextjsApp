import React from "react";
import Link from "next/link";
import renderHTML from "react-render-html";
import moment from "moment";
import { API } from "../../config";

const ToolsShoppingCart = (props) => {
  console.log(props);
  //show the tool name and price and total price
  return (
    <div className="card">
      <div className="card-body p-3 mb-2 bg-success text-white">
        <div className="p-3 mb-2 bg-warning text-dark">
          <h5>Card Info</h5>
        </div>
      </div>
    </div>
  );
};

export default ToolsShoppingCart;
