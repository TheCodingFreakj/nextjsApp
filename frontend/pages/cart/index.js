import React, { useState, useEffect } from "react";
import { Button, Segment, Dimmer, Loader } from "semantic-ui-react";
import Layout from "../../components/Layout";
import { getCookie } from "../../actions/setAuthToken";
import ServiceCartHeader from "../../components/cart/servicecartheader";
import Toolscartheader from "../../components/cart/toolscartheader";
import { fetchCarts } from "../../actions/shoppingcart";
import { API } from "../../config";
import axios from "axios";
const Cart = ({ router }) => {
  const [cart, setCart] = useState({
    tool: "",
    services: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const { tool, services } = cart;

  useEffect(() => {
    const mounted = { current: true };

    if (mounted.current) {
      getProductsFromCarts();
    }

    return () => {
      mounted.current = false;
    };
  }, [tool, services]);

  const getProductsFromCarts = async () => {
    setLoading(true);
    await fetchCarts(getCookie("token")).then((data) => {
      console.log(data);
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
            <Dimmer active size="large">
              <Loader>Data Loading</Loader>
            </Dimmer>
          </Segment>
        ) : (
          <div>
            {cart  ? (
              <Segment>
                <ServiceCartHeader
                  products={cart}
                  handleRemoveServiceFromCart={handleRemoveServiceFromCart}
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

export default Cart;
