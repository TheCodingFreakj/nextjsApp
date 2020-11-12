import React, { useState, useEffect } from "react";
import { Button, Segment } from "semantic-ui-react";
import { withRouter } from "next/router";
import Layout from "../../components/Layout";
import CartItemList from "../../components/cart/cartitemlist";
import CartSummary from "../../components/cart/cartsummary";
import ServiceItemList from "../../components/cart/serviceitemlist";
import ServiceSummary from "../../components/cart/servicesummary";
import { getCookie } from "../../actions/setAuthToken";
import { isAuth } from "../../actions/setAuthToken";
import axios from "axios";
import { API } from "../../config";
//bring components

const Cart = ({ services, products, router }) => {
  const [error, seterror] = useState("");
  const [cartproducts, setCartProducts] = useState(products);
  const [cartservices, setCartServices] = useState(services);
  console.log(cartproducts);
  console.log(cartservices);

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

  const handleCheckOut = async () => {};

  return (
    <Layout>
      {isAuth() && (
        <Segment>
          <CartItemList
            handleRemoveFromCart={handleRemoveFromCart}
            products={cartproducts}
          />
          <ServiceItemList
            // handleRemoveFromCart={handleRemoveFromCart}
            products={cartservices}
          />
          <CartSummary
            products={cartproducts}
            handleCheckOut={handleCheckOut}
          />

          {/* <ServiceSummary
            products={cartservices}
            // handleCheckOut={handleCheckOut}
          /> */}
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
  const url2 = `${API}/api/services-cart`;
  const payload = {
    headers: {
      Authorization: ` Bearer ${token}`,
    },
  };
  const response = await axios.get(url, payload);
  const response2 = await axios.get(url2, payload);
  console.log(response2.data);
  return { products: response.data, services: response2.data };
};

export default withRouter(Cart);
