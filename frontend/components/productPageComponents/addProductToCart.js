import React, { useState, useEffect } from "react";
import { isAuth, getCookie } from "../../actions/setAuthToken";
import { useRouter } from "next/router";
import { updateToolCart, updateServicesCart } from "../../actions/shoppingcart";
const AddProductToCart = ({ serviceId, productId }) => {
  const [quantity, setQuantity] = useState(1);
  const [cartitems, setcartitems] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, seterror] = useState({});
  const loggedinUser = isAuth();
  const router = useRouter();
  const token = getCookie("token");

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
          console.log(data.error);
        } else {
          console.log("this data", data);
          seterror(data);
          setLoading(false);
          setSuccess(true);
        }
      });
    } else if (router.query.serviceId) {
      updateServicesCart(quantity, serviceId, token).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log("this is the error data", data);
          seterror(data);
          setLoading(false);
          setSuccess(true);
        }
      });
    }
  };
  //https://stackoverflow.com/questions/65692079/how-to-update-cart-quantity-if-item-already-exist-in-cart-reactjs

  return (
    <>
      {loggedinUser ? (
        <div className="cart_item_wrapper">
          <input
            type="number"
            min="1"
            placeholder="Quantity"
            value={quantity}
            onChange={(event) => setQuantity(Number(event.target.value))}
          />
          <button className="add-item__button" onClick={handleAddProductTocart}>
            Add
          </button>
        </div>
      ) : null}
    </>
  );
};

export default AddProductToCart;
