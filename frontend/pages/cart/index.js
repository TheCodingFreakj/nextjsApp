import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Header,
  Icon,
  Button,
  Segment,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import Layout from "../../components/Layout";
import { isAuth, getCookie } from "../../actions/setAuthToken";

import ServiceCartHeader from "../../components/cart/servicecartheader";
import Toolscartheader from "../../components/cart/toolscartheader";

import { fetchCarts } from "../../actions/shoppingcart";
import { withRouter } from "next/router";
import { API } from "../../config";
import axios from "axios";
const Cart = ({ router }) => {
  //get both the carts

  const [cart, setCart] = useState({
    tool: "",
    services: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();
  const user = isAuth();

  const { tool, services } = cart;

  useEffect(() => {
    const mounted = { current: true };

    if (mounted.current) {
      getProductsFromCarts();
    }

    return () => {
      mounted.current = false;
    };
  }, []); //render only when the data changes that we will get from serverside

  const getProductsFromCarts = async () => {
    setLoading(true);
    await fetchCarts(getCookie("token")).then((data) => {
      if (data.error) {
        console.log(data.error);
        setLoading(false);
      } else {
        setLoading(false);
        let newcart = {
          ...cart,
          tool: data.toolcarts,
          services: data.serviceCarts,
        };

        setCart(newcart);
      }
    });
  };
  // console.log("This is tool cart,render 2", tool);
  // console.log("This is service cart,render 2", services);
  const handleRemoveToolFromCart = async (productId) => {
    console.log(productId);
    const token = getCookie("token");
    const url = `${API}/api/delete-cart`;
    const payload = {
      params: { productId },
      headers: {
        Authorization: ` Bearer ${token}`,
      },
    };
    const response = await axios.delete(url, payload);
    setMessage(response.data.msg);
    getProductsFromCarts();
  };

  const handleRemoveServiceFromCart = async (serviceId) => {
    const token = getCookie("token");

    const url3 = `${API}/api/delete-cart`;
    const payload3 = {
      params: { serviceId },
      headers: {
        Authorization: ` Bearer ${token}`,
      },
    };
    const response = await axios.delete(url3, payload3);
    setMessage(response.data.msg);
    getProductsFromCarts();
  };

  //const handleCheckout = async () => {};

  return (
    <Layout>
      <React.Fragment>
        {loading ? (
          <Segment>
            <Dimmer active size="medium">
              <Loader>Loading</Loader>
            </Dimmer>
          </Segment>
        ) : (
          <div>
            {services ? (
              <Segment>
                <ServiceCartHeader
                  servicescartlist={services}
                  user={user}
                  handleRemoveServiceFromCart={handleRemoveServiceFromCart}
                />

                {/* subscription plan */}

                {tool ? (
                  <Segment>
                    <Toolscartheader
                      toolcartlist={tool}
                      user={user}
                      handleRemoveToolFromCart={handleRemoveToolFromCart}
                    />
                    {/* one time payment */}
                  </Segment>
                ) : null}
              </Segment>
            ) : null}
          </div>
        )}
      </React.Fragment>
    </Layout>
  );
};

export default withRouter(Cart);
// The Stripe CLI is configured for MarketingApp with account id acct_1HaLO5GERwFTkr9G
//https://laracasts.com/discuss/channels/laravel/using-stripe-cli-in-windows?page=0
