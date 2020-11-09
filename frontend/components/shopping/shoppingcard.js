import React, { useState } from "react";
import { Card, Icon, Button, Message } from "semantic-ui-react";

import "../../static/styles.css";

const ToolShoppingCard = ({ service }) => {
  let product = service.tools;
  const [products, setproducts] = useState(product);

  //get the id password to the backend for total calulation based on product id
  //get the service charges in the same route based on service id
  //in the backend all the amount
  //call the amount to display in frontend of cart..

  //from there book the service with the total amount as subscription

  const showTools = (products) => {
    return products.map((product) => ({
      header: product.tool,
      image: "/static/images/marketingsolutions.jpg",
      color: "green",
      childKey: product._id,
      meta: `${product.clientPrice} $`,
      description: product.summary,

      href: `/products?productId=${product._id}`,
    }));
  };
  return (
    <>
      <Card.Group
        stackable
        className="custom-card-style"
        itemsPerRow="3"
        centered
        items={showTools(products)}
      />
    </>
  );
};

export default ToolShoppingCard;
