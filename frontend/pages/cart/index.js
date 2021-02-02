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
import Router from "next/router";
import { fetchCarts } from "../../actions/shoppingcart";
import { withRouter } from "next/router";
//import { useRouter } from "next/router";
import { API } from "../../config";
import axios from "axios";
const Cart = ({ router }) => {
  const [cart, setCart] = useState({
    tool: "",
    services: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();

  const { tool, services } = cart;

  useEffect(() => {
    const mounted = { current: true };

    if (mounted.current) {
      getProductsFromCarts();
    }

    return () => {
      mounted.current = false;
    };
  }, []);

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
          tool: data.toolsCart,
          services: data.serviceCart,
          message: data.msg,
        };

        setCart(newcart);
      }
    });
  };

  const handleRemoveToolFromCart = async (productId) => {
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
            {services && tool ? (
              <Segment>
                <ServiceCartHeader
                  servicescartlist={services}
                  handleRemoveServiceFromCart={handleRemoveServiceFromCart}
                />

                <Toolscartheader
                  toolcartlist={tool}
                  handleRemoveToolFromCart={handleRemoveToolFromCart}
                />
              </Segment>
            ) : (
              <Segment>
                <>
                  <p>You got No Product Now! Would You want to Buyt</p>
                  <Button
                    icon="cart"
                    color="yellow"
                    floated="right"
                    content="Buy Services"
                    onClick={() => router.push(`/services `)}
                  />
                </>
              </Segment>
            )}
          </div>
        )}
      </React.Fragment>
    </Layout>
  );
};

export default withRouter(Cart);
