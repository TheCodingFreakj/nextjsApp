import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Segment } from "semantic-ui-react";
import Layout from "../../components/Layout";
import CartItemList from "../../components/cart/cartitemlist";
import CartSummary from "../../components/cart/cartsummary";
import ServiceItemList from "../../components/cart/serviceitemlist";
import { isAuth, getCookie } from "../../actions/setAuthToken";
import { useRouter } from "next/router";

import axios from "axios";
import { API } from "../../config";

//bring components

const Cart = ({ products, services }) => {
  // console.log(products);
  // console.log(services);

  //there is some issue with data persistance
  const [cartproducts, setCartProducts] = useState(products);
  const [cartservices, setCartServices] = useState(services);

  const router = useRouter();

  //https://dev.to/dinhhuyams/introduction-to-useref-hook-3m7n
  //https://medium.com/javascript-in-plain-english/creating-a-persistent-cart-in-react-f287ed4b4df0
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

  const handleRemoveFromServiceCart = async (serviceId) => {
    const token = getCookie("token");
    const url3 = `${API}/api/services-cart`;
    const payload3 = {
      params: { serviceId },
      headers: {
        Authorization: ` Bearer ${token}`,
      },
    };
    const responses3 = await axios.delete(url3, payload3);
    setCartServices(responses3.data);
  };

  return (
    <Layout>
      {isAuth() && (
        <Segment>
          <CartItemList
            handleRemoveFromCart={handleRemoveFromCart}
            products={cartproducts}
          />
          <ServiceItemList
            handleRemoveFromServiceCart={handleRemoveFromServiceCart}
            services={cartservices}
          />
          <CartSummary products={cartproducts} services={cartservices} />
        </Segment>
      )}
      {/* {!isAuth() && (
        <Segment>
          <Button color="green" onClick={() => router.push("/customerSignup")}>
            Login To Add Products
          </Button>
        </Segment>
      )} */}

      {cartproducts === [] && cartservices === [] && (
        <Segment
          secondary
          color="yellow"
          inverted
          textAlign="center"
          placeholder
        >
          <Header icon>
            <Icon name="shopping basket" color="black" />
            No Products In Your Cart Add Some
          </Header>
          <div>
            {user ? (
              <Button color="orange" onClick={() => router.push("/services")}>
                View Products
              </Button>
            ) : (
              <Button
                color="green"
                onClick={() => router.push("/customerSignup")}
              >
                Login To Add Products
              </Button>
            )}
          </div>
        </Segment>
      )}
    </Layout>
  );
};

// with products in  cart page reload dont fetch cart
// with no products in cart, hitting the cart route gives error
Cart.getInitialProps = async (ctx) => {
  console.log("This is ctx", ctx);
  const token = getCookie("token");
  let products;
  if (typeof window !== "undefined") {
    if (localStorage.getItem("fetchedCart")) {
      try {
        products = JSON.parse(localStorage.getItem("fetchedCart"));
      } catch (error) {
        console.log(error);
        console.error("NO products in cart");
      }
    }
  }

  console.log(products);
  if (token || products) {
    const url = `${API}/api/services-cart`;
    const url2 = `${API}/api/tools-cart`;

    const payload = {
      headers: {
        Authorization: ` Bearer ${token}`,
      },
    };
    const response = await axios.get(url, payload);
    const response2 = await axios.get(url2, payload);

    const totalProducts = [...response.data, ...response.data];
    console.log(totalProducts);
    let productLists = [];
    totalProducts.map((cartItem) => productLists.push(cartItem._id));

    if (typeof window !== "undefined") {
      localStorage.setItem("fetchedCart", JSON.stringify(productLists));
    }
    return { services: response.data, products: response2.data };
  } else {
    return {
      products: [],
      services: [],
    };
  }
};

export default Cart;
