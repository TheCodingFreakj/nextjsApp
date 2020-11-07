import React, { useState } from "react";
import Link from "next/link";
import { Card, Icon, Button } from "semantic-ui-react";
import { getCookie, isAuth } from "../../actions/setAuthToken";
import { createCartItems } from "../../actions/shoppingcart";
import "../../static/styles.css";
import AddToCart from "../../components/shopping/addToCart";

const ToolShoppingCard = ({ service }) => {
  let product = service.tools;
  //console.log(product);

  const [products, setproducts] = useState(product);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [producttotal, setproducttotal] = useState({
    price: "",
    productid: "",
  });
  //get the id password to the backend for total calulation based on product id
  //get the service charges in the same route based on service id
  //in the backend all the amount
  //call the amount to display in frontend of cart..

  //from there book the service with the total amount as subscription
  const [open, setOpen] = React.useState(false);

  const extra = (
    <>
      <Button animated="vertical" color="green" attached="bottom">
        <Button.Content hidden color="red">
          Shop
        </Button.Content>
        <Button.Content visible>
          <Icon name="shop" color="red" />
        </Button.Content>
      </Button>

      <hr />
    </>
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
      onClick: () => addToCart(product._id, product.tool, product.clientPrice),
    }));
  };
  const token = getCookie("token");
  const addToCart = (id, name, price) => {
    setproducttotal((prevState) => ({
      ...prevState,
      price: price,
      productid: id,
      productname: name,
    }));

    createCartItems(producttotal, token).then((data) => {
      console.log(data); //send a message of true or false
      if (data.error) {
        setError({ error: data.error });
      } else {
        setError("");
        setSuccess("Item Added To the Cart");
      }
    });
  };

  console.log(producttotal);

  const cartItemsTotal = (e) => {
    console.log(e.target);
  };

  //display error

  //display success

  return (
    <>
      <Card.Group
        className="custom-card-style"
        itemsPerRow="3"
        centered
        items={showTools(products)}
        onClick={cartItemsTotal}
      />
      <AddToCart products={producttotal} />;
      {/* <div>
        <PopOver loggedinUser={isAuth()} />
      </div> */}
    </>
  );
};

export default ToolShoppingCard;
