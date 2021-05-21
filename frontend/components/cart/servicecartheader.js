import React from "react";
import { Button, Segment, Item } from "semantic-ui-react";
import AddServiceButton from "./cartutils/addServiceButton";

const ServiceCartHeader = ({
  handleRemoveServiceFromCart,
  products,
  handleRemoveToolFromCart,
}) => {
  const [error, seterror] = React.useState("");
  const showservicecart = (services) => {
    if (!services) {
      function CustomException(message) {
        const error = new Error(message);
        seterror(error);
      }
    }

    services.map((s) => {
      return (
        <div className="Cart_name">
          <p>{s.product[0].slug}</p>
        </div>
      );
    });
  };

  const showtoolscart = (tools) => {
    if (!tools) {
      throw new Error("tools not avalable");
    }

    tools.map((s) => console.log(s));
  };
  return (
    <React.Fragment>
      <h3>
        We encourage to couple marketing services with tools as per subscription
        policy
      </h3>
      <h3>
        You can check out web development services separarely as per invoicing
        policy
      </h3>
      <div>{showservicecart(products.services.products)}</div>
      <div>{error }</div>
      <div>{showtoolscart(products.tool.products)}</div>
    </React.Fragment>
  );
};

export default ServiceCartHeader;
