import React, { useState, useEffect } from "react";
import { Input } from "semantic-ui-react";
import { isAuth, getCookie } from "../../actions/setAuthToken";
import { useRouter } from "next/router";

import { updateToolCart } from "../../actions/shoppingcart";
const AddProductToCart = ({ productId }) => {
  //console.log(product);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const loggedinUser = isAuth();
  //console.log(loggedinUser);
  const router = useRouter();
  const token = getCookie("token");

  useEffect(() => {
    let timeout;
    if (success) {
      //this use effect will fire off if the success is true to make it false
      timeout = setTimeout(() => setSuccess(false), 3000);
    }
    //we need to cancel this setTimeOut
    return () => {
      clearTimeout(timeout);
    };
  }, [success]);

  const handleAddProductTocart = () => {
    setLoading(true);
    updateToolCart(quantity, productId, token).then((data) => {
      if (data.error) {
        console.log(error);
      } else {
        console.log(data);
        setLoading(false);
        setSuccess(true);
      }
    });
  };
  return (
    <>
      <Input
        type="number"
        min="1"
        placeholder="Quantity"
        value={quantity}
        onChange={(event) => setQuantity(Number(event.target.value))}
        action={
          loggedinUser && success
            ? {
                color: "blue",
                content: "Item Added",
                icon: "plus cart",
                disabled: true,
              }
            : loggedinUser
            ? {
                color: "orange",
                content: "Add To Cart",
                icon: "plus cart",
                loading,
                disabled: loading,
                onClick: handleAddProductTocart,
              }
            : {
                color: "green",
                content: "Sign Up To Purchase",
                icon: "signup",
                onClick: () => router.push("/customerSignin"),
              }
        }
      />
    </>
  );
};

export default AddProductToCart;
