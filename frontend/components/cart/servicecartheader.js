import React from "react";
import { Button, Segment, Item } from "semantic-ui-react";
import AddServiceButton from "./cartutils/addServiceButton";

const ServiceCartHeader = ({
  handleRemoveServiceFromCart,
  products,
  handleRemoveToolFromCart,
}) => {
  if (products.data.serviceCart) {
    console.log(
      "this is product in child component",
      products.data.serviceCart.products
    );
  }

  if (products.data.toolsCart) {
    console.log(
      "this is product in child component",
      products.data.toolsCart.products
    );
  }else{

  }

  // const showservicecart = (services) => {
  //   // if (!services) {
  //   //   throw new Error("service not avalable");
  //   // }
  //   // console.log(services);
  //   // services
  //   //   ? services.map((s) => {
  //   //       return console.log(s);
  //   //     })
  //   //   : null;
  // };

  // const showtoolscart = (tools) => {
  //   if (!tools) {
  //     throw new Error("tools not avalable");
  //   }

  //   tools.map((s) => console.log(s));
  // };
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
      {/* <div>{showservicecart(products.services.products)}</div> */}
      {/* <div>{error}</div> */}
      {/* <div>{showtoolscart(products.tool.products)}</div> */}
    </React.Fragment>
  );
};

export default ServiceCartHeader;

/**********Passing the props to child component after fetching data from axios */

//https://www.debuggr.io/react-map-of-undefined/
//https://stackoverflow.com/questions/61574632/passing-axios-response-to-child-component-in-react
//https://www.pluralsight.com/guides/hierarchy-of-components-and-how-to-get-async-data
//https://blog.bitsrc.io/things-you-should-know-when-fetching-data-for-react-components-39d61602feda
//https://stackoverflow.com/questions/61368592/issue-passing-props-after-fetch-request-to-child-component-react
//https://levelup.gitconnected.com/fetch-api-data-with-axios-and-display-it-in-a-react-app-with-hooks-3f9c8fa89e7b
//https://css-tricks.com/fetching-data-in-react-using-react-async/