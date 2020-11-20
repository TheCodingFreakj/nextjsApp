import React, { useState, useEffect } from "react";
import { Input } from "semantic-ui-react";
import { isAuth, getCookie } from "../../actions/setAuthToken";
import { useRouter } from "next/router";

import { updateToolCart, updateServicesCart } from "../../actions/shoppingcart";
const AddProductToCart = ({ serviceId, productId }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const loggedinUser = isAuth();
  const router = useRouter();
  const token = getCookie("token");

  // let products;
  // if (typeof window !== "undefined") {
  //   if (localStorage.getItem("fetchedCart")) {
  //     try {
  //       products = JSON.parse(localStorage.getItem("fetchedCart"));
  //     } catch (error) {
  //       console.log(error);
  //       console.error("NO products in cart");
  //     }
  //   }
  // }

  useEffect(() => {
    let timeout;
    if (success) {
      timeout = setTimeout(() => setSuccess(false), 3000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [success]);

  const handleAddProductTocart = () => {
    setLoading(true);

    if (router.query.productId) {
      updateToolCart(quantity, productId, token).then((data) => {
        if (data.error) {
          console.log(error);
        } else {
          console.log(data);
          setLoading(false);
          setSuccess(true);
        }
      });
    } else if (router.query.serviceId) {
      updateServicesCart(quantity, serviceId, token).then((data) => {
        if (data.error) {
          console.log(error);
        } else {
          console.log(data);
          setLoading(false);
          setSuccess(true);
        }
      });
    }
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
                color: "red",
                content: "Item Added",
                icon: "plus cart",
                disabled: true,
              }
            : {
                color: "orange",
                content: "Add To Cart",
                icon: "plus cart",
                loading,
                disabled: loading,
                onClick: handleAddProductTocart,
              }
        }
      />
    </>
  );
};

export default AddProductToCart;
// : {
//     color: "green",
//     content: "Sign Up To Purchase",
//     icon: "signup",
//     onClick: () => router.push("/customerSignin"),
//   }
