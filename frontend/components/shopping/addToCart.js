import React from "react";
import Link from "next/link";

//bring components
//show all titems
//checkbox and subtotal and save for later
const AddToCart = ({ products: { price, productid, productname } }) => {
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

  //{createCart(productname, price)}
  return <>Addto cart</>;
};

export default AddToCart;
