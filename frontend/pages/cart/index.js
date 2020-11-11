import React, { useState, useEffect } from "react";
import { Button, Segment } from "semantic-ui-react";
import { withRouter } from "next/router";
import Layout from "../../components/Layout";
import CartItemList from "../../components/cart/cartitemlist";
import CartSummary from "../../components/cart/cartsummary";
import { getCookie } from "../../actions/setAuthToken";
import { deleteToolsCart } from "../../actions/shoppingcart";
import { isAuth } from "../../actions/setAuthToken";
import axios from "axios";
import { API } from "../../config";
//bring components

const Cart = ({ products, router }) => {
  const [error, seterror] = useState("");
  const [cartproducts, setCartProducts] = useState(products);

  const handleRemoveFromCart = async (productId) => {
    const token = getCookie("token");
    const url = `${API}/api/tools-cart`;
    const payload = {
      params: { productId },
      headers: {
        Authorization: ` Bearer ${token}`,
      },
    };

    const response = await axios.delete(url, payload);
    setCartProducts(response.data);
  };

  return (
    <Layout>
      {isAuth() && (
        <Segment>
          <CartItemList
            handleRemoveFromCart={handleRemoveFromCart}
            products={cartproducts}
          />
          <CartSummary products={cartproducts} />
        </Segment>
      )}

      {!isAuth() && (
        <Segment>
          <Button color="green" onClick={() => router.push("/customerSignup")}>
            Login To Add Products
          </Button>
        </Segment>
      )}
    </Layout>
  );
};
Cart.getInitialProps = async (context) => {
  const token = getCookie("token");
  if (!token) {
    return { products: [] };
  }
  const url = `${API}/api/tools-cart`;
  const payload = {
    headers: {
      Authorization: ` Bearer ${token}`,
    },
  };

  const response = await axios.get(url, payload);
  console.log(response.data);
  return { products: response.data };
};

export default withRouter(Cart);
