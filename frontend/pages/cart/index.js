import React, { useState, useEffect } from "react";
import { Segment } from "semantic-ui-react";
import { withRouter } from "next/router";
import Layout from "../../components/Layout";
import CartItemList from "../../components/cart/cartitemlist";
import CartSummary from "../../components/cart/cartsummary";
import { getCookie } from "../../actions/setAuthToken";
import { fetchToolsCart, deleteToolsCart } from "../../actions/shoppingcart";

//bring components

const Cart = ({ router }) => {
  const [error, seterror] = useState("");
  const [products, setProducts] = useState([]);
  const token = getCookie("token");

  // //see if you can use fetchCart depending on whether the user is authenticated or not
  //see if you fetch only when user add products
  useEffect(() => {
    fetchThisUserCart();
  }, []);

  const fetchThisUserCart = async () => {
    await fetchToolsCart(token).then((data) => {
      if (data.error) {
        seterror({ ...error, error: data.error });
      } else {
        setProducts(data);
      }
    });
  };

  console.log(products);

  const handleRemoveFromCart = async (productId) => {
    await deleteToolsCart(productId, token).then((data) => {
      console.log(data);
      if (data.error) {
        seterror({ ...error, error: data.error });
      } else {
        setProducts(data);
      }
    });
  };
  return (
    <Layout>
      <Segment>
        <CartItemList
          handleRemoveFromCart={handleRemoveFromCart}
          products={products}
        />
        <CartSummary products={products} />
      </Segment>
    </Layout>
  );
};

export default withRouter(Cart);
