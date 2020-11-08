import React, { useState } from "react";
import Link from "next/link";
import { Card, Icon, Button, Message } from "semantic-ui-react";
import { getCookie, isAuth } from "../../actions/setAuthToken";
import { createCartItems } from "../../actions/shoppingcart";
import "../../static/styles.css";
import AddToCart from "../../components/shopping/addToCart";

const ToolShoppingCard = ({ service }) => {
  let product = service.tools;
  // console.log(product);
  const [products, setproducts] = useState(product);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [producttotal, setproducttotal] = useState([]);
  const [choices, setChoices] = useState();
  // const [producttotal, setproducttotal] = useState({
  //   productname: "",
  //   productid: "",
  //   price: "",
  // });
  //get the id password to the backend for total calulation based on product id
  //get the service charges in the same route based on service id
  //in the backend all the amount
  //call the amount to display in frontend of cart..

  //from there book the service with the total amount as subscription

  const extra = (
    <>
      <Button animated="vertical" color="green" attached="bottom">
        <Button.Content hidden color="red">
          Add To Cart
        </Button.Content>
        <Button.Content visible>
          <Icon name="shop" color="red" />
        </Button.Content>
      </Button>

      <hr />
    </>
  );

  const token = getCookie("token");
  const sendproducts = (id, tool, price) => {
    setChoices((previousState) => ({
      ...previousState,
      productinfo: {
        productname: tool,
        productid: id,
        price: price,
      },
    }));

    //https://stackoverflow.com/questions/54807454/what-is-prevstate-in-reactjs
    //https://www.rockyourcode.com/react-set-state-with-prev-state-and-object-spread-operator/

    // createCartItems(producttotal, token).then((data) => {
    //   console.log(data); //send a message of true or false
    //   if (data.error) {
    //     setError({ error: data });
    //     console.log(error);
    //   } else {
    //     setError("");
    //     setSuccess("Item Added To the Cart");
    //   }
    // });
  };
  console.log("My choices", choices);

  const showTools = (products) => {
    return products.map((product) => ({
      header: product.tool,
      image: "/static/images/marketingsolutions.jpg",
      color: "green",
      childKey: product._id,
      meta: `${product.clientPrice} $`,
      description: product.summary,
      extra: extra,
      onClick: () =>
        sendproducts(product._id, product.tool, product.clientPrice),
    }));
  };

  const showCart = () => {
    choices.map((choice) => <div className="lead pb-4 ">{choice}</div>);
  };

  //display error

  //display success

  return (
    <>
      {showCart()}
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
