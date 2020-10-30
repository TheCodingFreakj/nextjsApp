import React, { useState } from "react";
import Link from "next/link";
import { Card, Icon, Button } from "semantic-ui-react";
import "../../static/styles.css";
//bring components

const ToolShoppingCard = ({ service }) => {
  let product = service.tools;
  console.log(product);

  const [products, setproducts] = useState(product);
  //get the id password to the backend for total calulation based on product id
  //get the service charges in the same route based on service id
  //in the backend all the amount
  //call the amount to display in frontend of cart..

  //from there book the service with the total amount as subscription

  const extra = (
    <Button
      animated="vertical"
      color="green"
      attached="bottom"
      content="Click"
      onClick={() => addToCart(product._id, product.clientPrice)}
    >
      <Button.Content hidden color="red">
        Shop
      </Button.Content>
      <Button.Content visible>
        <Icon name="shop" color="red" />
      </Button.Content>
    </Button>
  );

  const showTools = (products) => {
    return products.map((product) => ({
      header: product.tool,
      image: "/static/images/marketingsolutions.jpg",
      color: "green",
      childKey: product._id,
      meta: `${product.clientPrice} $`,
      description: product.summary,
      extra: extra,
    }));
  };

  const addToCart = (id, price) => {
    console.log(id);
    console.log(price);
  };
  return (
    <>
      {/* {JSON.stringify(products)} */}
      <Card.Group
        className="custom-card-style"
        itemsPerRow="3"
        centered
        items={showTools(products)}
      />
    </>
  );
};

export default ToolShoppingCard;
