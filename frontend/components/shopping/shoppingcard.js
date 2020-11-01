import React, { useState } from "react";
import Link from "next/link";
import { Card, Icon, Button } from "semantic-ui-react";
import { getCookie, isAuth } from "../../actions/setAuthToken";
import "../../static/styles.css";
import PopOver from "../utils/popover";

const ToolShoppingCard = ({ service }) => {
  let product = service.tools;
  //console.log(product);

  const [products, setproducts] = useState(product);
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

      //the onclick accept an anonymous func and this function accepts the result of addtocart function
      onClick: () => addToCart(product._id, product.clientPrice),
    }));
  };
  const token = getCookie("token");
  const addToCart = (id, price) => {
    setproducttotal((prevState) => ({
      ...prevState,
      price: price,
      productid: id,
    }));

    // const data = productcart(products, token);
    // data.error ? (
    //   <Message negative>
    //     <Message.Header>Oops! There is some issue happening!</Message.Header>
    //     <p>You need to try again</p>
    //   </Message>
    // ) : (
    //   <Message positive>
    //     <Message.Header>Product SuccessFully added To Cart</Message.Header>
    //     <p>
    //       Go to your <b>cart page</b> page to see now.
    //     </p>
    //   </Message>
    // );
  };
  console.log(producttotal);

  return (
    <>
      <Card.Group
        className="custom-card-style"
        itemsPerRow="3"
        centered
        items={showTools(products)}
      />
      <div>
        <PopOver loggedinUser={isAuth()} />
      </div>
    </>
  );
};

export default ToolShoppingCard;
